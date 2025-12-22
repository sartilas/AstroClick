'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html, Float } from '@react-three/drei';
import * as THREE from 'three';
import { dictionary, Language } from '@/data/dictionary';

interface AlienShipProps {
    position: [number, number, number];
    onOpen: () => void;
    lang: Language;
}

export function AlienShip({ position, onOpen, lang }: AlienShipProps) {
    const groupRef = useRef<THREE.Group>(null);
    const ringRef1 = useRef<THREE.Mesh>(null);
    const ringRef2 = useRef<THREE.Mesh>(null);
    const coreRef = useRef<THREE.Mesh>(null);

    // Interactive State
    const [hovered, setHovered] = useState(false);

    // Animation
    useFrame((state, delta) => {
        if (groupRef.current) {
            // Gentle hovering motion is handled by Float, but we can add slow overall rotation
            groupRef.current.rotation.y += delta * 0.05;
        }

        // Ring rotations
        if (ringRef1.current) {
            ringRef1.current.rotation.x += delta * 0.2;
            ringRef1.current.rotation.y += delta * 0.1;
        }
        if (ringRef2.current) {
            ringRef2.current.rotation.x -= delta * 0.15;
            ringRef2.current.rotation.z += delta * 0.2;
        }

        // Core pulsation
        if (coreRef.current) {
            const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
            coreRef.current.scale.set(scale, scale, scale);
        }
    });

    // Greebles (random small details)
    const greebles = useMemo(() => {
        const items = [];
        for (let i = 0; i < 20; i++) {
            const angle = (i / 20) * Math.PI * 2;
            const r = 1.2;
            items.push({
                pos: [Math.cos(angle) * r, (Math.random() - 0.5) * 0.5, Math.sin(angle) * r] as [number, number, number],
                scale: [0.1 + Math.random() * 0.2, 0.1 + Math.random() * 0.2, 0.1 + Math.random() * 0.2] as [number, number, number]
            });
        }
        return items;
    }, []);

    return (
        <group position={position}>
            <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
                <group
                    ref={groupRef}
                    onPointerOver={() => {
                        document.body.style.cursor = 'pointer';
                        setHovered(true);
                    }}
                    onPointerOut={() => {
                        document.body.style.cursor = 'auto';
                        setHovered(false);
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onOpen();
                    }}
                >
                    {/* Central Hull */}
                    <mesh>
                        <octahedronGeometry args={[1.5, 2]} />
                        <meshStandardMaterial
                            color="#2a2a35"
                            roughness={0.3}
                            metalness={0.8}
                            emissive="#1a1a25"
                            emissiveIntensity={0.2}
                        />
                    </mesh>

                    {/* Glowing Core */}
                    <mesh ref={coreRef}>
                        <dodecahedronGeometry args={[0.6, 0]} />
                        <meshBasicMaterial color="#00ff88" toneMapped={false} />
                        <pointLight color="#00ff88" intensity={1} distance={10} decay={2} />
                    </mesh>

                    {/* Rotating Rings */}
                    <mesh ref={ringRef1} rotation={[0.5, 0, 0]}>
                        <torusGeometry args={[2.2, 0.05, 16, 100]} />
                        <meshStandardMaterial color="#00ffaa" emissive="#00ffaa" emissiveIntensity={2} toneMapped={false} />
                    </mesh>

                    <mesh ref={ringRef2} rotation={[-0.5, 0, 0]}>
                        <torusGeometry args={[1.8, 0.08, 16, 6]} /> {/* Hexagonal ring */}
                        <meshStandardMaterial color="#444455" metalness={1} roughness={0.2} />
                    </mesh>

                    {/* Details / Greebles */}
                    {greebles.map((g, i) => (
                        <mesh key={i} position={g.pos} scale={g.scale}>
                            <boxGeometry />
                            <meshStandardMaterial color="#555566" metalness={0.5} />
                        </mesh>
                    ))}

                    {/* Tooltip */}
                    {hovered && (
                        <Html position={[0, 2.5, 0]} center style={{ pointerEvents: 'none' }}>
                            <div className="flex flex-col items-center animate-fade-in-up">
                                <div className="w-px h-4 bg-gradient-to-t from-green-500/50 to-transparent mb-0.5"></div>
                                <div className="bg-black/90 border border-green-500/50 backdrop-blur-md px-3 py-1 rounded text-green-400 text-xs font-bold shadow-[0_0_15px_rgba(0,255,136,0.3)] text-center whitespace-nowrap tracking-wide uppercase">
                                    <div className="text-[8px] text-green-600 mb-0.5 leading-none">{dictionary[lang]?.alienShip.signalDetected}</div>
                                    {dictionary[lang]?.alienShip.fermiParadox}
                                </div>
                            </div>
                        </Html>
                    )}
                </group>
            </Float>

            {/* Distant marker so it's visible from afar (optional) */}
            {!hovered && (
                <mesh position={[0, 0, 0]}>
                    <sphereGeometry args={[80, 8, 8]} /> {/* Invisible large hit area helper if needed, or just relying on the mesh */}
                    <meshBasicMaterial visible={false} />
                </mesh>
            )}
        </group>
    );
}
