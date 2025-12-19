'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface RocketCursorProps {
    isKSP?: boolean;
}

export function RocketCursor({ isKSP = false }: RocketCursorProps) {
    const rocketRef = useRef<THREE.Group>(null);
    const particlesRef = useRef<THREE.InstancedMesh>(null);
    const { camera, mouse } = useThree();

    // Track previous position for velocity calculation
    const prevPos = useRef(new THREE.Vector3());
    const targetQuaternion = useRef(new THREE.Quaternion());
    const upVector = useMemo(() => new THREE.Vector3(0, 1, 0), []); // Rocket nose points Y+

    // Particle system (smoke)
    const particleCount = 40;
    const tempObject = new THREE.Object3D();
    const particles = useMemo(() => {
        return new Array(particleCount).fill(0).map(() => ({
            position: new THREE.Vector3(),
            velocity: new THREE.Vector3(),
            life: Math.random(),
            scale: Math.random() * 0.4 + 0.1
        }));
    }, []);

    const flameRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (!rocketRef.current) return;

        // Position rocket in front of camera based on mouse
        // We use a fixed distance plane for consistent cursor feel behavior
        const vector = new THREE.Vector3(mouse.x, mouse.y, 0.5);
        vector.unproject(camera);
        const dir = vector.sub(camera.position).normalize();
        const distance = 15; // Distance from camera
        const targetPos = camera.position.clone().add(dir.multiplyScalar(distance));

        // Smooth position follow
        rocketRef.current.position.lerp(targetPos, 0.2);

        // Calculate movement vector for orientation
        const velocity = targetPos.clone().sub(rocketRef.current.position);

        // Orient rocket to face movement direction
        if (velocity.lengthSq() > 0.01) {
            velocity.normalize();
            targetQuaternion.current.setFromUnitVectors(upVector, velocity);
            rocketRef.current.quaternion.slerp(targetQuaternion.current, 0.15);
        }

        prevPos.current.copy(rocketRef.current.position);

        // Animate flame
        if (flameRef.current) {
            const pulse = Math.sin(state.clock.elapsedTime * 30) * 0.1 + 0.9;
            flameRef.current.scale.set(pulse, pulse * (1 + Math.random() * 0.2), pulse);
            if (flameRef.current.material instanceof THREE.MeshStandardMaterial) {
                flameRef.current.material.emissiveIntensity = 2 + Math.random() * 2;
            }
        }

        // Animate particles
        if (particlesRef.current) {
            particles.forEach((p, i) => {
                p.life -= delta * 1.5;
                if (p.life <= 0) {
                    // Reset to rocket tail
                    p.life = 1;
                    p.position.copy(rocketRef.current!.position);
                    // Offset to tail
                    const tailOffset = new THREE.Vector3(0, -0.5, 0).applyQuaternion(rocketRef.current!.quaternion);
                    p.position.add(tailOffset);

                    // Random velocity away + slight inertia
                    p.velocity.set(
                        (Math.random() - 0.5) * 0.8,
                        (Math.random() - 0.5) * 0.8,
                        (Math.random() - 0.5) * 0.8
                    ).add(new THREE.Vector3(0, -2, 0).applyQuaternion(rocketRef.current!.quaternion));
                }

                p.position.add(p.velocity.clone().multiplyScalar(delta * 2));

                tempObject.position.copy(p.position);
                const scale = p.life * p.scale;
                tempObject.scale.set(scale, scale, scale);
                tempObject.updateMatrix();
                particlesRef.current!.setMatrixAt(i, tempObject.matrix);
            });
            particlesRef.current.instanceMatrix.needsUpdate = true;
        }
    });

    // KSP Style Rocket - White multi-stage with side boosters
    if (isKSP) {
        return (
            <>
                <group ref={rocketRef}>
                    {/* ===== MAIN CENTRAL STAGE ===== */}

                    {/* Nose Cone / Fairing - Pointed top */}
                    <mesh position={[0, 0.65, 0]} castShadow>
                        <coneGeometry args={[0.12, 0.3, 16]} />
                        <meshStandardMaterial color="#e8e8e8" metalness={0.4} roughness={0.3} />
                    </mesh>

                    {/* Command Pod - Rounded section */}
                    <mesh position={[0, 0.42, 0]} castShadow>
                        <sphereGeometry args={[0.14, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
                        <meshStandardMaterial color="#f0f0f0" metalness={0.5} roughness={0.25} />
                    </mesh>

                    {/* Upper Stage Body */}
                    <mesh position={[0, 0.2, 0]} castShadow>
                        <cylinderGeometry args={[0.14, 0.14, 0.35, 16]} />
                        <meshStandardMaterial color="#e5e5e5" metalness={0.4} roughness={0.3} />
                    </mesh>

                    {/* Separation Band 1 */}
                    <mesh position={[0, 0.02, 0]}>
                        <cylinderGeometry args={[0.145, 0.145, 0.04, 16]} />
                        <meshStandardMaterial color="#aaaaaa" metalness={0.6} roughness={0.3} />
                    </mesh>

                    {/* Mid Stage Body */}
                    <mesh position={[0, -0.2, 0]} castShadow>
                        <cylinderGeometry args={[0.14, 0.15, 0.4, 16]} />
                        <meshStandardMaterial color="#f2f2f2" metalness={0.4} roughness={0.3} />
                    </mesh>

                    {/* Separation Band 2 */}
                    <mesh position={[0, -0.42, 0]}>
                        <cylinderGeometry args={[0.155, 0.155, 0.04, 16]} />
                        <meshStandardMaterial color="#aaaaaa" metalness={0.6} roughness={0.3} />
                    </mesh>

                    {/* Lower Stage / Main Tank */}
                    <mesh position={[0, -0.65, 0]} castShadow>
                        <cylinderGeometry args={[0.15, 0.15, 0.42, 16]} />
                        <meshStandardMaterial color="#e8e8e8" metalness={0.4} roughness={0.3} />
                    </mesh>

                    {/* Central Engine Bell */}
                    <mesh position={[0, -0.92, 0]}>
                        <cylinderGeometry args={[0.06, 0.1, 0.12, 12]} />
                        <meshStandardMaterial color="#555555" metalness={0.7} roughness={0.3} />
                    </mesh>

                    {/* ===== SIDE BOOSTERS (x2) ===== */}
                    {[1, -1].map((side, idx) => (
                        <group key={idx} position={[side * 0.28, -0.35, 0]}>
                            {/* Booster Nose Cone */}
                            <mesh position={[0, 0.35, 0]}>
                                <sphereGeometry args={[0.09, 12, 12, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
                                <meshStandardMaterial color="#e8e8e8" metalness={0.4} roughness={0.3} />
                            </mesh>

                            {/* Booster Body */}
                            <mesh position={[0, 0, 0]} castShadow>
                                <cylinderGeometry args={[0.09, 0.09, 0.65, 12]} />
                                <meshStandardMaterial color="#f0f0f0" metalness={0.4} roughness={0.3} />
                            </mesh>

                            {/* Booster Separation Band */}
                            <mesh position={[0, -0.25, 0]}>
                                <cylinderGeometry args={[0.092, 0.092, 0.03, 12]} />
                                <meshStandardMaterial color="#aaaaaa" metalness={0.6} roughness={0.3} />
                            </mesh>

                            {/* Booster Lower Tank */}
                            <mesh position={[0, -0.42, 0]}>
                                <cylinderGeometry args={[0.09, 0.085, 0.3, 12]} />
                                <meshStandardMaterial color="#e5e5e5" metalness={0.4} roughness={0.3} />
                            </mesh>

                            {/* Booster Engine Nozzle */}
                            <mesh position={[0, -0.6, 0]}>
                                <cylinderGeometry args={[0.04, 0.07, 0.08, 10]} />
                                <meshStandardMaterial color="#555555" metalness={0.7} roughness={0.3} />
                            </mesh>

                            {/* Booster Small Flame */}
                            <mesh position={[0, -0.72, 0]} rotation={[Math.PI, 0, 0]}>
                                <coneGeometry args={[0.05, 0.2, 8]} />
                                <meshStandardMaterial
                                    color="#ff8800"
                                    emissive="#ff4400"
                                    emissiveIntensity={1.5}
                                    transparent
                                    opacity={0.7}
                                />
                            </mesh>
                        </group>
                    ))}

                    {/* ===== MAIN FINS (x4) ===== */}
                    <group position={[0, -0.75, 0]}>
                        {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
                            <group key={i} rotation={[0, angle, 0]}>
                                <mesh position={[0.18, 0, 0]} rotation={[0, 0, -0.2]}>
                                    <boxGeometry args={[0.12, 0.25, 0.02]} />
                                    <meshStandardMaterial color="#d0d0d0" metalness={0.5} roughness={0.4} />
                                </mesh>
                            </group>
                        ))}
                    </group>

                    {/* ===== MAIN ENGINE FLAME ===== */}
                    <mesh ref={flameRef} position={[0, -1.1, 0]} rotation={[Math.PI, 0, 0]}>
                        <coneGeometry args={[0.08, 0.35, 12]} />
                        <meshStandardMaterial
                            color="#ff6600"
                            emissive="#ff3300"
                            emissiveIntensity={2}
                            transparent
                            opacity={0.8}
                        />
                    </mesh>

                    {/* Engine Flame Glow */}
                    <pointLight position={[0, -1.1, 0]} color="#ffaa00" intensity={5} distance={4} decay={2} />
                </group>

                {/* Smoke Particles */}
                <instancedMesh ref={particlesRef} args={[undefined, undefined, particleCount]}>
                    <sphereGeometry args={[0.15, 8, 8]} />
                    <meshStandardMaterial color="#cccccc" transparent opacity={0.5} depthWrite={false} emissive="#666666" />
                </instancedMesh>
            </>
        );
    }

    // Default Solar System Rocket (Original design)
    return (
        <>
            <group ref={rocketRef}>
                {/* Main Fuselage - White/Shiny */}
                <mesh position={[0, -0.1, 0]} castShadow>
                    <cylinderGeometry args={[0.12, 0.15, 0.6, 16]} />
                    <meshStandardMaterial color="#eeeeee" metalness={0.6} roughness={0.2} />
                </mesh>

                {/* Upper Stage/Nose connection */}
                <mesh position={[0, 0.25, 0]}>
                    <cylinderGeometry args={[0.12, 0.12, 0.1, 16]} />
                    <meshStandardMaterial color="#cc0000" metalness={0.3} roughness={0.4} />
                </mesh>

                {/* Nose Cone - Red tip */}
                <mesh position={[0, 0.45, 0]}>
                    <coneGeometry args={[0.12, 0.4, 16]} />
                    <meshStandardMaterial color="#ff0000" metalness={0.2} roughness={0.3} />
                </mesh>

                {/* Cockpit Window */}
                <mesh position={[0, 0.1, 0.1]} rotation={[0.2, 0, 0]}>
                    <sphereGeometry args={[0.06, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
                    <meshStandardMaterial color="#88ccff" metalness={0.9} roughness={0.1} emissive="#004488" emissiveIntensity={0.5} />
                </mesh>

                {/* Lower Fins - 4 fins in cross shape */}
                <group position={[0, -0.3, 0]}>
                    {[0, Math.PI / 2, Math.PI, Math.PI * 1.5].map((angle, i) => (
                        <group key={i} rotation={[0, angle, 0]}>
                            <mesh position={[0.18, -0.1, 0]} rotation={[0, 0, -0.3]}>
                                <boxGeometry args={[0.15, 0.3, 0.03]} />
                                <meshStandardMaterial color="#cc0000" metalness={0.4} roughness={0.5} />
                            </mesh>
                        </group>
                    ))}
                </group>

                {/* Engine Nozzle */}
                <mesh position={[0, -0.45, 0]}>
                    <cylinderGeometry args={[0.1, 0.14, 0.15, 16]} />
                    <meshStandardMaterial color="#333333" />
                </mesh>

                {/* Engine Flame */}
                <mesh ref={flameRef} position={[0, -0.65, 0]} rotation={[Math.PI, 0, 0]}>
                    <coneGeometry args={[0.1, 0.4, 12]} />
                    <meshStandardMaterial
                        color="#ff6600"
                        emissive="#ff3300"
                        emissiveIntensity={2}
                        transparent
                        opacity={0.8}
                    />
                </mesh>

                {/* Engine Flame Glow */}
                <pointLight position={[0, -0.7, 0]} color="#ffaa00" intensity={5} distance={4} decay={2} />
            </group>

            {/* Smoke Particles */}
            <instancedMesh ref={particlesRef} args={[undefined, undefined, particleCount]}>
                <sphereGeometry args={[0.15, 8, 8]} />
                <meshStandardMaterial color="#666666" transparent opacity={0.4} depthWrite={false} emissive="#333333" />
            </instancedMesh>
        </>
    );
}

