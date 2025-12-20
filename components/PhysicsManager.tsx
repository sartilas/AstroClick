'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useMemo, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { Rocket, Explosion } from './types';
import { Trail, Text, Line } from '@react-three/drei';
import { solarSystemData } from '@/data/solarSystemData';

// Fun random names for satellites
const SATELLITE_NAMES = [
    "Voyager", "Pioneer", "Cassini", "Hubble", "Webb", "Sputnik", "Galileo",
    "Kepler", "Juno", "New Horizons", "Curiosity", "Perseverance", "Viking",
    "Rosetta", "Pathfinder", "Spirit", "Opportunity", "Artemis", "Apollo"
];

function getRandomName() {
    const name = SATELLITE_NAMES[Math.floor(Math.random() * SATELLITE_NAMES.length)];
    const num = Math.floor(Math.random() * 999) + 1;
    return `${name}-${num}`;
}

function formatScore(score: number): string {
    if (score >= 1000000) return (score / 1000000).toFixed(1) + 'M';
    if (score >= 1000) return (score / 1000).toFixed(1) + 'k';
    return Math.floor(score).toString();
}

interface PhysicsManagerProps {
    isActive: boolean;
    timeScale: number;
    rockets: Rocket[];
    setRockets: React.Dispatch<React.SetStateAction<Rocket[]>>;
    history: Rocket[];
    setHistory: React.Dispatch<React.SetStateAction<Rocket[]>>;
    blackHole?: {
        position: THREE.Vector3;
        active: boolean;
        mass: number;
        radius: number; // Event Horizon Radius
    }
}

