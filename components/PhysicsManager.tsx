'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useRef, useState, useMemo, useEffect, useCallback } from 'react';
import * as THREE from 'three';
import { Rocket, Explosion } from './types';
import { Trail, Text } from '@react-three/drei';
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
}

export function PhysicsManager({ isActive, timeScale, rockets, setRockets, history, setHistory }: PhysicsManagerProps) {
    const rocketsRef = useRef<Rocket[]>([]); // Ref to track rockets without re-binding listeners
    const [explosions, setExplosions] = useState<Explosion[]>([]);
    const { scene, camera, gl, pointer } = useThree();
    const raycaster = useMemo(() => new THREE.Raycaster(), []);

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
    const INITIAL_VELOCITY = 0; // Launch with zero velocity, let attractor pull it

    // Gestion du clavier pour lancer un satellite (Espace)
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!isActive) return;
            if (event.code !== 'Space') return;
            event.preventDefault(); // Prevent page scrolling

            // Raycasting à partir de la position actuelle de la souris (pointer)
            raycaster.setFromCamera(pointer, camera);

            const origin = raycaster.ray.origin.clone();
            const direction = raycaster.ray.direction.clone();

            // Position de départ: devant la caméra
            const startPos = origin.clone().add(direction.multiplyScalar(15));

            const newRocket: Rocket = {
                id: Date.now(),
                position: startPos,
                // Vitesse initiale nulle, c'est l'attracteur qui va tirer
                velocity: new THREE.Vector3(0, 0, 0),
                createdAt: getSimTime(),
                color: '#AAA',
                name: getRandomName(),
                designType: Math.floor(Math.random() * 10),
                score: 0,
                attractorEnabled: true,
                lastMoveTime: getSimTime()
            };

            // Limit to 10 active satellites - Block new launches
            if (rocketsRef.current.length >= 10) {
                // Optional: Visual feedback that limit is reached?
                return;
            }

            setRockets(prev => [...prev, newRocket]);
        };

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isActive, camera, pointer, raycaster, getSimTime, setRockets]);

    const explodeSatellite = (id: number, position: THREE.Vector3) => {
        setExplosions(prev => [...prev, { id: Math.random(), position: position.clone(), startTime: getSimTime() }]);
        playExplosionSound();
        setRockets(prev => {
            const rocket = prev.find(r => r.id === id);
            if (rocket) {
                setHistory(prevHistory => {
                    const newHistory = [...prevHistory, { ...rocket, score: rocket.score }];
                    // Keep only top 3 best scores in history
                    return newHistory.sort((a, b) => b.score - a.score).slice(0, 3);
                });
            }
            return prev.filter(r => r.id !== id);
        });
    };

    useFrame((state, delta) => {
        if (rockets.length === 0 && explosions.length === 0) return;

        // Apply reduced simulation speed for satellites as requested
        const SIMULATION_SPEED_FACTOR = 0.2;
        const scaledDelta = delta * timeScale * SIMULATION_SPEED_FACTOR;

        if (scaledDelta <= 0 && timeScale !== 0) return;
        if (timeScale === 0) return;

        // Update ref for event listeners
        rocketsRef.current = rockets;

        const now = getSimTime();
        let activeRockets: Rocket[] = [];

        // --- ATTRACTOR LOGIC ---
        // Calculate attractor position relative to current cursor
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
            // --- SCORING SYSTEM ---
            // Score based on distance traveled (Odometer)
            // We use the actual distance moved this frame: velocity * time
            const distanceMoved = rocket.velocity.length() * scaledDelta;

            // Multiply by a factor to make it look like "km" (e.g. * 100)
            rocket.score += distanceMoved * 100;

            // --- STAGNATION CHECK (5s NO MOVEMENT) ---
            // If satellite moves enough, reset the timer
            if (distanceMoved > 0.0001) {
                rocket.lastMoveTime = now;
            }

            // If it hasn't moved for 5 seconds, explode
            if (now - rocket.lastMoveTime > 5000) {
                setExplosions(prev => [...prev, { id: Math.random(), position: rocket.position.clone(), startTime: now }]);
                playExplosionSound();
                setHistory(prevHistory => {
                    const newHistory = [...prevHistory, { ...rocket, score: rocket.score }];
                    // Keep only top 3 best scores in history
                    return newHistory.sort((a, b) => b.score - a.score).slice(0, 3);
                });
                activeRockets = activeRockets.filter(r => r.id !== rocket.id);
                return; // Die
            }

            let hasCollided = false;
            const force = new THREE.Vector3(0, 0, 0);
            let inGravityWell = false;

            for (const bodyData of bodies) {
                const obj = scene.getObjectByName(`celestial-${bodyData.id}`);
                if (obj) {
                    const bodyPos = new THREE.Vector3();
                    obj.getWorldPosition(bodyPos);

                    const distSq = rocket.position.distanceToSquared(bodyPos);
                    const dist = Math.sqrt(distSq);

                    // Collision Check
                    if (dist < (bodyData.radius + 0.5)) {
                        if ((rocket as any).isDead) { hasCollided = true; break; } // Prevent double processing
                        (rocket as any).isDead = true;
                        hasCollided = true;

                        setExplosions(prev => [...prev, { id: Math.random(), position: rocket.position.clone(), startTime: now }]);
                        playExplosionSound();

                        setHistory(prevHistory => {
                            const newHistory = [...prevHistory, { ...rocket, score: rocket.score }];
                            // Keep only top 3 best scores in history
                            return newHistory.sort((a, b) => b.score - a.score).slice(0, 3);
                        });
                        break;
                    }

                    // Gravité
                    if (dist > bodyData.radius) {
                        const dir = bodyPos.clone().sub(rocket.position).normalize();
                        const fVal = (G * bodyData.mass) / distSq;
                        force.add(dir.multiplyScalar(fVal));
                    }
                }
            }



            // Apply Attractor Force (First 5 seconds AND if enabled)
            if (rocket.attractorEnabled && now - rocket.createdAt < 5000) {
                const distSq = rocket.position.distanceToSquared(attractorPos);

                // If we reach the attractor, disable it to prevent sticking/orbiting the cursor point forever
                if (distSq < 2) {
                    rocket.attractorEnabled = false;
                } else if (distSq > 5) {
                    const dir = attractorPos.clone().sub(rocket.position).normalize();
                    const fVal = ATTRACTOR_G / distSq;
                    force.add(dir.multiplyScalar(fVal));
                }
            }

            if (!hasCollided) {
                // Euler Integration
                rocket.velocity.add(force.multiplyScalar(scaledDelta));
                rocket.position.add(rocket.velocity.clone().multiplyScalar(scaledDelta));
                activeRockets.push(rocket);
            }
        });

        if (activeRockets.length !== rockets.length || state.clock.elapsedTime % 0.2 < 0.05) {
            // Force update every ~0.1 - 0.2s or if count changes to keep UI in sync
            // creating a new array reference triggers React render
            setRockets([...activeRockets]);
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
            ))
            }
            {
                explosions.map(ex => (
                    <ExplosionEffect key={ex.id} position={ex.position} />
                ))
            }
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
