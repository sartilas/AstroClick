'use client';

import { useRef, useMemo, useState, forwardRef, useEffect, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import { CelestialBody } from './CelestialBody';
import { AsteroidBelt } from './AsteroidBelt';
import { VoxelSphere } from './VoxelSphere';
import { solarSystemData, SolarSystemObject } from '@/data/solarSystemData';
import { kerbolSystemData } from '@/data/kerbolSystemData';
import { RocketCursor } from './RocketCursor';
import { PhysicsManager } from './PhysicsManager';
import { ShootingStars } from './ShootingStars';
import { dictionary, Language } from '@/data/dictionary';
import { Leaderboard } from './Leaderboard';
import { Rocket, LayerMode, SystemType } from './types';
import { Effects } from './Effects';
import { HabitableZoneLayer } from './layers/HabitableZoneLayer';
import { GravityWellLayer } from './layers/GravityWellLayer';
import { LagrangePointsLayer } from './layers/LagrangePointsLayer';
import { BlackHoleEvent } from './BlackHoleEvent';
import { AlienShip } from './AlienShip';
import { FermiParadoxModal } from './FermiParadoxModal';



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
    blackHoleActive?: boolean;
    onBlackHoleComplete?: () => void;
    systemType?: SystemType;
}

interface SunProps {
    orbitMode?: 'simplified' | 'real';
    onSelect?: (obj: SolarSystemObject) => void;
    onDoubleClick?: (obj: SolarSystemObject) => void;
    data?: SolarSystemObject;
    rtxMode?: boolean;
    sunRef?: React.RefObject<THREE.Mesh>;
    color?: string; // Allow custom color for Kerbol
}

