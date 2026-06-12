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
import { SunGlow } from './SunGlow';
import { Comet } from './Comet';



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
    // External camera focus request (guided tour, search bar). trigger increments on each request.
    flyToRequest?: { id: string; trigger: number } | null;
    // Date simulation: planet angles to apply when trigger changes
    angleSync?: { trigger: number; angles: Record<string, number> } | null;
}

interface SunProps {
    orbitMode?: 'simplified' | 'real';
    onSelect?: (obj: SolarSystemObject) => void;
    onDoubleClick?: (obj: SolarSystemObject) => void;
    data?: SolarSystemObject;
    rtxMode?: boolean;
    sunRef?: React.RefObject<THREE.Mesh | null>;
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

            {/* Corona / halo glow - slightly larger in real mode so the star stays visible from afar.
                Hidden in RTX mode: Bloom + GodRays already provide the glow there. */}
            {!rtxMode && <SunGlow radius={orbitMode === 'real' ? size * 3 : size} color={color} />}

            {/* Point light at sun's position */}
            <pointLight
                position={[0, 0, 0]}
                intensity={rtxMode ? 6 : 3}
                distance={orbitMode === 'real' ? 1000 : 500}
                decay={rtxMode ? 0 : 1}
                color="#ffffff"
                castShadow={rtxMode}
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
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
    onClearFocus,
    focusDistance,
    onArrived
}: {
    target: SolarSystemObject | null,
    orbitMode: 'simplified' | 'real',
    resetCameraTrigger: number,
    focusTarget: string | null,
    onClearFocus: () => void,
    focusDistance: number | null,
    onArrived: () => void
}) {
    const controlsRef = useRef<any>(null);
    const prevTrigger = useRef(resetCameraTrigger);
    const { scene, camera } = useThree();
    const isDragging = useRef(false);
    const targetPos = useRef(new THREE.Vector3());
    const camOffset = useRef(new THREE.Vector3());

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
                targetObj.getWorldPosition(targetPos.current);

                // Smoothly lerp camera target to the object
                controlsRef.current.target.lerp(targetPos.current, 0.05);

                // Fly the camera to a comfortable viewing distance (tour / search requests).
                // Once arrived, onArrived clears focusDistance so manual zoom isn't fought.
                if (focusDistance !== null) {
                    camOffset.current.copy(camera.position).sub(controlsRef.current.target);
                    const dist = camOffset.current.length();
                    const newDist = THREE.MathUtils.lerp(dist, focusDistance, 0.06);
                    camOffset.current.normalize().multiplyScalar(newDist);
                    camera.position.copy(controlsRef.current.target).add(camOffset.current);
                    if (Math.abs(newDist - focusDistance) < focusDistance * 0.05) {
                        onArrived();
                    }
                }

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
    focusDistance: number | null;
    setFocusDistance: React.Dispatch<React.SetStateAction<number | null>>;
    onOpenFermi: () => void;
}

