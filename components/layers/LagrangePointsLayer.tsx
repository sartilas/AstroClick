import { Text, Html, Billboard, shaderMaterial } from '@react-three/drei';
import { useFrame, extend, ReactThreeFiber } from '@react-three/fiber';
import { useRef, useState, useMemo } from 'react';
import * as THREE from 'three';
import { dictionary, Language } from '../../data/dictionary';

// 1. Define Custom Glow Shader
// This creates a soft, pulsing blurred circle similar to the gravity wells
const LagrangeGlowMaterial = shaderMaterial(
    {
        uTime: 0,
        uColor: new THREE.Color(0.2, 0.3, 0.5), // Tech Blue/Grey (Gravity Well Color)
        uHover: 0, // 0 to 1
    },
    // Vertex Shader
    `
    varying vec2 vUv;
    void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    // Fragment Shader
    `
    varying vec2 vUv;
    uniform float uTime;
    uniform vec3 uColor;
    uniform float uHover;

    void main() {
        // Distance from center (0.5, 0.5)
        vec2 center = vec2(0.5);
        float dist = distance(vUv, center);

        // Soft glow (Gaussian-ish)
        // 1.0 at center, 0.0 at edge (0.5)
        float alpha = smoothstep(0.5, 0.0, dist);
        
        // Make it sharper at core, fade out softness
        alpha = pow(alpha, 2.0);

        // Pulsing effect
        float pulse = 0.8 + 0.2 * sin(uTime * 2.0);
        
        // Hover effect: brighter and more opaque
        float hoverIntensity = 1.0 + uHover * 0.5;
        
        vec3 finalColor = uColor * hoverIntensity;
        
        // Add a "core" dot
        float core = smoothstep(0.1, 0.0, dist);
        finalColor += vec3(1.0) * core * 0.5;

        gl_FragColor = vec4(finalColor, alpha * pulse);
    }
    `
);

extend({ LagrangeGlowMaterial });

declare global {
    namespace JSX {
        interface IntrinsicElements {
            lagrangeGlowMaterial: ReactThreeFiber.Object3DNode<THREE.ShaderMaterial, typeof LagrangeGlowMaterial>;
        }
    }
}

interface LagrangePointProps {
    id: string;
    position: THREE.Vector3;
    selected: boolean;
    onSelect: (id: string) => void;
    lang: Language;
}

function LagrangePoint({ id, position, selected, onSelect, lang }: LagrangePointProps) {
    const [hovered, setHovered] = useState(false);
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
            // Smooth transition for hover
            materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
                materialRef.current.uniforms.uHover.value,
                hovered || selected ? 1 : 0,
                0.1
            );
        }
    });

    // Get dictionary data
    const data = dictionary[lang].objects[id.toLowerCase()];

    return (
        <group position={position}>
            {/* Clickable Glow Sprite (Billboard ensures it always faces camera) */}
            <Billboard>
                <mesh
                    onClick={(e) => {
                        e.stopPropagation();
                        onSelect(id);
                    }}
                    onPointerOver={() => {
                        document.body.style.cursor = 'pointer';
                        setHovered(true);
                    }}
                    onPointerOut={() => {
                        document.body.style.cursor = 'auto';
                        setHovered(false);
                    }}
                    scale={hovered ? 3.5 : 3}
                >
                    <planeGeometry args={[1, 1]} />
                    {/* @ts-ignore */}
                    <lagrangeGlowMaterial
                        ref={materialRef}
                        transparent
                        depthWrite={false}
                        blending={THREE.AdditiveBlending}
                    />
                </mesh>
            </Billboard>

            {/* Label */}
            <Billboard>
                <Text
                    position={[0, 1.8, 0]}
                    fontSize={1.2} // Increased font size
                    color="#AECFEB" // Light blue text
                    anchorX="center"
                    anchorY="bottom"
                    outlineWidth={0.05}
                    outlineColor="#000000"
                >
                    {id}
                </Text>
            </Billboard>

            {/* Info Card - Only visible when selected */}
            {selected && data && (
                <Html position={[0, -2, 0]} center zIndexRange={[100, 0]}>
                    <div className="w-64 bg-black/80 backdrop-blur-md border border-blue-500/50 text-white p-4 rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.5)] animate-fade-in-up">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-bold text-blue-300">{data.name}</h3>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onSelect('');
                                }}
                                className="text-gray-400 hover:text-white"
                            >
                                ✕
                            </button>
                        </div>
                        <p className="text-sm text-gray-300 mb-3 leading-relaxed">{data.desc}</p>
                        <div className="bg-blue-900/30 p-2 rounded border border-blue-500/20">
                            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block mb-1">
                                {dictionary[lang].didYouKnow || "Did you know?"}
                            </span>
                            <p className="text-xs text-blue-100 italic">{data.funFact}</p>
                        </div>
                    </div>
                </Html>
            )}
        </group>
    );
}

// Main Layer Component
export function LagrangePointsLayer({ lang }: { lang: Language }) {
    const [positions, setPositions] = useState<{ [key: string]: THREE.Vector3 }>({});
    const [selectedPoint, setSelectedPoint] = useState<string | null>(null);

    useFrame(({ scene }) => {
        const sun = scene.getObjectByName('celestial-sun');
        const earth = scene.getObjectByName('celestial-earth');

        if (sun && earth) {
            const sunPos = new THREE.Vector3();
            const earthPos = new THREE.Vector3();

            sun.getWorldPosition(sunPos);
            earth.getWorldPosition(earthPos);

            const R = sunPos.distanceTo(earthPos);
            const dir = new THREE.Vector3().subVectors(earthPos, sunPos).normalize();

            // Geometric calculation of L-points (Approximated for visualization)
            // L1: Between Sun and Earth (~99% of distance)
            // L2: Behind Earth (~101% of distance)
            // L3: Opposite Sun (~100% distance)
            // L4: 60 deg ahead
            // L5: 60 deg behind

            // Scale offsets slightly for better visibility in the app if needed
            // But preserving relative geometry is key.

            const l1Pos = sunPos.clone().add(dir.clone().multiplyScalar(R * 0.9));
            const l2Pos = sunPos.clone().add(dir.clone().multiplyScalar(R * 1.15)); // Pushed out slightly for visibility
            const l3Pos = sunPos.clone().add(dir.clone().multiplyScalar(-R));

            // Rotate dir 60 deg around Y for L4/L5
            const axis = new THREE.Vector3(0, 1, 0);

            const dirL4 = dir.clone().applyAxisAngle(axis, Math.PI / 3);
            const l4Pos = sunPos.clone().add(dirL4.multiplyScalar(R));

            const dirL5 = dir.clone().applyAxisAngle(axis, -Math.PI / 3);
            const l5Pos = sunPos.clone().add(dirL5.multiplyScalar(R));

            setPositions({
                L1: l1Pos,
                L2: l2Pos,
                L3: l3Pos,
                L4: l4Pos,
                L5: l5Pos
            });
        }
    });

    if (Object.keys(positions).length === 0) return null;

    return (
        <group>
            {Object.entries(positions).map(([key, pos]) => (
                <LagrangePoint
                    key={key}
                    id={key}
                    position={pos}
                    selected={selectedPoint === key}
                    onSelect={(id) => setSelectedPoint(id === selectedPoint ? null : id)}
                    lang={lang}
                />
            ))}
        </group>
    );
}