function Sun({ orbitMode, onSelect, onDoubleClick, data, rtxMode, sunRef, color = '#FDB813' }: SunProps) {
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
            name={data ? `celestial-${data.id}` : "celestial-sun"}
            onClick={(e) => {
                if (onSelect && data) {
                    e.stopPropagation();
                    onSelect(data);
                }
            }}
            onDoubleClick={(e) => {
                if (onDoubleClick && data) {
                    e.stopPropagation();
                    onDoubleClick(data);
                }
            }}
            onPointerOver={() => { document.body.style.cursor = 'pointer' }}
            onPointerOut={() => { document.body.style.cursor = 'auto' }}
        >
            {/* Main sun Voxel Sphere */}
            <VoxelSphere
                radius={size}
                color={color}
                resolution={orbitMode === 'real' ? 64 : 24}
                type="star"
                castShadow={false}
            />

            {/* God Rays Source Mesh - Core light */}
            <mesh ref={sunRef} visible={rtxMode}>
                <sphereGeometry args={[size * 0.9, 32, 32]} />
                <meshBasicMaterial color={color} transparent opacity={0.5} />
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

function CameraController({
    target,
    orbitMode,
    resetCameraTrigger,
    focusTarget,
    onClearFocus
}: {
    target: SolarSystemObject | null,
    orbitMode: 'simplified' | 'real',
    resetCameraTrigger: number,
    focusTarget: string | null,
    onClearFocus: () => void
}) {
    const controlsRef = useRef<any>(null);
    const prevTrigger = useRef(resetCameraTrigger);
    const { scene } = useThree();
    const isDragging = useRef(false);

    // Handle mouse events to detect right-click drag (exit focus mode)
    useEffect(() => {
        const handleMouseDown = (e: MouseEvent) => {
            if (e.button === 2) { // Right click
                isDragging.current = true;
            }
        };

        const handleMouseUp = (e: MouseEvent) => {
            if (e.button === 2 && isDragging.current) {
                isDragging.current = false;
            }
        };

        const handleMouseMove = (e: MouseEvent) => {
            // If right-click dragging while focused, clear focus to allow free camera
            if (isDragging.current && focusTarget && (e.movementX !== 0 || e.movementY !== 0)) {
                onClearFocus();
            }
        };

        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [focusTarget, onClearFocus]);

    useFrame(() => {
        // Handle reset camera trigger
        if (resetCameraTrigger !== prevTrigger.current) {
            if (controlsRef.current) {
                controlsRef.current.reset();
            }
            prevTrigger.current = resetCameraTrigger;
        }

        // Follow focus target smoothly
        if (focusTarget && controlsRef.current) {
            const targetObj = scene.getObjectByName(`celestial-${focusTarget}`);
            if (targetObj) {
                const targetPos = new THREE.Vector3();
                targetObj.getWorldPosition(targetPos);

                // Smoothly lerp camera target to the object
                controlsRef.current.target.lerp(targetPos, 0.05);
                controlsRef.current.update();
            }
        }
    });

    return (
        <OrbitControls
            ref={controlsRef}
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={orbitMode === 'real' ? 0.1 : 5}
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
    blackHoleActive?: boolean;
    onBlackHoleComplete?: () => void;
    systemType: SystemType;
    focusTarget: string | null;
    setFocusTarget: React.Dispatch<React.SetStateAction<string | null>>;
    onOpenFermi: () => void;
}

function Scene({ selectedObject, onSelectObject, orbitMode, showCursor, timeScale = 1, lang, rockets, setRockets, history, setHistory, rtxMode, layerMode, resetCameraTrigger, blackHoleActive, onBlackHoleComplete, systemType, focusTarget, setFocusTarget, onOpenFermi }: SceneProps) {
    const sunRef = useRef<THREE.Mesh>(null);

    // Callback to clear focus (when user right-click drags)
    const handleClearFocus = useCallback(() => {
        setFocusTarget(null);
    }, [setFocusTarget]);

    // Handle double-click on objects to focus camera
    const handleDoubleClick = useCallback((obj: SolarSystemObject) => {
        setFocusTarget(obj.id);
    }, [setFocusTarget]);

    // Get current system data based on systemType
    const currentSystemData = systemType === 'kerbol' ? kerbolSystemData : solarSystemData;
    const starId = systemType === 'kerbol' ? 'kerbol' : 'sun';

    // Separate primaries (Star orbiters) and satellites (Moons, etc)
    const { primaries, satelliteMap, starData } = useMemo(() => {
        const p: SolarSystemObject[] = [];
        const s: Record<string, SolarSystemObject[]> = {};
        let star: SolarSystemObject | undefined;

        currentSystemData.forEach(obj => {
            if (obj.id === starId) {
                star = obj;
                return;
            }

            if (obj.orbiting) {
                if (!s[obj.orbiting]) s[obj.orbiting] = [];
                s[obj.orbiting].push(obj);
            } else {
                p.push(obj);
            }
        });
        return { primaries: p, satelliteMap: s, starData: star };
    }, [currentSystemData, starId]);



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

            {/* Star (Sun or Kerbol) */}
            <Sun orbitMode={orbitMode} onSelect={onSelectObject} onDoubleClick={handleDoubleClick} data={starData} rtxMode={rtxMode} sunRef={sunRef} color={starData?.color || '#FDB813'} />

            {/* RTX Effects */}
            <Effects sunRef={sunRef} rtxMode={rtxMode} />

            {/* Black Hole Easter Egg */}
            {blackHoleActive && (
                <BlackHoleEvent
                    isActive={blackHoleActive}
                    onComplete={() => onBlackHoleComplete && onBlackHoleComplete()}
                    position={new THREE.Vector3(0, 0, -400)}
                />
            )}

            {/* Alien Ship Easter Egg (Solar System Only) */}
            {systemType === 'solar' && (
                <AlienShip
                    position={[120, 10, 80]}
                    onOpen={onOpenFermi}
                    lang={lang}
                />
            )}

            {/* LAYERS */}
            {layerMode === 'habitable' && <HabitableZoneLayer orbitMode={orbitMode} lang={lang} />}
            {layerMode === 'gravity' && <GravityWellLayer systemType={systemType} />}
            {layerMode === 'lagrange' && <LagrangePointsLayer lang={lang} />}

            {/* Asteroid Belt - Only show for Solar System */}
            {systemType === 'solar' && <AsteroidBelt timeScale={timeScale} orbitMode={orbitMode} />}

            {/* All celestial bodies */}
            {primaries.map((obj) => (
                <CelestialBody
                    key={obj.id}
                    data={obj}
                    onSelect={onSelectObject}
                    onDoubleClick={handleDoubleClick}
                    isPaused={false}
                    orbitMode={orbitMode}
                    satellites={satelliteMap[obj.id]}
                    timeScale={timeScale}
                    lang={lang}
                />
            ))}

            {/* Camera controls */}
            <CameraController
                target={selectedObject}
                orbitMode={orbitMode}
                resetCameraTrigger={resetCameraTrigger}
                focusTarget={focusTarget}
                onClearFocus={handleClearFocus}
            />

            {/* Rocket Cursor */}
            {showCursor && <RocketCursor isKSP={systemType === 'kerbol'} />}

            {/* Physics Manager */}
            <PhysicsManager
                isActive={showCursor || false}
                timeScale={timeScale}
                rockets={rockets}
                setRockets={setRockets}
                history={history}
                setHistory={setHistory}
                blackHole={{
                    active: !!blackHoleActive,
                    position: new THREE.Vector3(0, 0, -400),
                    mass: 200000,
                    radius: 150
                }}
                systemType={systemType}
            />
        </>
    );
}

export default function SolarSystem({ selectedObject, onSelectObject, orbitMode, showCursor, timeScale, lang, rtxMode = false, layerMode, isHudVisible, resetCameraTrigger, blackHoleActive, onBlackHoleComplete, systemType = 'solar' }: SolarSystemProps) {
    const [rockets, setRockets] = useState<Rocket[]>([]);
    const [history, setHistory] = useState<Rocket[]>([]);
    const [focusTarget, setFocusTarget] = useState<string | null>(null);
    const [fermiModalOpen, setFermiModalOpen] = useState(false);


    return (
        <div className="w-full h-screen relative">
            {isHudVisible && <Leaderboard rockets={rockets} history={history} />}

            <FermiParadoxModal
                isOpen={fermiModalOpen}
                onClose={() => setFermiModalOpen(false)}
                lang={lang}
            />


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
                    blackHoleActive={blackHoleActive}
                    onBlackHoleComplete={onBlackHoleComplete}
                    systemType={systemType}
                    focusTarget={focusTarget}
                    setFocusTarget={setFocusTarget}
                    onOpenFermi={() => setFermiModalOpen(true)}
                />
            </Canvas>
        </div>
    );
}