function Scene({ selectedObject, onSelectObject, orbitMode, showCursor, timeScale = 1, lang, rockets, setRockets, history, setHistory, rtxMode, layerMode, resetCameraTrigger, blackHoleActive, onBlackHoleComplete, systemType, focusTarget, setFocusTarget, focusDistance, setFocusDistance, onOpenFermi, angleSync }: SceneProps) {
    const sunRef = useRef<THREE.Mesh>(null);

    // Callback to clear focus (when user right-click drags)
    const handleClearFocus = useCallback(() => {
        setFocusTarget(null);
        setFocusDistance(null);
    }, [setFocusTarget, setFocusDistance]);

    // Handle double-click on objects to focus camera (target follow only, no fly)
    const handleDoubleClick = useCallback((obj: SolarSystemObject) => {
        setFocusTarget(obj.id);
        setFocusDistance(null);
    }, [setFocusTarget, setFocusDistance]);

    // Stop flying once arrived so the user keeps manual zoom control
    const handleArrived = useCallback(() => {
        setFocusDistance(null);
    }, [setFocusDistance]);

    // Get current system data based on systemType
    const currentSystemData = systemType === 'kerbol' ? kerbolSystemData : solarSystemData;
    const starId = systemType === 'kerbol' ? 'kerbol' : 'sun';

    // Separate primaries (Star orbiters), satellites (Moons, etc) and comets
    const { primaries, satelliteMap, starData, comets } = useMemo(() => {
        const p: SolarSystemObject[] = [];
        const s: Record<string, SolarSystemObject[]> = {};
        const c: SolarSystemObject[] = [];
        let star: SolarSystemObject | undefined;

        currentSystemData.forEach(obj => {
            if (obj.id === starId) {
                star = obj;
                return;
            }

            if (obj.type === 'comet') {
                c.push(obj);
            } else if (obj.orbiting) {
                if (!s[obj.orbiting]) s[obj.orbiting] = [];
                s[obj.orbiting].push(obj);
            } else {
                p.push(obj);
            }
        });
        return { primaries: p, satelliteMap: s, starData: star, comets: c };
    }, [currentSystemData, starId]);



    return (
        <>
            {/* Ambient light - drastically reduced in RTX mode for contrast */}
            <ambientLight intensity={rtxMode ? 0.1 : 1.5} />
            <hemisphereLight intensity={rtxMode ? 0.1 : 0.6} groundColor="#000000" color="#ffffff" />

            {/* Stars background - two layers for parallax depth */}
            <Stars
                radius={orbitMode === 'real' ? 2000 : 300}
                depth={60}
                count={5000}
                factor={7}
                saturation={0}
                fade
                speed={0.5}
            />
            <Stars
                radius={orbitMode === 'real' ? 3000 : 450}
                depth={120}
                count={2000}
                factor={4}
                saturation={0.4}
                fade
                speed={0.2}
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

            {/* Comets (elliptical orbit + particle tails) */}
            {comets.map((obj) => (
                <Comet
                    key={obj.id}
                    data={obj}
                    onSelect={onSelectObject}
                    onDoubleClick={handleDoubleClick}
                    orbitMode={orbitMode}
                    timeScale={timeScale}
                    lang={lang}
                />
            ))}

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
                    angleSync={angleSync}
                />
            ))}

            {/* Camera controls */}
            <CameraController
                target={selectedObject}
                orbitMode={orbitMode}
                resetCameraTrigger={resetCameraTrigger}
                focusTarget={focusTarget}
                onClearFocus={handleClearFocus}
                focusDistance={focusDistance}
                onArrived={handleArrived}
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

export default function SolarSystem({ selectedObject, onSelectObject, orbitMode, showCursor, timeScale, lang, rtxMode = false, layerMode, isHudVisible, resetCameraTrigger, blackHoleActive, onBlackHoleComplete, systemType = 'solar', flyToRequest, angleSync }: SolarSystemProps) {
    const [rockets, setRockets] = useState<Rocket[]>([]);
    const [history, setHistory] = useState<Rocket[]>([]);
    const [focusTarget, setFocusTarget] = useState<string | null>(null);
    const [focusDistance, setFocusDistance] = useState<number | null>(null);
    const [fermiModalOpen, setFermiModalOpen] = useState(false);

    // External fly-to requests (guided tour, search bar)
    useEffect(() => {
        if (!flyToRequest) return;
        const data = systemType === 'kerbol' ? kerbolSystemData : solarSystemData;
        const obj = data.find(o => o.id === flyToRequest.id);
        if (!obj) return;

        // Comfortable viewing distance based on object size and scale mode
        const distance = orbitMode === 'real'
            ? Math.max(((obj.scientificRadius || 1000) / 25000000) * 12, 0.6)
            : Math.max(obj.size * 7, 3);

        setFocusTarget(flyToRequest.id);
        setFocusDistance(distance);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [flyToRequest?.trigger]);


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
                dpr={[1, 2]} // Cap pixel ratio: avoids rendering 3x resolution on high-DPI screens
                gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, powerPreference: 'high-performance', preserveDrawingBuffer: true }} // preserveDrawingBuffer: needed for Photo Mode canvas capture
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
                    focusDistance={focusDistance}
                    setFocusDistance={setFocusDistance}
                    onOpenFermi={() => setFermiModalOpen(true)}
                    angleSync={angleSync}
                />
            </Canvas>
        </div>
    );
}
