import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';

// L-Points are relative to two bodies: Primary (Sun) and Secondary (Earth)
export function LagrangePointsLayer() {
    const groupRef = useRef<THREE.Group>(null);
    const [positions, setPositions] = useState<{ [key: string]: THREE.Vector3 }>({});

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

            // Approximate L-point distances for Earth-Sun
            // L1: ~0.01 AU inside Earth orbit
            // L2: ~0.01 AU outside Earth orbit
            // L3: Opposite side of Sun, slightly further than Earth
            // L4: 60 deg ahead
            // L5: 60 deg behind

            // In our scale, Earth is at dist ~10 (1AU = 10 units)
            // Hill sphere radius approx d * (m/3M)^(1/3) -> very small
            // We'll calculate positions geometrically for visualization

            const l1Pos = sunPos.clone().add(dir.clone().multiplyScalar(R * 0.9)); // Inner
            const l2Pos = sunPos.clone().add(dir.clone().multiplyScalar(R * 1.1)); // Outer
            const l3Pos = sunPos.clone().add(dir.clone().multiplyScalar(-R)); // Opposite * 1 ? usually R (slightly varying)

            const l4Pos = sunPos.clone().add(dir.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.PI / 3).multiplyScalar(R));
            const l5Pos = sunPos.clone().add(dir.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), -Math.PI / 3).multiplyScalar(R));

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
                <group key={key} position={pos}>
                    <mesh>
                        <sphereGeometry args={[0.5, 16, 16]} />
                        <meshBasicMaterial color="#FF00FF" />
                    </mesh>
                    <Text
                        position={[0, 1.5, 0]}
                        fontSize={0.8}
                        color="#FF00FF"
                        anchorX="center"
                        anchorY="bottom"
                    >
                        {key}
                    </Text>
                    {/* Connection lines for context (optional) */}
                </group>
            ))}
        </group>
    );
}
