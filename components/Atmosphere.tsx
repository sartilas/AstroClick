'use client';

import { useRef, useMemo } from 'react';
import { useFrame, extend, type ThreeElement } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';

// --------------------------------------------------------
// Custom Fresnel Atmosphere Shader
// --------------------------------------------------------
const AtmosphereMaterial = shaderMaterial(
    {
        uColor: new THREE.Color(0.0, 0.0, 0.0),
        uIntensity: 1.0,
        uPow: 2.0, // Falloff power (higher = sharper rim)
        uTime: 0,
        uViewVector: new THREE.Vector3(0, 0, 0) // Camera position relative to object, or handled via viewMatrix
    },
    // Vertex Shader
    `
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
        vNormal = normalize(normalMatrix * normal);
        vPosition = (modelViewMatrix * vec4(position, 1.0)).xyz;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
    `,
    // Fragment Shader
    `
    uniform vec3 uColor;
    uniform float uIntensity;
    uniform float uPow;
    uniform float uTime;
    
    varying vec3 vNormal;
    varying vec3 vPosition;
    
    void main() {
        // Calculate view direction (from fragment to camera)
        // In View Space, camera is at (0,0,0), so view dir is -normalize(vPosition)
        vec3 viewDir = normalize(-vPosition);
        
        // Fresnel intensity: dot of View and Normal
        // 1.0 = center (facing camera), 0.0 = edge (perpendicular)
        float viewDotNormal = dot(viewDir, vNormal);
        
        // Invert for rim glow: 0.0 = center, 1.0 = edge
        float rim = 1.0 - max(0.0, viewDotNormal);
        
        // Apply power for falloff sharpness
        float glow = pow(rim, uPow);
        
        // Add subtle pulsing
        float pulse = 1.0 + 0.1 * sin(uTime * 1.5 + vPosition.x + vPosition.y);
        
        // Final alpha & color
        vec3 finalColor = uColor * (glow * uIntensity * pulse);
        
        // Soften the back-face discard artifact slightly (optional)
        float alpha = min(1.0, glow * uIntensity);
        
        gl_FragColor = vec4(finalColor, alpha);
    }
    `
);

extend({ AtmosphereMaterial });

// R3F v9: custom elements are declared on the ThreeElements interface
declare module '@react-three/fiber' {
    interface ThreeElements {
        atmosphereMaterial: ThreeElement<typeof AtmosphereMaterial> & {
            uColor?: THREE.Color;
            uIntensity?: number;
            uPow?: number;
            uTime?: number;
            uViewVector?: THREE.Vector3;
        };
    }
}

interface AtmosphereProps {
    radius: number;
    color: string;
    intensity?: number;
    scale?: number;
    animated?: boolean;
}

export function Atmosphere({
    radius,
    color,
    intensity = 1.0,
    scale = 1.2,
    animated = true
}: AtmosphereProps) {
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    useFrame((state) => {
        if (animated && materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        }
    });

    return (
        <mesh>
            <sphereGeometry args={[radius * scale, 32, 32]} />
            {/* @ts-ignore */}
            <atmosphereMaterial
                ref={materialRef}
                uColor={new THREE.Color(color)}
                uIntensity={intensity * 1.5} // Boost slightly for visibility
                uPow={4.0} // Sharp rim
                transparent
                depthWrite={false} // Important for glowing effect
                blending={THREE.AdditiveBlending} // Glow blends nicely
                side={THREE.BackSide} // Render on the inside of the sphere so it doesn't occlude the planet
            />
        </mesh>
    );
}

// Thick Atmosphere (e.g. Venus, Titan)
export function ThickAtmosphere({
    radius,
    color,
    intensity = 0.8
}: {
    radius: number;
    color: string;
    secondaryColor?: string;
    intensity?: number;
}) {
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        }
    });

    return (
        <group>
            {/* Inner dense haze */}
            <mesh>
                <sphereGeometry args={[radius * 1.15, 48, 48]} />
                {/* @ts-ignore */}
                <atmosphereMaterial
                    ref={materialRef}
                    uColor={new THREE.Color(color)}
                    uIntensity={intensity * 2.0} // Brighter
                    uPow={2.5} // Softer falloff (more coverage)
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Outer distinct rim */}
            <mesh>
                <sphereGeometry args={[radius * 1.25, 48, 48]} />
                {/* @ts-ignore */}
                <atmosphereMaterial
                    uColor={new THREE.Color(color).offsetHSL(0.05, 0.2, 0.1)}
                    uIntensity={intensity}
                    uPow={5.0} // Very sharp outer rim
                    transparent
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    side={THREE.BackSide}
                />
            </mesh>
        </group>
    );
}

// Thin Atmosphere (e.g. Mars)
export function ThinAtmosphere({
    radius,
    color,
    intensity = 0.5
}: {
    radius: number;
    color: string;
    intensity?: number;
}) {
    const materialRef = useRef<THREE.ShaderMaterial>(null);

    useFrame((state) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;
        }
    });

    return (
        <mesh>
            <sphereGeometry args={[radius * 1.1, 32, 32]} />
            {/* @ts-ignore */}
            <atmosphereMaterial
                ref={materialRef}
                uColor={new THREE.Color(color)}
                uIntensity={intensity * 0.8}
                uPow={5.0} // Very thin rim
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                side={THREE.BackSide}
            />
        </mesh>
    );
}
