'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Ring, Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import { SolarSystemObject } from '@/data/solarSystemData';
import { VoxelSphere } from './VoxelSphere';
import { VoxelRing } from './VoxelRing';

interface CelestialBodyProps {
    data: SolarSystemObject;
    onSelect: (data: SolarSystemObject) => void;
    isPaused: boolean;
    orbitMode: 'simplified' | 'real';
    satellites?: SolarSystemObject[];
    timeScale?: number;
}

export function CelestialBody({ data, onSelect, isPaused, orbitMode, satellites, timeScale = 1 }: CelestialBodyProps) {
    const bodyGroupRef = useRef<THREE.Group>(null);
    const groupRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    // Calculate distance based on mode
    const scaledDistance = useMemo(() => {
        // If this is a satellite (has 'orbiting' property), use simplified relative distance always?
        // Or scale it? For visibility, satellites usually need relative scale.
        // data.distance for Moon is 2. For Jupiter moons might be less.
        if (data.orbiting) {
            return data.distance; // Keep satellites close to parents
        }

        if (orbitMode === 'simplified') return data.distance;

        // "Real" scale approximation (Better spacing to avoid Sun overlap)
        const realDistances: Record<string, number> = {
            'mercury': 8,
            'venus': 11,
            'earth': 15,
            'mars': 20,
            'jupiter': 35,
            'saturn': 50,
            'uranus': 70,
            'neptune': 90,
            'pluto': 110,
            'ceres': 28,
            'eris': 120,
            'makemake': 115,
            'haumea': 112
        };

        return realDistances[data.id] || data.distance * 2;
    }, [orbitMode, data.id, data.distance, data.orbiting]);

    // Use deterministic initial angle based on planet ID to avoid hydration errors
    const initialAngle = useMemo(() => {
        let hash = 0;
        for (let i = 0; i < data.id.length; i++) {
            hash = ((hash << 5) - hash) + data.id.charCodeAt(i);
            hash = hash & hash;
        }
        return (Math.abs(hash) % 360) * (Math.PI / 180);
    }, [data.id]);
    const angle = useRef(initialAngle);

    useFrame((state, delta) => {
        if (!isPaused && groupRef.current) {
            angle.current += delta * data.orbitSpeed * 0.1 * timeScale;
            const x = Math.cos(angle.current) * scaledDistance;
            const z = Math.sin(angle.current) * scaledDistance;
            groupRef.current.position.set(x, 0, z);
        }

        if (bodyGroupRef.current) { // Apply rotation and tilt to the inner group
            bodyGroupRef.current.rotation.y += delta * data.rotationSpeed * timeScale; // Also scale rotation? Yes.
            if (data.tilt) {
                bodyGroupRef.current.rotation.z = (data.tilt * Math.PI) / 180;
            }
        }
    });

    const handleClick = (e: any) => {
        e.stopPropagation();
        onSelect(data);
    };

    const orbitPoints = useMemo(() => {
        const points = [];
        const segments = 64;
        for (let i = 0; i <= segments; i++) {
            const theta = (i / segments) * Math.PI * 2;
            points.push(
                new THREE.Vector3(Math.cos(theta) * scaledDistance, 0, Math.sin(theta) * scaledDistance)
            );
        }
        return points;
    }, [scaledDistance]);

    // Calculate size based on mode
    const scaledSize = useMemo(() => {
        // Satellites need to be visible.
        if (data.orbiting) return data.size * (orbitMode === 'real' ? 0.5 : 1);

        if (orbitMode === 'simplified') return data.size;

        // Approximate relative sizes for "Real" mode
        return data.size; // Using stylized size even in real mode for visibility
    }, [orbitMode, data.size, data.orbiting]);

    // Determine Planet Type for Voxel Generation
    const planetType = useMemo(() => {
        if (data.id === 'earth') return 'earth';
        if (['jupiter', 'saturn', 'uranus', 'neptune'].includes(data.id)) return 'gas-giant';
        if (data.id === 'moon') return 'rocky'; // Use rocky for Moon
        return 'rocky';
    }, [data.id]);

    const voxelResolution = Math.max(16, Math.min(48, Math.floor(scaledSize * 15)));

    return (
        <group>
            {/* Dashed Orbit Path */}
            <Line
                points={orbitPoints}
                color="white"
                opacity={0.1}
                transparent
                lineWidth={1}
                dashed={true}
                dashScale={scaledDistance * 0.1}
                dashSize={1}
                gapSize={1}
                rotation={[0, 0, 0]}
            />

            {/* Planet Group - Animated Position */}
            <group ref={groupRef}>
                <group
                    ref={bodyGroupRef}
                    onClick={handleClick}
                    onPointerOver={() => setHovered(true)}
                    onPointerOut={() => setHovered(false)}
                >
                    {/* High Precision Voxel Sphere with Procedural Detail */}
                    <VoxelSphere
                        radius={scaledSize}
                        color={data.color}
                        resolution={voxelResolution}
                        type={planetType}
                    />
                </group>

                {data.hasRings && data.ringColor && (
                    <group rotation={[0, 0, (data.tilt ? (data.tilt * Math.PI) / 180 : 0)]}>
                        {/* Detailed Voxel Rings */}
                        <VoxelRing
                            innerRadius={scaledSize * 1.4}
                            outerRadius={scaledSize * (data.id === 'saturn' ? 2.5 : 1.8)}
                            color={data.ringColor}
                            count={data.id === 'saturn' ? 1500 : 800}
                        />
                    </group>
                )}

                {/* Satellites (Recursive) */}
                {satellites && satellites.map(sat => (
                    <CelestialBody
                        key={sat.id}
                        data={sat}
                        onSelect={onSelect}
                        isPaused={isPaused}
                        orbitMode={orbitMode}
                        timeScale={timeScale}
                    // Satellites of satellites? Not supported yet, but hierarchy works.
                    />
                ))}

                {hovered && (
                    <group>
                        <Html position={[0, scaledSize + 0.5, 0]} center style={{ pointerEvents: 'none' }}>
                            <div className="flex flex-col items-center animate-fade-in-up">
                                <div className="w-px h-4 bg-gradient-to-t from-white/50 to-transparent mb-0.5"></div>
                                <div className="bg-black/90 border border-white/30 backdrop-blur-md text-white px-3 py-1 rounded text-xs font-bold shadow-xl shadow-blue-500/10 whitespace-nowrap tracking-wide uppercase">
                                    {data.name}
                                </div>
                            </div>
                        </Html>
                    </group>
                )}
            </group>
        </group>
    );
}
