'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface SunGlowProps {
    radius: number;
    color: string;
}

// Procedural radial-gradient texture (generated once, shared by both sprites,
// also reused by Comet particles)
let cachedGlowTexture: THREE.Texture | null = null;
export function getGlowTexture(): THREE.Texture {
    if (cachedGlowTexture) return cachedGlowTexture;

    const size = 256;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;
    const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    gradient.addColorStop(0.0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.15, 'rgba(255,255,255,0.55)');
    gradient.addColorStop(0.4, 'rgba(255,255,255,0.18)');
    gradient.addColorStop(0.7, 'rgba(255,255,255,0.05)');
    gradient.addColorStop(1.0, 'rgba(255,255,255,0)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, size, size);

    cachedGlowTexture = new THREE.CanvasTexture(canvas);
    return cachedGlowTexture;
}

/**
 * Soft corona / halo around the star: two additive billboard sprites
 * (a warm white core + a wide tinted outer glow) with a slow breathing pulse.
 * Costs 2 draw calls — works without postprocessing.
 */
export function SunGlow({ radius, color }: SunGlowProps) {
    const innerRef = useRef<THREE.Sprite>(null);
    const outerRef = useRef<THREE.Sprite>(null);
    const texture = useMemo(() => getGlowTexture(), []);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        // Two overlapping sine waves for an organic "breathing" feel
        const pulse = 1 + Math.sin(t * 0.8) * 0.04 + Math.sin(t * 2.3) * 0.02;
        if (innerRef.current) innerRef.current.scale.setScalar(radius * 4.5 * pulse);
        if (outerRef.current) outerRef.current.scale.setScalar(radius * 8 * (2 - pulse));
    });

    return (
        <group>
            <sprite ref={innerRef} scale={radius * 4.5}>
                <spriteMaterial
                    map={texture}
                    color="#fff3cf"
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                    transparent
                    opacity={0.85}
                />
            </sprite>
            <sprite ref={outerRef} scale={radius * 8}>
                <spriteMaterial
                    map={texture}
                    color={color}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                    transparent
                    opacity={0.35}
                />
            </sprite>
        </group>
    );
}