export function PhysicsManager({ isActive, timeScale, rockets, setRockets, history, setHistory, blackHole }: PhysicsManagerProps) {
    const rocketsRef = useRef<Rocket[]>([]); // Ref to track rockets without re-binding listeners
    const [explosions, setExplosions] = useState<Explosion[]>([]);
    const { scene, camera, gl, pointer } = useThree();
    const raycaster = useMemo(() => new THREE.Raycaster(), []);

    // Charge & Trajectory State
    const [isCharging, setIsCharging] = useState(false);
    const isChargingRef = useRef(false); // Ref to avoid recreating listeners
    const chargeStartTimeRef = useRef<number>(0);
    const [trajectoryPoints, setTrajectoryPoints] = useState<THREE.Vector3[]>([]);
    const [isTrajectoryDanger, setIsTrajectoryDanger] = useState(false);

    // Audio ref for explosion
    const explosionAudio = useRef<HTMLAudioElement | null>(null);

    // Initialize audio
    useEffect(() => {
        explosionAudio.current = new Audio('https://cdn.pixabay.com/audio/2022/03/10/audio_c8c8a73467.mp3'); // Short explosion sound
        explosionAudio.current.volume = 0.4;
    }, []);

    const playExplosionSound = () => {
        if (explosionAudio.current) {
            explosionAudio.current.currentTime = 0;
            explosionAudio.current.play().catch(e => console.warn("Audio play failed", e));
        }
    };

    const totalPausedTimeRef = useRef(0);
    const pauseStartTimeRef = useRef<number | null>(null);

    // Track pause time
    useEffect(() => {
        if (timeScale === 0) {
            if (pauseStartTimeRef.current === null) {
                pauseStartTimeRef.current = Date.now();
            }
        } else {
            if (pauseStartTimeRef.current !== null) {
                totalPausedTimeRef.current += (Date.now() - pauseStartTimeRef.current);
                pauseStartTimeRef.current = null;
            }
        }
    }, [timeScale]);

    const getSimTime = useCallback(() => {
        let pausedDuration = totalPausedTimeRef.current;
        if (pauseStartTimeRef.current !== null) {
            pausedDuration += (Date.now() - pauseStartTimeRef.current);
        }
        return Date.now() - pausedDuration;
    }, []);

    // Constant variables
    const G = 50;
    const ATTRACTOR_G = 15000;
    const ATTRACTOR_DISTANCE = 50;
    const MAX_LIFETIME = 30000;

    // Physics Simulation Helper
    const calculatePhysicsStep = (pos: THREE.Vector3, vel: THREE.Vector3, delta: number, bodies: any[]) => {
        const force = new THREE.Vector3(0, 0, 0);
        let hasCollided = false;

        for (const bodyData of bodies) {
            const obj = scene.getObjectByName(`celestial-${bodyData.id}`);
            if (obj) {
                // Approximate position access for simulation (might lag one frame vs real update but fine for prediction)
                // For prediction, using the CURRENT body position is acceptable as planets move slowly compared to rockets
                const bodyPos = obj.position.clone();

                const distSq = pos.distanceToSquared(bodyPos);
                const dist = Math.sqrt(distSq);

                // Collision Check
                if (dist < (bodyData.radius + 0.5)) {
                    hasCollided = true;
                }

                // Gravity
                if (dist > bodyData.radius) {
                    const dir = bodyPos.clone().sub(pos).normalize();
                    const fVal = (G * bodyData.mass) / distSq;
                    force.add(dir.multiplyScalar(fVal));
                }
            }
        }

        if (!hasCollided) {
            vel.add(force.multiplyScalar(delta));
            pos.add(vel.clone().multiplyScalar(delta));
        }

        return hasCollided;
    };


    // Launch Logic extracted for reuse
    const launchRocket = useCallback(() => {
        // Calculate Launch Params
        raycaster.setFromCamera(pointer, camera);
        const origin = raycaster.ray.origin.clone();
        const direction = raycaster.ray.direction.clone();
        const startPos = origin.clone().add(direction.multiplyScalar(15));

        // FIXED SPEED (Refined for better feel)
        const speed = 60;
        const velocity = direction.multiplyScalar(speed * 0.05);

        const newRocket: Rocket = {
            id: Date.now(),
            position: startPos,
            velocity: velocity,
            createdAt: getSimTime(),
            color: '#AAA',
            name: getRandomName(),
            designType: Math.floor(Math.random() * 10),
            score: 0,
            attractorEnabled: false,
            lastMoveTime: getSimTime()
        };

        // Limit to 15 active satellites (increased from 10)
        if (rocketsRef.current.length < 15) {
            setRockets(prev => [...prev, newRocket]);
        }
        setTrajectoryPoints([]); // Clear trajectory
    }, [camera, pointer, raycaster, getSimTime, setRockets]);

    // Gestion du clavier pour lancer un satellite (Espace)
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!isActive) return;
            if (event.code !== 'Space') return;
            if (event.repeat) return; // Ignore auto-repeat

            // Start Charging
            if (!isChargingRef.current) {
                isChargingRef.current = true;
                setIsCharging(true);
                chargeStartTimeRef.current = Date.now();
            }
        };

        const handleKeyUp = (event: KeyboardEvent) => {
            if (!isActive) return;
            if (event.code !== 'Space') return;

            // Launch!
            if (isChargingRef.current) {
                isChargingRef.current = false;
                setIsCharging(false);
                launchRocket();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        // TOUCH HANDLING (Mobile/Tablet Long Press)

        const canvas = gl.domElement;

        const handleTouchStart = (e: TouchEvent) => {
            if (!isActive) return;
            // On touch start, we start "charging" (showing trajectory)
            // We do NOT preventDefault to allow user to pan camera while aiming
            if (!isChargingRef.current) {
                isChargingRef.current = true;
                setIsCharging(true);
                chargeStartTimeRef.current = Date.now();
            }
        };

        const handleTouchEnd = (e: TouchEvent) => {
            if (!isActive) return;
            if (isChargingRef.current) {
                isChargingRef.current = false;
                setIsCharging(false);
                // Only launch if it was a valid charge (e.g. not cancelled by a huge swipe if we wanted logic for that)
                // For now, simplicity: Release finger = launch
                launchRocket();
            }
        };

        canvas.addEventListener('touchstart', handleTouchStart);
        canvas.addEventListener('touchend', handleTouchEnd);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            canvas.removeEventListener('touchstart', handleTouchStart);
            canvas.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isActive, launchRocket, gl.domElement]);

    const explodeSatellite = (id: number, position: THREE.Vector3) => {
        setExplosions(prev => [...prev, { id: Math.random(), position: position.clone(), startTime: getSimTime() }]);
        playExplosionSound();
        setRockets(prev => {
            const rocket = prev.find(r => r.id === id);
            if (rocket) {
                setHistory(prevHistory => {
                    const newHistory = [...prevHistory, { ...rocket, score: rocket.score }];
                    return newHistory.sort((a, b) => b.score - a.score).slice(0, 10);
                });
            }
            return prev.filter(r => r.id !== id);
        });
    };

    useFrame((state, delta) => {
        // --- 1. TRAJECTORY PREDICTION (Always show when mode is active) ---
        if (isActive) {
            raycaster.setFromCamera(pointer, camera);
            const origin = raycaster.ray.origin.clone();
            const direction = raycaster.ray.direction.clone();
            const startPos = origin.clone().add(direction.multiplyScalar(15));
            const speed = 60; // Fixed speed matches launch math
            const startVel = direction.multiplyScalar(speed * 0.05);

            const points: THREE.Vector3[] = [startPos.clone()];
            const simPos = startPos.clone();
            const simVel = startVel.clone();

            // Physics Bodies for Simulation
            const bodies = solarSystemData.map(d => ({
                id: d.id,
                mass: d.id === 'sun' ? 2000 : (d.size * 200),
                radius: d.id === 'sun' ? 5 : (d.size * 1.5)
            }));

            // Simulate 100 steps into future
            // Using a fixed delta for prediction to ensure consistent curve regardless of framerate
            const simDelta = 0.016 * 2; // Simulate roughly 2x speed for preview

            let collisionDetected = false;
            for (let i = 0; i < 300; i++) {
                let collided = calculatePhysicsStep(simPos, simVel, simDelta, bodies);
                // Also check Black Hole collision for prediction if active
                if (blackHole && blackHole.active) {
                    const bhDist = simPos.distanceTo(blackHole.position);
                    if (bhDist < blackHole.radius) {
                        collided = true; // Treat absorption as collision/danger
                    }
                }

                points.push(simPos.clone());
                if (collided) {
                    collisionDetected = true;
                    break;
                }
            }

            setTrajectoryPoints(points);
            setIsTrajectoryDanger(collisionDetected);
        } else if (trajectoryPoints.length > 0) {
            setTrajectoryPoints([]);
        }


        // if (rockets.length === 0 && explosions.length === 0) return; // REMOVED to keep focus

        // Apply reduced simulation speed for satellites as requested
        const SIMULATION_SPEED_FACTOR = 0.2;
        const scaledDelta = delta * timeScale * SIMULATION_SPEED_FACTOR;

        if (scaledDelta <= 0 && timeScale !== 0) return;
        if (timeScale === 0) return;

        rocketsRef.current = rockets;
        const now = getSimTime();
        let activeRockets: Rocket[] = [];

        // Attractor vars
        raycaster.setFromCamera(pointer, camera);
        const cursorOrigin = raycaster.ray.origin.clone();
        const cursorDir = raycaster.ray.direction.clone();
        const attractorPos = cursorOrigin.add(cursorDir.multiplyScalar(ATTRACTOR_DISTANCE));

        if (explosions.length > 0) {
            setExplosions(prev => prev.filter(e => now - e.startTime < 1000));
        }

        if (rockets.length === 0) return;

        const bodies = solarSystemData.map(d => ({
            id: d.id,
            // Reduced Sun mass (was 5000), kept others scaled
            mass: d.id === 'sun' ? 2000 : (d.size * 200),
            radius: d.id === 'sun' ? 5 : (d.size * 1.5)
        }));

        rockets.forEach(rocket => {
            // --- SCORING & PHYSICS UPDATE ---
            const velocity = rocket.velocity;
            const distanceMoved = velocity.length() * scaledDelta;
            rocket.score += distanceMoved * 100;

            if (distanceMoved > 0.0001) rocket.lastMoveTime = now;

            // --- DESTRUCTION LIMITS ---
            // 1. Timeout (Stopped moving)
            if (now - rocket.lastMoveTime > 8000) {
                activeRockets.push({ ...rocket, kill: true, reason: 'STOPPED' } as any);
                return;
            }

            // 2. Out of bounds (Satellite lost in deep space)
            // Solar system radius is around 100-200. 500 is a safe "lost" distance.
            const distFromCenter = rocket.position.length();
            if (distFromCenter > 500) {
                activeRockets.push({ ...rocket, kill: true, reason: 'SIGNAL_LOST' } as any);
                return;
            }

            let hasCollided = false;
            const force = new THREE.Vector3(0, 0, 0);

            // Gravity & Collision
            for (const bodyData of bodies) {
                const obj = scene.getObjectByName(`celestial-${bodyData.id}`);
                if (obj) {
                    const bodyPos = new THREE.Vector3();
                    obj.getWorldPosition(bodyPos);

                    const distSq = rocket.position.distanceToSquared(bodyPos);
                    const dist = Math.sqrt(distSq);

                    if (dist < (bodyData.radius + 0.5)) {
                        hasCollided = true;
                        activeRockets.push({ ...rocket, kill: true, collision: true } as any);
                        break;
                    }

                    if (dist > bodyData.radius) {
                        const dir = bodyPos.clone().sub(rocket.position).normalize();
                        const fVal = (G * bodyData.mass) / distSq;
                        force.add(dir.multiplyScalar(fVal));
                    }
                }
            }
            if (hasCollided) return;

            // Attractor (Only if enabled)
            if (rocket.attractorEnabled && now - rocket.createdAt < 5000) {
                const distSq = rocket.position.distanceToSquared(attractorPos);
                if (distSq < 2) {
                    rocket.attractorEnabled = false;
                } else if (distSq > 5) {
                    const dir = attractorPos.clone().sub(rocket.position).normalize();
                    const fVal = ATTRACTOR_G / distSq;
                    force.add(dir.multiplyScalar(fVal));
                }
            }

            // BLACK HOLE ATTRACTION
            if (blackHole && blackHole.active) {
                const bhPos = blackHole.position;
                const distSqMax = rocket.position.distanceToSquared(bhPos);
                const dist = Math.sqrt(distSqMax);

                // Event Horizon (Absorption)
                if (dist < blackHole.radius) {
                    activeRockets.push({ ...rocket, kill: true, collision: false, reason: 'ABSORBED' } as any);
                    return;
                }

                // Super Gravity
                const dir = bhPos.clone().sub(rocket.position).normalize();
                // Stronger gravity than Sun
                const fVal = (G * blackHole.mass) / distSqMax;

                // Add drag to make them spiral in
                velocity.multiplyScalar(0.99);

                force.add(dir.multiplyScalar(fVal));
                // Also pull velocity vector to align with force for "suck in" effect
                rocket.velocity.lerp(dir.multiplyScalar(100), 0.02 * scaledDelta);
            }

            // Integration
            rocket.velocity.add(force.multiplyScalar(scaledDelta));
            rocket.position.add(rocket.velocity.clone().multiplyScalar(scaledDelta));
            activeRockets.push(rocket);
        });

        // Filter killed rockets and update state
        const surviving = activeRockets.filter((r: any) => !r.kill);
        const killed = activeRockets.filter((r: any) => r.kill);

        if (killed.length > 0) {
            killed.forEach((r: any) => {
                setExplosions(prev => [...prev, { id: Math.random(), position: r.position.clone(), startTime: now }]);
                playExplosionSound();
                if (r.collision || r.reason === 'SIGNAL_LOST') {
                    setHistory(prev => {
                        const h = [...prev, { ...r, score: r.score }];
                        return h.sort((a, b) => b.score - a.score).slice(0, 10);
                    });
                }
            });
        }

        if (surviving.length !== rockets.length || state.clock.elapsedTime % 0.2 < 0.05) {
            setRockets(surviving);
        }
    });

    return (
        <group>
            {rockets.map(rocket => (
                <SatelliteMesh
                    key={rocket.id}
                    rocket={rocket}
                    onClick={() => explodeSatellite(rocket.id, rocket.position)}
                    isPaused={timeScale === 0}
                />
            ))}
            {explosions.map(ex => (
                <ExplosionEffect key={ex.id} position={ex.position} />
            ))}
            {/* TRAJECTORY LINE */}
            {trajectoryPoints.length > 1 && (
                <Line
                    points={trajectoryPoints}
                    color={isTrajectoryDanger ? "#FF3333" : "#33FF33"}
                    lineWidth={3}
                    dashed={true}
                    dashScale={2}
                    dashSize={2}
                    gapSize={1}
                    opacity={0.6}
                    transparent
                />
            )}
        </group >
    );
}

