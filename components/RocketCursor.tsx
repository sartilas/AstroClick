'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export function RocketCursor() {
    const rocketRef = useRef<THREE.Group>(null);
    const particlesRef = useRef<THREE.InstancedMesh>(null);
    const { camera, mouse } = useThree();

    // Track previous position for velocity calculation
    const prevPos = useRef(new THREE.Vector3());
    const targetQuaternion = useRef(new THREE.Quaternion());
    const upVector = useMemo(() => new THREE.Vector3(0, 1, 0), []); // Rocket nose points Y+

    // Particle system (smoke)
    const particleCount = 20;
    const tempObject = new THREE.Object3D();
    const particles = useMemo(() => {
        return new Array(particleCount).fill(0).map(() => ({
            position: new THREE.Vector3(),
            velocity: new THREE.Vector3(),
            life: Math.random(),
            scale: Math.random() * 0.5 + 0.2
        }));
    }, []);

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
        // We compare current position with targetPos (where we are going) 
        // OR current position vs previous frame position for actual trail
        const velocity = targetPos.clone().sub(rocketRef.current.position);

        // Orient rocket to face movement direction
        if (velocity.lengthSq() > 0.01) {
            velocity.normalize();
            // Create quaternion that rotates Y-up (rocket nose) to align with velocity vector
            targetQuaternion.current.setFromUnitVectors(upVector, velocity);
            // Apply extra rotation to align top with camera up roughly, or just simple alignment?
            // Simple alignment is fine for space
            rocketRef.current.quaternion.slerp(targetQuaternion.current, 0.15);
        } else {
            // If stopped, maybe slowly rotate back to "up" relative to camera? 
            // Or just keep last direction. Keeping last direction feels better.

            // Optional: Tilt slightly to camera for aesthetics when idle
            // const camRot = camera.quaternion.clone();
            // rocketRef.current.quaternion.slerp(camRot, 0.05);
        }

        prevPos.current.copy(rocketRef.current.position);

        // Animate particles
        if (particlesRef.current) {
            particles.forEach((p, i) => {
                p.life -= delta * 2;
                if (p.life <= 0) {
                    // Reset to rocket tail
                    p.life = 1;
                    p.position.copy(rocketRef.current!.position);
                    // Offset to tail: move opposite to rocket UP vector (which is its local Y)
                    const tailOffset = new THREE.Vector3(0, -0.6, 0).applyQuaternion(rocketRef.current!.quaternion);
                    p.position.add(tailOffset);

                    // Random velocity away + slight inertia from rocket?
                    // Basic spread
                    p.velocity.set(
                        (Math.random() - 0.5) * 0.5,
                        (Math.random() - 0.5) * 0.5,
                        (Math.random() - 0.5) * 0.5
                    );
                }

                p.position.add(p.velocity.clone().multiplyScalar(delta * 5));

                tempObject.position.copy(p.position);
                const scale = p.life * p.scale;
                tempObject.scale.set(scale, scale, scale);
                tempObject.updateMatrix();
                particlesRef.current!.setMatrixAt(i, tempObject.matrix);
            });
            particlesRef.current.instanceMatrix.needsUpdate = true;
        }
    });

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

                {/* Engine Flame Glow */}
                <pointLight position={[0, -0.6, 0]} color="#ffaa00" intensity={3} distance={3} decay={2} />
            </group>

            {/* Smoke Particles */}
            <instancedMesh ref={particlesRef} args={[undefined, undefined, particleCount]}>
                <sphereGeometry args={[0.1, 8, 8]} />
                <meshBasicMaterial color="#aaaaaa" transparent opacity={0.5} depthWrite={false} />
            </instancedMesh>
        </>
    );
}
