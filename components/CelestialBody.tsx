'use client';

import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, Ring, Html, Line } from '@react-three/drei';
import * as THREE from 'three';
import { SolarSystemObject } from '@/data/solarSystemData';
import { VoxelSphere } from './VoxelSphere';
import { VoxelRing } from './VoxelRing';
import { dictionary, Language } from '@/data/dictionary';
import { objectTranslations } from '@/data/objectTranslations';

interface CelestialBodyProps {
    data: SolarSystemObject;
    onSelect: (data: SolarSystemObject) => void;
    isPaused: boolean;
    orbitMode: 'simplified' | 'real';
    satellites?: SolarSystemObject[];
    timeScale?: number;
    lang: Language;
}

export function CelestialBody({ data, onSelect, isPaused, orbitMode, satellites, timeScale = 1, lang }: CelestialBodyProps) {
    const bodyGroupRef = useRef<THREE.Group>(null);
    const groupRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);

    // Get translation
    const translation = objectTranslations[data.id]?.[lang];
    const displayName = translation?.name || data.name;

    // Calculate distance based on mode
    const scaledDistance = useMemo(() => {
        if (orbitMode === 'simplified') {
            if (data.orbiting) return data.distance;
            return data.distance;
        }

        // Real Scale Mode
        // New Unified Scale: 1 unit = 25,000,000 km (Factor 1000 reduction)
        // This ensures coherence between size and distance.
        if (data.orbiting) {
            // Satellites: Scale distance relative to parent
            if (data.scientificDistance) {
                let alignedDist = data.scientificDistance / 25000000;
                // Min visual distance to avoid merging with planet mesh at this scale
                if (alignedDist < 0.003) alignedDist = 0.003 + (Math.random() * 0.001);
                return alignedDist;
            }
            return data.distance * 2; // Fallback
        }

        // Planets: Scale distance to fit scene
        if (data.scientificDistance) {
            return data.scientificDistance / 25000000;
        }

        // Fallback for objects without scientific data
        const realDistances: Record<string, number> = {
            'ceres': 16.52, // 413M / 25M
            'eris': 404,
            'makemake': 272,
            'haumea': 260
        };
        return realDistances[data.id] || data.distance * 0.1;
    }, [orbitMode, data.id, data.distance, data.orbiting, data.scientificDistance]);

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

        if (bodyGroupRef.current) {
            bodyGroupRef.current.rotation.y += delta * data.rotationSpeed * timeScale;
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
        if (orbitMode === 'simplified') return data.size;

        // Real Mode
        // Scale: 1 unit = 25,000,000 km
        if (data.scientificRadius) {
            return data.scientificRadius / 25000000;
        }

        // Fallback
        return data.size * 0.0001;
    }, [orbitMode, data.size, data.scientificRadius]);

    // Determine Planet Type for Voxel Generation
    const planetType = useMemo(() => {
        if (data.id === 'earth') return 'earth';
        if (['jupiter', 'saturn', 'uranus', 'neptune'].includes(data.id)) return 'gas-giant';
        if (data.id === 'moon') return 'rocky'; // Use rocky for Moon
        return 'rocky';
    }, [data.id]);

    const voxelResolution = Math.max(16, Math.min(48, Math.floor(scaledSize * 15)));

    const showOrbit = useMemo(() => {
        if (orbitMode === 'simplified') return true;
        // In Real Mode, hide orbits for small satellites/moon to avoid clutter
        return !['moon', 'iss', 'hubble', 'james-webb'].includes(data.id);
    }, [orbitMode, data.id]);

    return (
        <group>
            {/* Dashed Orbit Path */}
            {showOrbit && (
                <group>
                    <Line
                        points={orbitPoints}
                        color={orbitMode === 'real' ? data.color : 'white'}
                        opacity={orbitMode === 'real' ? 0.6 : 0.1}
                        transparent
                        lineWidth={orbitMode === 'real' ? 2 : 1}
                        dashed={true}
                        dashScale={scaledDistance * 0.1}
                        dashSize={1}
                        gapSize={1}
                        rotation={[0, 0, 0]}
                    />
                    {orbitMode === 'real' && (
                        <Html position={[scaledDistance, 0, 0]} zIndexRange={[0, 0]}>
                            <div
                                className="pointer-events-auto cursor-pointer flex items-center group"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onSelect(data);
                                }}
                            >
                                <div className={`w-2 h-2 rounded-full mr-2 opacity-1 transition-transform group-hover:scale-150`} style={{ backgroundColor: data.color }}></div>
                                <div className="bg-black/80 text-[10px] text-white/80 px-2 py-0.5 rounded border border-white/10 backdrop-blur-sm whitespace-nowrap opacity-50 group-hover:opacity-100 transition-opacity">
                                    {(dictionary[lang]?.orbitOf || 'Orbit of')} {displayName}
                                </div>
                            </div>
                        </Html>
                    )}
                </group>
            )}

            {/* Planet Group - Animated Position */}
            <group ref={groupRef} name={`celestial-${data.id}`}>
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
                        lang={lang}
                    // Satellites of satellites? Not supported yet, but hierarchy works.
                    />
                ))}

                {hovered && (
                    <group>
                        <Html position={[0, scaledSize + 0.5, 0]} center style={{ pointerEvents: 'none' }}>
                            <div className="flex flex-col items-center animate-fade-in-up">
                                <div className="w-px h-4 bg-gradient-to-t from-white/50 to-transparent mb-0.5"></div>
                                <div className="bg-black/90 border border-white/30 backdrop-blur-md text-white px-3 py-1 rounded text-xs font-bold shadow-xl shadow-blue-500/10 whitespace-nowrap tracking-wide uppercase">
                                    {displayName}
                                </div>
                            </div>
                        </Html>
                    </group>
                )}
            </group>
        </group>
    );
}
