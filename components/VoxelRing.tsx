'use client';

import { useMemo, useRef, useLayoutEffect } from 'react';
import * as THREE from 'three';

interface VoxelRingProps {
    innerRadius: number;
    outerRadius: number;
    color: string;
    count?: number;
}

export function VoxelRing({ innerRadius, outerRadius, color, count = 800 }: VoxelRingProps) {
    const meshRef = useRef<THREE.InstancedMesh>(null);

    const particles = useMemo(() => {
        const data = [];
        for (let i = 0; i < count; i++) {
            // Random angle
            const angle = Math.random() * Math.PI * 2;
            // Random radius between inner and outer
            const radius = innerRadius + Math.random() * (outerRadius - innerRadius);

            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            // Slight thickness
            const y = (Math.random() - 0.5) * (innerRadius * 0.05);

            // Varied size for debris look
            const size = (Math.random() * 0.5 + 0.5) * ((outerRadius - innerRadius) / 20);

            data.push({ position: [x, y, z], size });
        }
        return data;
    }, [innerRadius, outerRadius, count]);

    useLayoutEffect(() => {
        if (meshRef.current) {
            const tempObject = new THREE.Object3D();
            particles.forEach((p, i) => {
                tempObject.position.set(p.position[0], p.position[1], p.position[2]);
                tempObject.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
                tempObject.scale.set(p.size, p.size, p.size);
                tempObject.updateMatrix();
                meshRef.current!.setMatrixAt(i, tempObject.matrix);
            });
            meshRef.current.instanceMatrix.needsUpdate = true;
        }
    }, [particles]);

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
                color={color}
                roughness={0.8}
                metalness={0.2}
                transparent
                opacity={0.8}
            />
        </instancedMesh>
    );
}
