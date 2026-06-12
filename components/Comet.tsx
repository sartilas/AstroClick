'use client';

import { useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import { SolarSystemObject } from '@/data/solarSystemData';
import { VoxelSphere } from './VoxelSphere';
import { getGlowTexture } from './SunGlow';
import { Language } from '@/data/dictionary';
import { objectTranslations } from '@/data/objectTranslations';

interface CometProps {
    data: SolarSystemObject;
    onSelect: (data: SolarSystemObject) => void;
    onDoubleClick?: (data: SolarSystemObject) => void;
    orbitMode: 'simplified' | 'real';
    timeScale?: number;
    lang: Language;
}

const ION_COUNT = 220;
const DUST_COUNT = 260;

// Scratch vectors (useFrame callbacks run sequentially, safe to share)
const _pos = new THREE.Vector3();
const _dir = new THREE.Vector3();
const _perp = new THREE.Vector3();
const _UP = new THREE.Vector3(0, 1, 0);

/**
 * A comet with elliptical orbit and two particle tails:
 * - a straight bluish ion tail pushed directly away from the Sun by solar wind
 * - a wider, curved whitish dust tail trailing along the orbit
 * Tail length grows as the comet approaches the Sun (educational + spectacular).
 */
export function Comet({ data, onSelect, onDoubleClick, orbitMode, timeScale = 1, lang }: CometProps) {
    const groupRef = useRef<THREE.Group>(null);
    const nucleusRef = useRef<THREE.Group>(null);
    const ionRef = useRef<THREE.Points>(null);
    const dustRef = useRef<THREE.Points>(null);
    const [hovered, setHovered] = useState(false);

    const translation = objectTranslations[data.id]?.[lang];
    const displayName = translation?.name || data.name;

    // Same scaling rules as CelestialBody
    const scaledDistance = useMemo(() => {
        if (orbitMode === 'simplified') return data.distance;
        if (data.scientificDistance) return data.scientificDistance / 25000000;
        return data.distance * 0.1;
    }, [orbitMode, data.distance, data.scientificDistance]);

    const scaledSize = useMemo(() => {
        if (orbitMode === 'simplified') return data.size;
        // Real comet nucleus (~5 km) would be invisible: clamp to a visible minimum
        const real = data.scientificRadius ? data.scientificRadius / 25000000 : data.size * 0.0001;
        return Math.max(real, 0.08);
    }, [orbitMode, data.size, data.scientificRadius]);

    const eccentricity = data.eccentricity || 0;
    const periapsis = (data.periapsis || 0) * (Math.PI / 180);
    const inclination = (data.inclination || 0) * (Math.PI / 180);
    const ascendingNode = (data.ascendingNode || 0) * (Math.PI / 180);

    const orbitMatrix = useMemo(() => {
        const m = new THREE.Matrix4();
        const mPeri = new THREE.Matrix4().makeRotationY(periapsis);
        const mInc = new THREE.Matrix4().makeRotationX(inclination);
        const mAsc = new THREE.Matrix4().makeRotationY(ascendingNode);
        m.multiplyMatrices(mAsc, mInc);
        m.multiply(mPeri);
        return m;
    }, [periapsis, inclination, ascendingNode]);

    // Deterministic initial angle (same convention as CelestialBody)
    const initialAngle = useMemo(() => {
        let hash = 0;
        for (let i = 0; i < data.id.length; i++) {
            hash = ((hash << 5) - hash) + data.id.charCodeAt(i);
            hash = hash & hash;
        }
        return (Math.abs(hash) % 360) * (Math.PI / 180);
    }, [data.id]);
    const angle = useRef(initialAngle);

    const orbitPoints = useMemo(() => {
        const points = [];
        const segments = 160;
        const a = scaledDistance;
        const e = eccentricity;
        const b = a * Math.sqrt(1 - e * e);
        const c = a * e;
        for (let i = 0; i <= segments; i++) {
            const theta = (i / segments) * Math.PI * 2;
            const point = new THREE.Vector3((a * Math.cos(theta)) - c, 0, b * Math.sin(theta));
            point.applyMatrix4(orbitMatrix);
            points.push(point);
        }
        return points;
    }, [scaledDistance, eccentricity, orbitMatrix]);

    // Static per-particle parameters: progress along tail (t), lateral jitter seed.
    // Brightness is baked into a color buffer once (bright at nucleus, fading at the end);
    // only positions are rewritten each frame.
    const tails = useMemo(() => {
        const make = (count: number, rgb: [number, number, number]) => {
            const positions = new Float32Array(count * 3);
            const colors = new Float32Array(count * 3);
            const params: { t: number; jx: number; jy: number; jz: number }[] = [];
            for (let i = 0; i < count; i++) {
                const t = Math.pow(Math.random(), 0.8); // Denser near nucleus
                params.push({
                    t,
                    jx: Math.random() * 2 - 1,
                    jy: Math.random() * 2 - 1,
                    jz: Math.random() * 2 - 1
                });
                const fade = Math.pow(1 - t, 1.4);
                colors[i * 3] = rgb[0] * fade;
                colors[i * 3 + 1] = rgb[1] * fade;
                colors[i * 3 + 2] = rgb[2] * fade;
            }
            return { positions, colors, params };
        };
        return {
            ion: make(ION_COUNT, [0.55, 0.85, 1.0]),
            dust: make(DUST_COUNT, [1.0, 0.94, 0.8])
        };
    }, []);

    const glowTexture = useMemo(() => getGlowTexture(), []);

    useFrame((state, delta) => {
        if (!groupRef.current) return;

        // Orbit motion (same integration as CelestialBody)
        angle.current += delta * data.orbitSpeed * 0.1 * timeScale;
        const a = scaledDistance;
        const e = eccentricity;
        const b = a * Math.sqrt(1 - e * e);
        const c = a * e;
        _pos.set((a * Math.cos(angle.current)) - c, 0, b * Math.sin(angle.current)).applyMatrix4(orbitMatrix);
        groupRef.current.position.copy(_pos);

        // Nucleus tumbling
        if (nucleusRef.current) {
            nucleusRef.current.rotation.y += delta * data.rotationSpeed * timeScale;
            nucleusRef.current.rotation.x += delta * data.rotationSpeed * 0.4 * timeScale;
        }

        // Tail geometry: direction away from the Sun (origin), length grows near perihelion
        const distToSun = Math.max(_pos.length(), 0.001);
        _dir.copy(_pos).divideScalar(distToSun); // Normalized: away from sun
        _perp.crossVectors(_dir, _UP).normalize(); // Dust tail curvature direction

        const baseLen = scaledDistance * 0.22;
        const lengthFactor = THREE.MathUtils.clamp((scaledDistance * 0.35) / distToSun, 0.25, 2.0);
        const tailLen = baseLen * lengthFactor;
        const time = state.clock.elapsedTime;

        const writeTail = (
            points: THREE.Points | null,
            tail: { positions: Float32Array; params: { t: number; jx: number; jy: number; jz: number }[] },
            lengthMul: number,
            spread: number,
            curve: number
        ) => {
            if (!points) return;
            const arr = tail.positions;
            for (let i = 0; i < tail.params.length; i++) {
                const p = tail.params[i];
                const t = p.t;
                const along = t * tailLen * lengthMul;
                const lateral = t * tailLen * spread;
                const wiggle = Math.sin(time * 2 + i * 1.7) * lateral * 0.25;
                arr[i * 3] = _dir.x * along + p.jx * lateral + _perp.x * (t * t * tailLen * curve) + _dir.y * wiggle;
                arr[i * 3 + 1] = _dir.y * along + p.jy * lateral + _perp.y * (t * t * tailLen * curve);
                arr[i * 3 + 2] = _dir.z * along + p.jz * lateral + _perp.z * (t * t * tailLen * curve) + _dir.x * wiggle;
            }
            const attr = points.geometry.getAttribute('position') as THREE.BufferAttribute;
            attr.needsUpdate = true;
        };

        writeTail(ionRef.current, tails.ion, 1.0, 0.05, 0);      // Straight, narrow ion tail
        writeTail(dustRef.current, tails.dust, 0.75, 0.12, 0.3); // Shorter, wider, curved dust tail
    });

    const particleSize = Math.max(scaledSize * 1.6, 0.25);

    return (
        <group>
            {/* Orbit path */}
            <Line
                points={orbitPoints}
                color={orbitMode === 'real' ? data.color : 'white'}
                opacity={orbitMode === 'real' ? 0.5 : 0.12}
                transparent
                lineWidth={1}
                dashed={true}
                dashScale={scaledDistance * 0.1}
                dashSize={1}
                gapSize={1}
            />

            <group ref={groupRef} name={`celestial-${data.id}`}>
                <group
                    onClick={(e) => { e.stopPropagation(); onSelect(data); }}
                    onDoubleClick={(e) => { e.stopPropagation(); onDoubleClick && onDoubleClick(data); }}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                >
                    {/* Nucleus - icy voxel ball */}
                    <group ref={nucleusRef}>
                        <VoxelSphere
                            radius={scaledSize}
                            color={data.color}
                            resolution={12}
                            type="rocky"
                            castShadow={false}
                        />
                    </group>

                    {/* Coma - glowing halo around the nucleus */}
                    <sprite scale={scaledSize * 7}>
                        <spriteMaterial
                            map={glowTexture}
                            color="#cfe9ff"
                            blending={THREE.AdditiveBlending}
                            depthWrite={false}
                            transparent
                            opacity={0.75}
                        />
                    </sprite>

                    {/* Invisible hitbox so the comet stays clickable despite its tiny nucleus */}
                    <mesh visible={false}>
                        <sphereGeometry args={[Math.max(scaledSize * 4, 1), 8, 8]} />
                        <meshBasicMaterial />
                    </mesh>
                </group>

                {/* Ion tail (blue, straight) */}
                <points ref={ionRef} frustumCulled={false}>
                    <bufferGeometry>
                        <bufferAttribute attach="attributes-position" args={[tails.ion.positions, 3]} />
                        <bufferAttribute attach="attributes-color" args={[tails.ion.colors, 3]} />
                    </bufferGeometry>
                    <pointsMaterial
                        size={particleSize}
                        map={glowTexture}
                        vertexColors
                        transparent
                        opacity={0.85}
                        blending={THREE.AdditiveBlending}
                        depthWrite={false}
                        sizeAttenuation
                    />
                </points>

                {/* Dust tail (cream, curved) */}
                <points ref={dustRef} frustumCulled={false}>
                    <bufferGeometry>
                        <bufferAttribute attach="attributes-position" args={[tails.dust.positions, 3]} />
                        <bufferAttribute attach="attributes-color" args={[tails.dust.colors, 3]} />
                    </bufferGeometry>
                    <pointsMaterial
                        size={particleSize * 1.3}
                        map={glowTexture}
                        vertexColors
                        transparent
                        opacity={0.55}
                        blending={THREE.AdditiveBlending}
                        depthWrite={false}
                        sizeAttenuation
                    />
                </points>

                {hovered && (
                    <Html position={[0, scaledSize + 0.5, 0]} center style={{ pointerEvents: 'none' }}>
                        <div className="flex flex-col items-center animate-fade-in-up">
                            <div className="w-px h-4 bg-gradient-to-t from-white/50 to-transparent mb-0.5"></div>
                            <div className="bg-black/90 border border-white/30 backdrop-blur-md text-white px-3 py-1 rounded text-xs font-bold shadow-xl shadow-blue-500/10 whitespace-nowrap tracking-wide uppercase" translate="no">
                                ☄️ {displayName}
                            </div>
                        </div>
                    </Html>
                )}
            </group>
        </group>
    );
}
