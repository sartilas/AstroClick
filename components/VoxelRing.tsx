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
    const tempColor = useMemo(() => new THREE.Color(), []);

    const particles = useMemo(() => {
        const data = [];

        // Generate palette based on the base color - more vivid variations
        const base = new THREE.Color(color);
        const palette = [
            color, // Base color
            '#' + base.clone().offsetHSL(0, 0.1, 0.3).getHexString(), // Lighter and more saturated
            '#' + base.clone().offsetHSL(0.05, 0, 0.2).getHexString(), // Slight hue shift, lighter
            '#' + base.clone().offsetHSL(-0.05, 0, -0.1).getHexString(), // Slight hue shift, darker
            '#E8F4F8', // Very light ice/white
            '#FFE5B4', // Peach/beige for warmth
            '#C0C0C0', // Silver/light grey
            '#A0826D', // Warm brown/tan
        ];

        for (let i = 0; i < count; i++) {
            // Random angle
            const angle = Math.random() * Math.PI * 2;
            // Random radius between inner and outer
            const radius = innerRadius + Math.random() * (outerRadius - innerRadius);

            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            // Reduced thickness
            const y = (Math.random() - 0.5) * (innerRadius * 0.02);

            // Varied size for debris look
            const size = (Math.random() * 0.5 + 0.5) * ((outerRadius - innerRadius) / 20);

            // Pick random color from palette
            const pColor = palette[Math.floor(Math.random() * palette.length)];

            data.push({ position: [x, y, z], size, color: pColor });
        }
        return data;
    }, [innerRadius, outerRadius, count, color]);

    useLayoutEffect(() => {
        if (meshRef.current) {
            // Ensure color buffer exists
            if (!meshRef.current.instanceColor) {
                meshRef.current.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(count * 3), 3);
            }

            const tempObject = new THREE.Object3D();
            particles.forEach((p, i) => {
                tempObject.position.set(p.position[0], p.position[1], p.position[2]);
                tempObject.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
                tempObject.scale.set(p.size, p.size * 0.4, p.size);
                tempObject.updateMatrix();
                meshRef.current!.setMatrixAt(i, tempObject.matrix);

                // Apply color
                tempColor.set(p.color);
                meshRef.current!.setColorAt(i, tempColor);
            });
            meshRef.current.instanceMatrix.needsUpdate = true;
            meshRef.current.instanceColor.needsUpdate = true;
        }
    }, [particles, tempColor, count]);

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]} castShadow receiveShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
                roughness={0.7}
                metalness={0.3}
                transparent
                opacity={0.85}
                emissive="#FFFFFF"
                emissiveIntensity={0.15}
            />
        </instancedMesh>
    );
}
