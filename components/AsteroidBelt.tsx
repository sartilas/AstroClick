'use client';

import { useRef, useLayoutEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function AsteroidBelt() {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const count = 2000;
    const tempObject = new THREE.Object3D();

    // Generate random data for asteroids
    const particles = useMemo(() => {
        const data = [];
        const innerRadius = 24; // Moved slightly further out to accommodate larger planets
        const outerRadius = 28;

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const y = (Math.random() - 0.5) * 1.5; // More vertical scatter for voxels

            // Random rotation and scale for variety
            const rotation = [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI];
            const scale = 0.5 + Math.random() * 0.5;

            data.push({ position: [x, y, z], rotation, scale });
        }
        return data;
    }, []);

    useLayoutEffect(() => {
        if (meshRef.current) {
            particles.forEach((particle, i) => {
                const { position, rotation, scale } = particle;
                tempObject.position.set(position[0], position[1], position[2]);
                tempObject.rotation.set(rotation[0], rotation[1], rotation[2]);
                tempObject.scale.set(scale, scale, scale);
                tempObject.updateMatrix();
                meshRef.current!.setMatrixAt(i, tempObject.matrix);
            });
            meshRef.current.instanceMatrix.needsUpdate = true;
        }
    }, [particles]);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.02;
        }
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <boxGeometry args={[0.4, 0.4, 0.4]} />
            <meshStandardMaterial
                color="#888888"
                roughness={0.9}
                metalness={0.1}
            />
            {/* Outline for asteroids doesn't work well on InstancedMesh easily without custom shader or LineSegments instancing, skipping outline for performance and clarity */}
        </instancedMesh>
    );
}
