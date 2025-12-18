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
import { PhysicsManager } from './PhysicsManager';
import { ShootingStars } from './ShootingStars';
import { dictionary, Language } from '@/data/dictionary';
import { Leaderboard } from './Leaderboard';
import { Rocket, LayerMode } from './types';
import { useState, forwardRef } from 'react';
import { Effects } from './Effects';
import { HabitableZoneLayer } from './layers/HabitableZoneLayer';
import { GravityWellLayer } from './layers/GravityWellLayer';
import { LagrangePointsLayer } from './layers/LagrangePointsLayer';



interface SolarSystemProps {
    selectedObject: SolarSystemObject | null;
    onSelectObject: (obj: SolarSystemObject | null) => void;
    orbitMode: 'simplified' | 'real';
    showCursor?: boolean;
    timeScale?: number;
    lang: Language;
    rtxMode?: boolean;
    layerMode: LayerMode;
    isHudVisible: boolean;
    resetCameraTrigger: number;
}

interface SunProps {
    orbitMode?: 'simplified' | 'real';
    onSelect?: (obj: SolarSystemObject) => void;
    data?: SolarSystemObject;
    rtxMode?: boolean;
    sunRef?: React.RefObject<THREE.Mesh>;
}

function Sun({ orbitMode, onSelect, data, rtxMode, sunRef }: SunProps) {
    const groupRef = useRef<THREE.Group>(null);

    // Scaling for Sun
    // Simplified: Radius 3
    // Real: Radius 0.02785 (Scientific: 696,340 / 25,000,000 = 0.02785) - Factor 1000 reduction
    const size = orbitMode === 'real' ? 0.02785 : 3;

    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.1;
            groupRef.current.rotation.z += delta * 0.05;
        }
    });

    return (
        <group
            ref={groupRef}
            name="celestial-sun"
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
                castShadow={false}
            />

            {/* God Rays Source Mesh - Core light */}
            <mesh ref={sunRef} visible={rtxMode}>
                <sphereGeometry args={[size * 0.9, 32, 32]} />
                <meshBasicMaterial color="#FDB813" transparent opacity={0.5} />
            </mesh>

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
                intensity={rtxMode ? 6 : 3}
                distance={orbitMode === 'real' ? 1000 : 500}
                decay={rtxMode ? 0 : 1}
                color="#ffffff"
                castShadow={rtxMode}
                shadow-mapSize-width={4096}
                shadow-mapSize-height={4096}
                shadow-bias={-0.0005}
            />
        </group>
    );
}

function CameraController({ target, orbitMode, resetCameraTrigger }: { target: SolarSystemObject | null, orbitMode: 'simplified' | 'real', resetCameraTrigger: number }) {
    const controlsRef = useRef<any>(null);
    const prevTrigger = useRef(resetCameraTrigger);

    useFrame(() => {
        if (resetCameraTrigger !== prevTrigger.current) {
            if (controlsRef.current) {
                controlsRef.current.reset();
            }
            prevTrigger.current = resetCameraTrigger;
        }
    });

    return (
        <OrbitControls
            ref={controlsRef}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={orbitMode === 'real' ? 0.1 : 5}
            // Real mode: Neptune is at ~180 units. Max distance 1000 covers everything comfortably.
            maxDistance={orbitMode === 'real' ? 1000 : 150}
            zoomSpeed={orbitMode === 'real' ? 4 : 0.8}
            panSpeed={orbitMode === 'real' ? 2 : 1}
        />
    );
}


interface SceneProps extends SolarSystemProps {
    rockets: Rocket[];
    setRockets: React.Dispatch<React.SetStateAction<Rocket[]>>;
    history: Rocket[];
    setHistory: React.Dispatch<React.SetStateAction<Rocket[]>>;
    rtxMode: boolean;
    layerMode: LayerMode;
}

function Scene({ selectedObject, onSelectObject, orbitMode, showCursor, timeScale = 1, lang, rockets, setRockets, history, setHistory, rtxMode, layerMode, resetCameraTrigger }: SceneProps) {
    const sunRef = useRef<THREE.Mesh>(null);

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
            {/* Ambient light - drastically reduced in RTX mode for contrast */}
            <ambientLight intensity={rtxMode ? 0.1 : 1.5} />
            <hemisphereLight intensity={rtxMode ? 0.1 : 0.6} groundColor="#000000" color="#ffffff" />

            {/* Stars background */}
            <Stars
                radius={orbitMode === 'real' ? 2000 : 300}
                depth={60}
                count={5000}
                factor={7}
                saturation={0}
                fade
                speed={0.5}
            />

            {/* Shooting Stars Background Effect */}
            <ShootingStars />

            {/* Sun */}
            <Sun orbitMode={orbitMode} onSelect={onSelectObject} data={sunData} rtxMode={rtxMode} sunRef={sunRef} />

            {/* RTX Effects */}
            <Effects sunRef={sunRef} rtxMode={rtxMode} />

            {/* LAYERS */}
            {layerMode === 'habitable' && <HabitableZoneLayer orbitMode={orbitMode} />}
            {layerMode === 'gravity' && (
                <>
                    <color attach="background" args={['#ffffff']} />
                    <GravityWellLayer />
                </>
            )}
            {layerMode === 'lagrange' && <LagrangePointsLayer />}

            {/* Asteroid Belt */}
            <AsteroidBelt timeScale={timeScale} orbitMode={orbitMode} />

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
                    lang={lang}
                />
            ))}

            {/* Camera controls */}
            <CameraController target={selectedObject} orbitMode={orbitMode} resetCameraTrigger={resetCameraTrigger} />

            {/* Rocket Cursor */}
            {showCursor && <RocketCursor />}

            {/* Physics Manager */}
            <PhysicsManager
                isActive={showCursor || false}
                timeScale={timeScale}
                rockets={rockets}
                setRockets={setRockets}
                history={history}
                setHistory={setHistory}
            />
        </>
    );
}

export default function SolarSystem({ selectedObject, onSelectObject, orbitMode, showCursor, timeScale, lang, rtxMode = false, layerMode, isHudVisible, resetCameraTrigger }: SolarSystemProps) {
    const [rockets, setRockets] = useState<Rocket[]>([]);
    const [history, setHistory] = useState<Rocket[]>([]);


    return (
        <div className="w-full h-screen relative">
            {isHudVisible && <Leaderboard rockets={rockets} history={history} />}


            <Canvas
                shadows
                camera={{ position: [0, 50, 80], fov: 60, far: 5000 }} // Reduced far plane
                gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
                onPointerMissed={() => {
                    if (!showCursor) onSelectObject(null);
                }}
            >
                <Scene
                    selectedObject={selectedObject}
                    onSelectObject={onSelectObject}
                    orbitMode={orbitMode}
                    showCursor={showCursor}
                    timeScale={timeScale}
                    lang={lang}
                    rockets={rockets}
                    setRockets={setRockets}
                    history={history}
                    setHistory={setHistory}
                    rtxMode={rtxMode}
                    layerMode={layerMode}
                    isHudVisible={isHudVisible}
                    resetCameraTrigger={resetCameraTrigger}
                />
            </Canvas>
        </div>
    );
}
