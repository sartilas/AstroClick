'use client';

import { useRef, useLayoutEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AsteroidBeltProps {
    timeScale?: number;
    orbitMode?: 'simplified' | 'real';
}

export function AsteroidBelt({ timeScale = 1, orbitMode = 'simplified' }: AsteroidBeltProps) {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const count = 500; // Even fewer elements for cleaner look
    const tempObject = useMemo(() => new THREE.Object3D(), []);
    const tempColor = useMemo(() => new THREE.Color(), []);

    const particles = useMemo(() => {
        const data = [];
        const innerRadius = orbitMode === 'real' ? 24 : 18;
        const outerRadius = orbitMode === 'real' ? 32 : 23;

        // Visual improvements: 8 distinct vibrant color variations
        const colors = [
            '#B8B8B8', // Light Grey (Standard silicate)
            '#4A4A4A', // Dark Grey (Carbonaceous)
            '#E8D7C3', // Light Beige/Cream (Silicate dust)
            '#CD853F', // Peru/Tan (Iron-rich)
            '#D2691E', // Chocolate Brown (Metal-rich)
            '#C5E8F7', // Pale Blue "Ice" (Frozen volatiles)
            '#F5DEB3', // Wheat/Sand color
            '#BC8F8F', // Rosy Brown (Oxidized iron)
        ];

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const y = (Math.random() - 0.5) * 1; // Reduced vertical scatter

            const rotation = [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI];
            // More variety in size
            const scale = 0.2 + Math.random() * 0.8;

            // Pick random color
            const colorHex = colors[Math.floor(Math.random() * colors.length)];

            data.push({ position: [x, y, z], rotation, scale, color: colorHex });
        }
        return data;
    }, [orbitMode]);

    useLayoutEffect(() => {
        if (meshRef.current) {
            // Ensure color buffer exists
            if (!meshRef.current.instanceColor) {
                meshRef.current.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(count * 3), 3);
            }

            particles.forEach((particle, i) => {
                const { position, rotation, scale, color } = particle;
                tempObject.position.set(position[0], position[1], position[2]);
                tempObject.rotation.set(rotation[0], rotation[1], rotation[2]);
                tempObject.scale.set(scale, scale, scale);
                tempObject.updateMatrix();
                meshRef.current!.setMatrixAt(i, tempObject.matrix);

                // Set Color
                tempColor.set(particle.color);
                meshRef.current!.setColorAt(i, tempColor);
            });
            meshRef.current.instanceMatrix.needsUpdate = true;
            meshRef.current.instanceColor.needsUpdate = true;
        }
    }, [particles, tempObject, tempColor, count]);

    useFrame((state, delta) => {
        if (meshRef.current) {
            // Inverted rotation direction as requested
            meshRef.current.rotation.y -= delta * 0.03 * timeScale;
        }
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]} castShadow receiveShadow>
            <boxGeometry args={[0.5, 0.5, 0.5]} />
            <meshStandardMaterial
                roughness={0.7}
                metalness={0.3}
                emissive="#FFFFFF"
                emissiveIntensity={0.15}
            />
        </instancedMesh>
    );
}
