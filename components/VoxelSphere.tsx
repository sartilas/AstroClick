'use client';

import { useMemo, useRef, useLayoutEffect, memo } from 'react';
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

// --- Global Color Definitions to avoid GC churn ---
const PREDEF_COLORS = {
    water: new THREE.Color("#4287f5"),
    land: new THREE.Color("#4daf4a"),
    cloud: new THREE.Color("#ffffff"),
    ice: new THREE.Color("#e6f7ff"),
    // Kerbin
    kerbinOcean: new THREE.Color("#0077BE"),
    kerbinLand: new THREE.Color("#228B22"),
    kerbinDesert: new THREE.Color("#C2B280"),
    kerbinMountain: new THREE.Color("#8B7355"),
    kerbinCloud: new THREE.Color("#FFFFFF"),
    kerbinIce: new THREE.Color("#F0FFFF"),
    // Duna
    dunaCrater: new THREE.Color("#8B4513"),
    dunaIce: new THREE.Color("#FFFFFF"),
    dunaIceEdge: new THREE.Color("#E8E8E8"),
    // Neptune
    neptuneBlue: new THREE.Color("#7CA1FF"),
    neptuneDark: new THREE.Color("#5A8AF2"),
    neptuneCloud: new THREE.Color("#F0F8FF"),
};

export const VoxelSphere = memo(function VoxelSphere({ radius, color, resolution = 32, type = 'rocky', castShadow = true }: VoxelSphereProps & { castShadow?: boolean }) {
    const meshRef = useRef<THREE.InstancedMesh>(null);

    const { positions, colors } = useMemo(() => {
        const tempPositions: { x: number; y: number; z: number }[] = [];
        const tempColors: number[] = []; // Flat RGB array, uploaded as a single GPU buffer
        const halfRes = resolution / 2;

        const baseColor = new THREE.Color(color);
        const secondaryColor = new THREE.Color(color).offsetHSL(0, 0, -0.2);
        const tertiaryColor = new THREE.Color(color).offsetHSL(0.05, 0.2, 0.1);
        const sandColor = new THREE.Color("#e6c288"); // Dependent on lighting, maybe keep or move

        // Specialized Color Caching for Duna
        const dunaRust = new THREE.Color(color);
        const dunaDark = new THREE.Color(color).offsetHSL(0, 0, -0.15);
        const dunaLight = new THREE.Color(color).offsetHSL(0.02, -0.1, 0.1);

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
                            if (n < -0.2) voxelColor = PREDEF_COLORS.water;
                            else if (n < 0.3) voxelColor = PREDEF_COLORS.land;
                            else voxelColor = sandColor;

                            // Polar Caps
                            if (Math.abs(y) > halfRes * 0.85) {
                                voxelColor = PREDEF_COLORS.ice;
                            }
                            // Clouds
                            if (Math.random() > 0.96 && n < 0) {
                                voxelColor = PREDEF_COLORS.cloud;
                            }

                        } else if (type === 'kerbin') {
                            const n = noise(nx, ny, nz);
                            const n2 = noise(nx * 2, ny * 2, nz * 2);

                            if (n < -0.15) voxelColor = PREDEF_COLORS.kerbinOcean;
                            else if (n < 0.2) voxelColor = PREDEF_COLORS.kerbinLand;
                            else if (n < 0.4) voxelColor = PREDEF_COLORS.kerbinDesert;
                            else voxelColor = PREDEF_COLORS.kerbinMountain;

                            if (Math.abs(y) > halfRes * 0.82) voxelColor = PREDEF_COLORS.kerbinIce;
                            if (Math.random() > 0.94 && n2 > -0.3) voxelColor = PREDEF_COLORS.kerbinCloud;

                        } else if (type === 'duna') {
                            const n = noise(nx, ny, nz);
                            const n2 = noise(nx * 3, ny * 3, nz * 3);

                            if (n > 0.5) voxelColor = PREDEF_COLORS.dunaCrater;
                            else if (n > 0.1) voxelColor = dunaDark;
                            else if (n > -0.2) voxelColor = dunaRust;
                            else voxelColor = dunaLight;

                            const polarY = Math.abs(y) / halfRes;
                            if (polarY > 0.75) voxelColor = PREDEF_COLORS.dunaIce;
                            else if (polarY > 0.65 && n2 > -0.2) voxelColor = PREDEF_COLORS.dunaIceEdge;

                        } else if (type === 'neptune') {
                            const n = noise(nx * 3, ny * 3, nz * 3);
                            const n2 = noise(nx, ny, nz);

                            if (n2 < -0.4 && z > 0) voxelColor = PREDEF_COLORS.neptuneDark;
                            else if (n > 0.5) voxelColor = PREDEF_COLORS.neptuneCloud;
                            else voxelColor = PREDEF_COLORS.neptuneBlue;
                        } else if (type === 'gas-giant') {
                            const bandNoise = Math.sin(y * 0.6 + Math.sin(x * 0.3)) + Math.random() * 0.2;
                            if (bandNoise > 0.6) voxelColor = baseColor;
                            else if (bandNoise > 0) voxelColor = secondaryColor;
                            else voxelColor = tertiaryColor;

                        } else if (type === 'star') {
                            const n = Math.random();
                            if (n > 0.8) voxelColor = baseColor;
                            else if (n > 0.4) voxelColor = secondaryColor;
                            else voxelColor = tertiaryColor;

                        } else {
                            const n = noise(nx * 2, ny * 2, nz * 2);
                            if (n > 0.65) voxelColor = secondaryColor;
                            else voxelColor = baseColor;
                        }

                        tempColors.push(voxelColor.r, voxelColor.g, voxelColor.b);
                    }
                }
            }
        }
        return { positions: tempPositions, colors: new Float32Array(tempColors) };
    }, [color, resolution, type]);

    useLayoutEffect(() => {
        if (meshRef.current) {
            const tempObject = new THREE.Object3D();
            const voxelSize = (radius * 2) / resolution;

            positions.forEach((pos, i) => {
                tempObject.position.set(pos.x * voxelSize, pos.y * voxelSize, pos.z * voxelSize);
                tempObject.scale.set(voxelSize * 1.02, voxelSize * 1.02, voxelSize * 1.02);
                tempObject.updateMatrix();
                meshRef.current!.setMatrixAt(i, tempObject.matrix);
            });
            meshRef.current.instanceMatrix.needsUpdate = true;

            // Upload the precomputed flat color buffer in one go (no per-instance setColorAt)
            meshRef.current.instanceColor = new THREE.InstancedBufferAttribute(colors, 3);
            meshRef.current.instanceColor.needsUpdate = true;
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
});
