'use client';

import { useMemo, useRef, useLayoutEffect } from 'react';
import * as THREE from 'three';

interface VoxelSphereProps {
    radius: number;
    color: string;
    resolution?: number; // Voxel grid density
    type?: string; // 'earth', 'gas-giant', 'rocky', 'star'
    lowDetail?: boolean; // Use simpler rendering for performance
}

// Simple pseudo-random noise function
function noise(x: number, y: number, z: number) {
    return Math.sin(x * 0.5) * Math.cos(y * 0.5) * Math.sin(z * 0.5) +
        Math.sin(x * 1.5 + y * 2.3) * 0.5;
}

export function VoxelSphere({ radius, color, resolution = 32, type = 'rocky', castShadow = true }: VoxelSphereProps & { castShadow?: boolean }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);

    const { positions, colors } = useMemo(() => {
        const tempPositions: { x: number; y: number; z: number }[] = [];
        const tempColors: Float32Array[] = [];
        const halfRes = resolution / 2;

        const baseColor = new THREE.Color(color);
        const secondaryColor = new THREE.Color(color).offsetHSL(0, 0, -0.2);
        const tertiaryColor = new THREE.Color(color).offsetHSL(0.05, 0.2, 0.1);

        const waterColor = new THREE.Color("#4287f5");
        const landColor = new THREE.Color("#4daf4a");
        const cloudColor = new THREE.Color("#ffffff");
        const iceColor = new THREE.Color("#e6f7ff");
        const sandColor = new THREE.Color("#e6c288");

        for (let x = -halfRes; x < halfRes; x++) {
            for (let y = -halfRes; y < halfRes; y++) {
                for (let z = -halfRes; z < halfRes; z++) {
                    const dist = Math.sqrt(x * x + y * y + z * z);

                    // Sphere shell check (hollow) - thinner shell for performance
                    if (dist <= halfRes && dist > halfRes - 1.5) {
                        tempPositions.push({ x, y, z });

                        // --- PROCEDURAL COLOR GENERATION ---
                        let voxelColor = baseColor;

                        const nx = x * 0.3;
                        const ny = y * 0.3;
                        const nz = z * 0.3;

                        if (type === 'earth') {
                            const n = noise(nx, ny, nz);
                            if (n < -0.2) voxelColor = waterColor;
                            else if (n < 0.3) voxelColor = landColor;
                            else voxelColor = sandColor;

                            // Polar Caps
                            if (Math.abs(y) > halfRes * 0.85) {
                                voxelColor = iceColor;
                            }
                            // Clouds
                            if (Math.random() > 0.96 && n < 0) {
                                voxelColor = cloudColor;
                            }

                        } else if (type === 'kerbin') {
                            // Kerbin - KSP's Earth analog
                            const kerbinOcean = new THREE.Color("#0077BE"); // Deep ocean blue
                            const kerbinLand = new THREE.Color("#228B22"); // Forest green
                            const kerbinDesert = new THREE.Color("#C2B280"); // Khaki/desert
                            const kerbinMountain = new THREE.Color("#8B7355"); // Brown mountains
                            const kerbinCloud = new THREE.Color("#FFFFFF"); // Clouds
                            const kerbinIce = new THREE.Color("#F0FFFF"); // Polar ice

                            const n = noise(nx, ny, nz);
                            const n2 = noise(nx * 2, ny * 2, nz * 2);

                            // Base terrain
                            if (n < -0.15) {
                                voxelColor = kerbinOcean; // Oceans (about 60%)
                            } else if (n < 0.2) {
                                voxelColor = kerbinLand; // Green continents
                            } else if (n < 0.4) {
                                voxelColor = kerbinDesert; // Desert/grassland
                            } else {
                                voxelColor = kerbinMountain; // Mountains
                            }

                            // Polar ice caps (white)
                            if (Math.abs(y) > halfRes * 0.82) {
                                voxelColor = kerbinIce;
                            }

                            // Scattered clouds (white patches)
                            if (Math.random() > 0.94 && n2 > -0.3) {
                                voxelColor = kerbinCloud;
                            }

                        } else if (type === 'duna') {
                            // Duna - KSP's Mars analog with prominent ice caps
                            const dunaRust = new THREE.Color(color); // Base rust color
                            const dunaDark = new THREE.Color(color).offsetHSL(0, 0, -0.15); // Darker regions
                            const dunaLight = new THREE.Color(color).offsetHSL(0.02, -0.1, 0.1); // Lighter sand
                            const dunaCrater = new THREE.Color("#8B4513"); // Dark crater floors
                            const dunaIce = new THREE.Color("#FFFFFF"); // Bright white polar ice
                            const dunaIceEdge = new THREE.Color("#E8E8E8"); // Ice edge

                            const n = noise(nx, ny, nz);
                            const n2 = noise(nx * 3, ny * 3, nz * 3);

                            // Base Duna terrain
                            if (n > 0.5) {
                                voxelColor = dunaCrater; // Crater-like dark spots
                            } else if (n > 0.1) {
                                voxelColor = dunaDark; // Darker rust
                            } else if (n > -0.2) {
                                voxelColor = dunaRust; // Base color
                            } else {
                                voxelColor = dunaLight; // Lighter areas
                            }

                            // Prominent white polar ice caps (larger than Earth)
                            const polarY = Math.abs(y) / halfRes;
                            if (polarY > 0.75) {
                                // Solid ice at the very poles
                                voxelColor = dunaIce;
                            } else if (polarY > 0.65) {
                                // Ice edge - white transitioning
                                if (n2 > -0.2) {
                                    voxelColor = dunaIceEdge;
                                }
                            }

                        } else if (type === 'gas-giant') {
                            // Banded noise
                            const bandNoise = Math.sin(y * 0.6 + Math.sin(x * 0.3)) + Math.random() * 0.2;
                            if (bandNoise > 0.6) voxelColor = baseColor;
                            else if (bandNoise > 0) voxelColor = secondaryColor;
                            else voxelColor = tertiaryColor;

                        } else if (type === 'star') {
                            // Turbulent
                            const n = Math.random();
                            if (n > 0.8) voxelColor = baseColor;
                            else if (n > 0.4) voxelColor = secondaryColor;
                            else voxelColor = tertiaryColor;

                        } else {
                            // Rocky (Craters)
                            const n = noise(nx * 2, ny * 2, nz * 2);
                            if (n > 0.65) voxelColor = secondaryColor; // Crater
                            else voxelColor = baseColor;
                        }

                        tempColors.push(Float32Array.from(voxelColor.toArray()));
                    }
                }
            }
        }
        return { positions: tempPositions, colors: tempColors };
    }, [color, resolution, type]);

    useLayoutEffect(() => {
        if (meshRef.current) {
            const tempObject = new THREE.Object3D();
            const voxelSize = (radius * 2) / resolution;

            // Ensure color buffer exists
            if (!meshRef.current.instanceColor) {
                meshRef.current.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(positions.length * 3), 3);
            }

            positions.forEach((pos, i) => {
                tempObject.position.set(pos.x * voxelSize, pos.y * voxelSize, pos.z * voxelSize);
                // Slightly overlap voxels (1.02) to prevent gaps/grid-lines artifacts
                tempObject.scale.set(voxelSize * 1.02, voxelSize * 1.02, voxelSize * 1.02);
                tempObject.updateMatrix();
                meshRef.current!.setMatrixAt(i, tempObject.matrix);
                meshRef.current!.setColorAt(i, new THREE.Color().fromArray(colors[i]));
            });
            meshRef.current.instanceMatrix.needsUpdate = true;
            if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
        }
    }, [positions, colors, radius, resolution]);

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, positions.length]} castShadow={castShadow} receiveShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
                roughness={type === 'star' ? 0 : (type === 'gas-giant' ? 0.4 : 0.8)}
                metalness={type === 'star' ? 0 : 0.1}
                emissive={type === 'star' ? color : "#000000"}
                emissiveIntensity={type === 'star' ? 2 : 0}
                envMapIntensity={0.5}
            />
        </instancedMesh>
    );
}
