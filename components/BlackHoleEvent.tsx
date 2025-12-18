'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { VoxelSphere } from './VoxelSphere';
import { VoxelRing } from './VoxelRing';

interface BlackHoleEventProps {
    isActive: boolean;
    onComplete: () => void;
    position: THREE.Vector3;
}

export function BlackHoleEvent({ isActive, onComplete, position }: BlackHoleEventProps) {
    const groupRef = useRef<THREE.Group>(null);
    const diskRef = useRef<THREE.Group>(null);
    const lensRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (!isActive) return;

        const time = state.clock.elapsedTime;

        // Slow majestic rotation of the whole system
        if (groupRef.current) {
            // Sway slightly
            groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.1;
        }

        // Accretion Disk Rotation
        if (diskRef.current) {
            diskRef.current.rotation.z -= delta * 0.4;
        }

        // Lens Ring Rotation (Simulates the light moving, though physically it's the same disk)
        if (lensRef.current) {
            lensRef.current.rotation.z -= delta * 0.4;
        }
    });

    useMemo(() => {
        if (isActive) {
            setTimeout(() => {
                onComplete();
            }, 30000);
        }
    }, [isActive, onComplete]);

    if (!isActive) return null;

    return (
        <group ref={groupRef} position={position} scale={25} rotation={[Math.PI / 8, 0, 0]}>
            {/* 1. THE VOID (Event Horizon) */}
            <VoxelSphere
                radius={7}
                color="#000000"
                resolution={64}
                type="rocky"
            />
            {/* Inner Glow (Photon Ring) */}
            <group rotation={[-Math.PI / 2, 0, 0]}>
                <VoxelRing
                    innerRadius={7.2}
                    outerRadius={8.5}
                    color="#FFFFFF"
                    count={800}
                />
            </group>


            {/* 2. THE ACCRETION DISK (Flat) */}
            <group ref={diskRef} rotation={[-Math.PI / 2, 0, 0]}>
                {/* Hot Inner Zone */}
                <VoxelRing
                    innerRadius={9}
                    outerRadius={18}
                    color="#FFDD00" // Bright Yellow/Gold
                    count={2000}
                />

                {/* Main Body */}
                <VoxelRing
                    innerRadius={18}
                    outerRadius={40}
                    color="#FF4500" // Orange/Red
                    count={4000}
                />

                {/* Outer Fade */}
                <VoxelRing
                    innerRadius={40}
                    outerRadius={65}
                    color="#550000" // Dark Red
                    count={2500}
                />
            </group>

            {/* 3. GRAVITATIONAL LENSING SIMULATION (Vertical Arch) */}
            {/* In Interstellar, the "Halo" over the top is actually the back of the disk bent up.
                We simulate this with a vertical ring shell acting as the "Arch". */}
            <group ref={lensRef}>
                {/* Top Arch */}
                <group rotation={[0, 0, 0]}>
                    {/* We use partial rings or full rings rotated to look like arches? 
                         VoxelRing is a full ring. Let's use a full ring but tilted to create the "sphere" look of the lensing.
                     */}
                    {/* Warped Light Top */}
                    <group rotation={[Math.PI / 2 + 0.2, 0, 0]} position={[0, 2, -2]}>
                        <VoxelRing
                            innerRadius={8}
                            outerRadius={12}
                            color="#FFAA00"
                            count={1200}
                        />
                    </group>
                </group>

                {/* Bottom Arch (Warped light from underneath) */}
                <group rotation={[Math.PI / 2 - 0.2, 0, 0]} position={[0, -2, -2]}>
                    <VoxelRing
                        innerRadius={8}
                        outerRadius={12}
                        color="#FFAA00"
                        count={1200}
                    />
                </group>
            </group>

            {/* 4. GOD RAYS / ATMOSPHERE PARTICLES */}
            <group rotation={[-Math.PI / 2, 0, 0]}>
                <VoxelRing
                    innerRadius={60}
                    outerRadius={100}
                    color="#222222"
                    count={1000}
                />
            </group>

        </group>
    );
}
