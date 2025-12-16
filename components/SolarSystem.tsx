'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { CelestialBody } from './CelestialBody';
import { AsteroidBelt } from './AsteroidBelt';
import { VoxelSphere } from './VoxelSphere';
import { solarSystemData, SolarSystemObject } from '@/data/solarSystemData';
import { RocketCursor } from './RocketCursor';

interface SolarSystemProps {
    selectedObject: SolarSystemObject | null;
    onSelectObject: (obj: SolarSystemObject | null) => void;
    orbitMode: 'simplified' | 'real';
    showCursor?: boolean;
    timeScale?: number;
}

interface SunProps {
    orbitMode?: 'simplified' | 'real';
    onSelect?: (obj: SolarSystemObject) => void;
    data?: SolarSystemObject;
}

function Sun({ orbitMode, onSelect, data }: SunProps) {
    const groupRef = useRef<THREE.Group>(null);

    // Scaling for Sun
    // Simplified: Radius 3
    // Real: Radius 5
    const size = orbitMode === 'real' ? 5 : 3;

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.1;
            groupRef.current.rotation.z += delta * 0.05;
        }
    });

    return (
        <group
            ref={groupRef}
            onClick={(e) => {
                if (onSelect && data) {
                    e.stopPropagation();
                    onSelect(data);
                }
            }}
            onPointerOver={() => { document.body.style.cursor = 'pointer' }}
            onPointerOut={() => { document.body.style.cursor = 'auto' }}
        >
            {/* Main sun Voxel Sphere */}
            <VoxelSphere
                radius={size}
                color="#FDB813"
                resolution={orbitMode === 'real' ? 64 : 24}
                type="star"
            />

            {/* Additional glow/voxel shell */}
            <group scale={1.2}>
                <mesh>
                    <boxGeometry args={[1, 1, 1]} />
                    <meshBasicMaterial visible={false} />
                </mesh>
            </group>

            {/* Point light at sun's position */}
            <pointLight
                position={[0, 0, 0]}
                intensity={3}
                distance={orbitMode === 'real' ? 2000 : 300}
                decay={1}
                color="#ffffff"
            />
        </group>
    );
}

function CameraController({ target, orbitMode }: { target: SolarSystemObject | null, orbitMode: 'simplified' | 'real' }) {
    return (
        <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={5}
            // Allow huge zoom out in real mode (distances go up to 400+)
            maxDistance={orbitMode === 'real' ? 3000 : 150}
            zoomSpeed={orbitMode === 'real' ? 4 : 0.8}
            panSpeed={orbitMode === 'real' ? 2 : 1}
        />
    );
}

function Scene({ selectedObject, onSelectObject, orbitMode, showCursor, timeScale = 1 }: SolarSystemProps) {
    // Separate primaries (Sun orbiters) and satellites (Moon, etc)
    const { primaries, satelliteMap, sunData } = useMemo(() => {
        const p: SolarSystemObject[] = [];
        const s: Record<string, SolarSystemObject[]> = {};
        let sun: SolarSystemObject | undefined;

        solarSystemData.forEach(obj => {
            if (obj.id === 'sun') {
                sun = obj;
                return;
            }

            if (obj.orbiting) {
                if (!s[obj.orbiting]) s[obj.orbiting] = [];
                s[obj.orbiting].push(obj);
            } else {
                p.push(obj);
            }
        });
        return { primaries: p, satelliteMap: s, sunData: sun };
    }, []);

    return (
        <>
            {/* Ambient light - increased for Toon material visibility */}
            <ambientLight intensity={0.7} />

            {/* Stars background */}
            <Stars
                radius={300}
                depth={60}
                count={5000}
                factor={7}
                saturation={0}
                fade
                speed={0.5}
            />

            {/* Sun */}
            <Sun orbitMode={orbitMode} onSelect={onSelectObject} data={sunData} />

            {/* Asteroid Belt */}
            <AsteroidBelt />

            {/* All celestial bodies */}
            {primaries.map((obj) => (
                <CelestialBody
                    key={obj.id}
                    data={obj}
                    onSelect={onSelectObject}
                    isPaused={selectedObject !== null}
                    orbitMode={orbitMode}
                    satellites={satelliteMap[obj.id]}
                    timeScale={timeScale}
                />
            ))}

            {/* Camera controls */}
            <CameraController target={selectedObject} orbitMode={orbitMode} />

            {/* Rocket Cursor */}
            {showCursor && <RocketCursor />}
        </>
    );
}

export default function SolarSystem({ selectedObject, onSelectObject, orbitMode, showCursor, timeScale }: SolarSystemProps) {
    return (
        <div className="w-full h-screen">
            <Canvas
                shadows
                camera={{ position: [0, 50, 80], fov: 60 }}
                gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
                onPointerMissed={() => onSelectObject(null)}
            >
                <Scene
                    selectedObject={selectedObject}
                    onSelectObject={onSelectObject}
                    orbitMode={orbitMode}
                    showCursor={showCursor}
                    timeScale={timeScale}
                />
            </Canvas>
        </div>
    );
}
