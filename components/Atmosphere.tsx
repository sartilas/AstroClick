'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AtmosphereProps {
    radius: number;
    color: string;
    intensity?: number; // 0-1, how thick/visible the atmosphere is
    scale?: number; // How far the atmosphere extends beyond the planet (1.1 = 10% larger)
    animated?: boolean; // Whether to animate subtle pulsing
}

export function Atmosphere({
    radius,
    color,
    intensity = 0.5,
    scale = 1.15,
    animated = true
}: AtmosphereProps) {
    const innerRef = useRef<THREE.Mesh>(null);
    const outerRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);

    // Parse the atmosphere color
    const atmosphereColor = useMemo(() => new THREE.Color(color), [color]);

    // Create a lighter version for the outer glow
    const glowColor = useMemo(() => {
        const c = new THREE.Color(color);
        c.offsetHSL(0, -0.1, 0.2);
        return c;
    }, [color]);

    // Animate the atmosphere with subtle pulsing
    useFrame((state) => {
        if (animated && glowRef.current) {
            const time = state.clock.elapsedTime;
            const pulse = 1 + Math.sin(time * 0.5) * 0.02;
            glowRef.current.scale.setScalar(pulse);
        }
    });

    return (
        <group>
            {/* Inner atmosphere layer - closer to surface */}
            <mesh ref={innerRef}>
                <sphereGeometry args={[radius * 1.02, 32, 32]} />
                <meshBasicMaterial
                    color={atmosphereColor}
                    transparent
                    opacity={intensity * 0.15}
                    side={THREE.BackSide}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Main atmosphere halo */}
            <mesh ref={outerRef}>
                <sphereGeometry args={[radius * scale, 32, 32]} />
                <meshBasicMaterial
                    color={atmosphereColor}
                    transparent
                    opacity={intensity * 0.25}
                    side={THREE.BackSide}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Outer glow effect */}
            <mesh ref={glowRef}>
                <sphereGeometry args={[radius * (scale + 0.1), 32, 32]} />
                <meshBasicMaterial
                    color={glowColor}
                    transparent
                    opacity={intensity * 0.1}
                    side={THREE.BackSide}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Fresnel-like rim glow using a custom shader approach with rings */}
            <mesh>
                <ringGeometry args={[radius * 0.95, radius * scale, 64]} />
                <meshBasicMaterial
                    color={atmosphereColor}
                    transparent
                    opacity={intensity * 0.3}
                    side={THREE.DoubleSide}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </group>
    );
}

// Helper component for thick atmospheres (like Eve, Venus)
export function ThickAtmosphere({
    radius,
    color,
    secondaryColor,
    intensity = 0.7
}: {
    radius: number;
    color: string;
    secondaryColor?: string;
    intensity?: number;
}) {
    const groupRef = useRef<THREE.Group>(null);

    const primaryColor = useMemo(() => new THREE.Color(color), [color]);
    const secondary = useMemo(() =>
        new THREE.Color(secondaryColor || color).offsetHSL(0.05, 0, -0.1),
        [secondaryColor, color]
    );

    // Slow rotation for cloud effect
    useFrame((_, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.02;
            groupRef.current.rotation.x += delta * 0.005;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Dense inner atmosphere */}
            <mesh>
                <sphereGeometry args={[radius * 1.03, 48, 48]} />
                <meshBasicMaterial
                    color={primaryColor}
                    transparent
                    opacity={intensity * 0.3}
                    side={THREE.FrontSide}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Cloud layer 1 */}
            <mesh rotation={[0.2, 0, 0.1]}>
                <sphereGeometry args={[radius * 1.08, 32, 32]} />
                <meshBasicMaterial
                    color={secondary}
                    transparent
                    opacity={intensity * 0.2}
                    side={THREE.BackSide}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Cloud layer 2 */}
            <mesh rotation={[0.1, 0.3, 0]}>
                <sphereGeometry args={[radius * 1.12, 32, 32]} />
                <meshBasicMaterial
                    color={primaryColor}
                    transparent
                    opacity={intensity * 0.15}
                    side={THREE.BackSide}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Outer haze */}
            <mesh>
                <sphereGeometry args={[radius * 1.2, 32, 32]} />
                <meshBasicMaterial
                    color={primaryColor}
                    transparent
                    opacity={intensity * 0.08}
                    side={THREE.BackSide}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </group>
    );
}

// Thin atmosphere (like Duna/Mars, Laythe)
export function ThinAtmosphere({
    radius,
    color,
    intensity = 0.3
}: {
    radius: number;
    color: string;
    intensity?: number;
}) {
    const atmosphereColor = useMemo(() => new THREE.Color(color), [color]);

    return (
        <group>
            {/* Very subtle haze */}
            <mesh>
                <sphereGeometry args={[radius * 1.05, 32, 32]} />
                <meshBasicMaterial
                    color={atmosphereColor}
                    transparent
                    opacity={intensity * 0.2}
                    side={THREE.BackSide}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>

            {/* Faint outer glow */}
            <mesh>
                <sphereGeometry args={[radius * 1.1, 32, 32]} />
                <meshBasicMaterial
                    color={atmosphereColor}
                    transparent
                    opacity={intensity * 0.1}
                    side={THREE.BackSide}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </group>
    );
}