function SatelliteMesh({ rocket, onClick, isPaused }: { rocket: Rocket; onClick: () => void; isPaused: boolean }) {
    const ref = useRef<THREE.Group>(null);
    const textRef = useRef<THREE.Group>(null);
    const [hovered, setHover] = useState(false);

    useEffect(() => {
        document.body.style.cursor = hovered ? 'pointer' : 'auto';
    }, [hovered]);

    useFrame((state) => {
        if (ref.current) {
            ref.current.position.copy(rocket.position);
            if (!isPaused) {
                ref.current.rotation.y += 0.01;
                ref.current.rotation.z += 0.005;
            }
        }
        // Make text look at camera
        if (textRef.current) {
            textRef.current.lookAt(state.camera.position);
        }
    });

    return (
        <group
            ref={ref}
            position={rocket.position}
            onPointerDown={(e) => {
                e.stopPropagation();
                onClick();
            }}
            onPointerOver={() => setHover(true)}
            onPointerOut={() => setHover(false)}
        >
            {/* Info Text Overlay */}
            <group position={[0, 2.5, 0]} ref={textRef}>
                <Text
                    fontSize={1.2}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.08}
                    outlineColor="#000000"
                >
                    {rocket.name}
                </Text>
                <Text
                    position={[0, -1.2, 0]}
                    fontSize={1.0}
                    color="#4fd0e7"
                    anchorX="center"
                    anchorY="middle"
                    outlineWidth={0.08}
                    outlineColor="#000000"
                >
                    {formatScore(rocket.score)} km
                </Text>
            </group>

            {/* Trail discret */}
            <Trail
                width={1.2}
                length={25}
                color={new THREE.Color("#4fd0e7")}
                attenuation={(t) => t * t}
            >
                <group scale={0.5}>
                    {/* Switch based on rocket.designType */}
                    {rocket.designType === 0 && (
                        /* Design 0: Standard Probe (The original one) */
                        <group>
                            {/* Main Bus - Hexagonal Prism */}
                            <mesh rotation={[0, 0, Math.PI / 2]}>
                                <cylinderGeometry args={[1, 1, 2, 6]} />
                                <meshStandardMaterial color="#D4AF37" roughness={0.3} metalness={0.8} />
                            </mesh>
                            {/* High Gain Antenna */}
                            <group position={[0, 1.2, 0]} rotation={[0.4, 0, 0]}>
                                <mesh>
                                    <sphereGeometry args={[0.8, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.3]} />
                                    <meshStandardMaterial color="#EEE" side={THREE.DoubleSide} />
                                </mesh>
                                <mesh position={[0, 0, 0.4]}>
                                    <cylinderGeometry args={[0.05, 0.05, 1]} />
                                    <meshStandardMaterial color="#888" />
                                </mesh>
                            </group>
                            {/* Solar Panels - Horizontal */}
                            <group position={[1.8, 0, 0]}>
                                <mesh>
                                    <boxGeometry args={[2.5, 0.1, 1.2]} />
                                    <meshStandardMaterial color="#112244" roughness={0.2} metalness={0.6} emissive="#001133" />
                                </mesh>
                            </group>
                            <group position={[-1.8, 0, 0]}>
                                <mesh>
                                    <boxGeometry args={[2.5, 0.1, 1.2]} />
                                    <meshStandardMaterial color="#112244" roughness={0.2} metalness={0.6} emissive="#001133" />
                                </mesh>
                            </group>
                        </group>
                    )}

                    {rocket.designType === 1 && (
                        /* Design 1: CubeSat Cluster */
                        <group>
                            <mesh>
                                <boxGeometry args={[1.5, 1.5, 1.5]} />
                                <meshStandardMaterial color="#C0C0C0" metalness={0.9} roughness={0.2} />
                            </mesh>
                            {/* Small sensors all around */}
                            {[...Array(6)].map((_, i) => (
                                <mesh key={i} position={[
                                    (i % 2 === 0 ? 1 : -1) * 0.6,
                                    (Math.floor(i / 2) % 2 === 0 ? 1 : -1) * 0.6,
                                    (Math.floor(i / 4) === 0 ? 1 : -1) * 0.6
                                ]}>
                                    <sphereGeometry args={[0.2]} />
                                    <meshStandardMaterial color="#FF4500" emissive="#FF0000" emissiveIntensity={0.5} />
                                </mesh>
                            ))}
                            {/* Solar Panels - X shape */}
                            <group rotation={[0, 0, Math.PI / 4]}>
                                <mesh position={[2, 0, 0]}>
                                    <boxGeometry args={[2, 0.1, 0.8]} />
                                    <meshStandardMaterial color="#000088" />
                                </mesh>
                                <mesh position={[-2, 0, 0]}>
                                    <boxGeometry args={[2, 0.1, 0.8]} />
                                    <meshStandardMaterial color="#000088" />
                                </mesh>
                            </group>
                        </group>
                    )}

                    {rocket.designType === 2 && (
                        /* Design 2: Cylinder Explorer */
                        <group>
                            <mesh rotation={[Math.PI / 2, 0, 0]}>
                                <cylinderGeometry args={[0.6, 0.6, 3, 12]} />
                                <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
                            </mesh>
                            <mesh position={[0, 0, 1.5]}>
                                <sphereGeometry args={[0.6]} />
                                <meshStandardMaterial color="#444" />
                            </mesh>
                            <mesh position={[0, 0, -1.6]} rotation={[Math.PI, 0, 0]}>
                                <coneGeometry args={[0.5, 0.8, 12]} />
                                <meshStandardMaterial color="#222" />
                            </mesh>
                            {/* Circular Solar Panel Ring */}
                            <mesh rotation={[Math.PI / 2, 0, 0]}>
                                <torusGeometry args={[1.5, 0.2, 8, 24]} />
                                <meshStandardMaterial color="#112244" />
                            </mesh>
                        </group>
                    )}

                    {rocket.designType === 3 && (
                        /* Design 3: Deep Space Triangle */
                        <group>
                            <mesh>
                                <coneGeometry args={[1.5, 0.5, 3]} />
                                <meshStandardMaterial color="#222" metalness={0.8} />
                            </mesh>
                            <mesh position={[0, -0.5, 0]}>
                                <cylinderGeometry args={[0.5, 0.2, 1, 6]} />
                                <meshStandardMaterial color="#888" />
                            </mesh>
                            {/* Large Dish on top */}
                            <mesh position={[0, 0.5, 0]} rotation={[-0.5, 0, 0]}>
                                <cylinderGeometry args={[1.2, 0.1, 0.2, 16]} />
                                <meshStandardMaterial color="#DDD" />
                            </mesh>
                        </group>
                    )}

                    {rocket.designType === 4 && (
                        /* Design 4: The "Sputnik" Style sphere with antennas */
                        <group>
                            <mesh>
                                <sphereGeometry args={[1, 32, 32]} />
                                <meshStandardMaterial color="#Silver" metalness={1} roughness={0.1} />
                            </mesh>
                            {[...Array(4)].map((_, i) => (
                                <mesh key={i} rotation={[0, 0, (Math.PI / 4) + (i * Math.PI / 2)]} position={[0, 0, 0]}>
                                    <cylinderGeometry args={[0.02, 0.02, 4]} />
                                    <meshStandardMaterial color="#AAA" />
                                </mesh>
                            ))}
                        </group>
                    )}

                    {rocket.designType === 5 && (
                        /* Design 5: The "Lander" Style */
                        <group>
                            <mesh position={[0, 0.5, 0]}>
                                <dodecahedronGeometry args={[1]} />
                                <meshStandardMaterial color="#DAA520" metalness={0.6} />
                            </mesh>
                            {/* Legs */}
                            {[0, 1, 2, 3].map(i => (
                                <group key={i} rotation={[0, (i * Math.PI) / 2, 0]}>
                                    <mesh position={[0.8, -0.5, 0]} rotation={[0, 0, -0.5]}>
                                        <boxGeometry args={[1.5, 0.1, 0.1]} />
                                        <meshStandardMaterial color="#888" />
                                    </mesh>
                                    <mesh position={[1.4, -1, 0]}>
                                        <cylinderGeometry args={[0.3, 0.3, 0.1]} />
                                        <meshStandardMaterial color="#555" />
                                    </mesh>
                                </group>
                            ))}
                        </group>
                    )}

                    {rocket.designType === 6 && (
                        /* Design 6: The "Telescope" */
                        <group rotation={[0, 0, Math.PI / 4]}>
                            <mesh>
                                <cylinderGeometry args={[0.8, 0.8, 3, 16]} />
                                <meshStandardMaterial color="#EEE" />
                            </mesh>
                            {/* Lens/Cover */}
                            <mesh position={[0, 1.55, 0]} rotation={[0, 0, 0]}>
                                <cylinderGeometry args={[0.85, 0.85, 0.2]} />
                                <meshStandardMaterial color="#111" />
                            </mesh>
                            <mesh position={[0, 1.65, 0]}>
                                <sphereGeometry args={[0.6, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
                                <meshStandardMaterial color="#4fd0e7" transparent opacity={0.6} />
                            </mesh>
                            {/* Side Solar Panel Single Wing */}
                            <mesh position={[1.5, 0, 0]}>
                                <boxGeometry args={[2, 1.5, 0.1]} />
                                <meshStandardMaterial color="#112244" />
                            </mesh>
                        </group>
                    )}

                    {rocket.designType === 7 && (
                        /* Design 7: The "Communicator" - Massive Dish */
                        <group>
                            <mesh rotation={[0.5, 0, 0]}>
                                <sphereGeometry args={[1.5, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.4]} />
                                <meshStandardMaterial color="#DDD" side={THREE.DoubleSide} />
                            </mesh>
                            <mesh position={[0, 0, 0.5]}>
                                <boxGeometry args={[1, 1, 1]} />
                                <meshStandardMaterial color="#8B4513" />
                            </mesh>
                            {/* Feed */}
                            <mesh position={[0, 1, 0.6]} rotation={[0.5, 0, 0]}>
                                <cylinderGeometry args={[0.05, 0.05, 1.5]} />
                                <meshStandardMaterial color="#333" />
                            </mesh>
                        </group>
                    )}

                    {rocket.designType === 8 && (
                        /* Design 8: The "Pioneer" Spinner */
                        <group>
                            <mesh>
                                <cylinderGeometry args={[1, 1, 0.8, 8]} />
                                <meshStandardMaterial color="#DAA520" />
                            </mesh>
                            {/* Boom */}
                            <mesh position={[2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
                                <cylinderGeometry args={[0.05, 0.05, 4]} />
                                <meshStandardMaterial color="#555" />
                            </mesh>
                            <mesh position={[4, 0, 0]}>
                                <boxGeometry args={[0.5, 0.5, 0.5]} />
                                <meshStandardMaterial color="#888" />
                            </mesh>
                            {/* Antenna Top */}
                            <mesh position={[0, 0.8, 0]}>
                                <coneGeometry args={[0.2, 1]} />
                                <meshStandardMaterial color="#333" />
                            </mesh>
                        </group>
                    )}

                    {rocket.designType === 9 && (
                        /* Design 9: The "Alien Probe" - Abstract */
                        <group>
                            <mesh>
                                <octahedronGeometry args={[1, 0]} />
                                <meshStandardMaterial color="#000" emissive="#500050" emissiveIntensity={0.8} />
                            </mesh>
                            <mesh scale={1.5}>
                                <ringGeometry args={[1.2, 1.3, 3]} />
                                <meshBasicMaterial color="#00FF00" side={THREE.DoubleSide} />
                            </mesh>
                            {[...Array(3)].map((_, i) => (
                                <mesh key={i} position={[
                                    Math.sin(i * 2) * 1.5,
                                    Math.cos(i * 2) * 1.5,
                                    0
                                ]}>
                                    <sphereGeometry args={[0.3]} />
                                    <meshStandardMaterial color="#FFF" />
                                </mesh>
                            ))}
                        </group>
                    )}

                    {/* Engine Glow for all */}
                    <pointLight position={[0, -1.5, 0]} color="#4fd0e7" distance={2} intensity={0.5} />
                </group>
            </Trail>
        </group>
    );
}

function ExplosionEffect({ position }: { position: THREE.Vector3 }) {
    // Simple explosion visualization using expanding spheres/particles
    const groupRef = useRef<THREE.Group>(null);
    const [dead, setDead] = useState(false);

    useFrame((state, delta) => {
        if (groupRef.current && !dead) {
            // Expand
            groupRef.current.scale.multiplyScalar(1.0 + delta * 5);
            // Fade out logic would require transparent materials handling which is complex in simple meshes without custom shader props updates
            // Just scale up until removal by parent manager
        }
    });

    return (
        <group ref={groupRef} position={position} scale={0.02}>
            {/* Core Flash */}
            <mesh>
                <sphereGeometry args={[1, 16, 16]} />
                <meshBasicMaterial color="orange" transparent opacity={0.8} />
            </mesh>
            {/* Outer Ring */}
            <mesh>
                <ringGeometry args={[1.2, 1.5, 32]} />
                <meshBasicMaterial color="red" side={THREE.DoubleSide} transparent opacity={0.6} />
            </mesh>
            {/* Particles (static positions relative to group, group scales up) */}
            <mesh position={[1, 1, 1]}>
                <boxGeometry args={[0.3, 0.3, 0.3]} />
                <meshBasicMaterial color="yellow" />
            </mesh>
            <mesh position={[-1, 0.5, -1]}>
                <boxGeometry args={[0.4, 0.4, 0.4]} />
                <meshBasicMaterial color="red" />
            </mesh>
            <mesh position={[0.5, -1, 0]}>
                <boxGeometry args={[0.3, 0.3, 0.3]} />
                <meshBasicMaterial color="orange" />
            </mesh>
        </group>
    );
}
