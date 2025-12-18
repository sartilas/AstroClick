'use client';

import { useMemo, useRef, useLayoutEffect } from 'react';
import * as THREE from 'three';

interface VoxelModelProps {
    type: 'iss' | 'hubble' | 'james-webb';
    scale?: number;
}

export function VoxelModel({ type, scale = 1 }: VoxelModelProps) {
    const meshRef = useRef<THREE.InstancedMesh>(null);

    // Define voxel structures for each object
    const { positions, colors } = useMemo(() => {
        const tempPositions: { x: number; y: number; z: number }[] = [];
        const tempColors: Float32Array[] = [];

        // Helper to add voxel
        const addVoxel = (x: number, y: number, z: number, colorHex: string) => {
            tempPositions.push({ x, y, z });
            tempColors.push(Float32Array.from(new THREE.Color(colorHex).toArray()));
        };

        const white = "#FFFFFF";
        const grey = "#A0A0A0";
        const darkGrey = "#404040";
        const solarBlue = "#1E2F5B"; // Dark blue for solar panels
        const gold = "#FFD700"; // JWST Gold
        const black = "#101010";
        const silver = "#C0C0C0";

        if (type === 'iss') {
            // CENTRAL MODULES (The "spine")
            for (let x = -2; x <= 2; x++) addVoxel(x, 0, 0, white);
            // Crossing module
            for (let z = -1; z <= 1; z++) addVoxel(0, 0, z, white);

            // SOLAR ARRAY TRUSS (The big long boom)
            for (let x = -8; x <= 8; x++) {
                if (Math.abs(x) > 2) addVoxel(x, 0, 0, grey); // Truss structure
            }

            // SOLAR PANELS (Large arrays on ends)
            // Left Arrays
            for (let y = -4; y <= 4; y++) {
                // Inner Left
                for (let z = -1; z <= 1; z++) addVoxel(-6, y, z, solarBlue);
                // Outer Left
                for (let z = -1; z <= 1; z++) addVoxel(-8, y, z, solarBlue);
            }

            // Right Arrays
            for (let y = -4; y <= 4; y++) {
                // Inner Right
                for (let z = -1; z <= 1; z++) addVoxel(6, y, z, solarBlue);
                // Outer Right
                for (let z = -1; z <= 1; z++) addVoxel(8, y, z, solarBlue);
            }

            // RADIATORS (White panels sticking out)
            for (let z = -2; z <= -1; z++) {
                addVoxel(-2, 0, z, white);
                addVoxel(2, 0, z, white);
            }

        } else if (type === 'hubble') {
            // MAIN TUBE (Cylinder-ish)
            for (let y = -3; y <= 3; y++) {
                addVoxel(0, y, 0, silver);
                addVoxel(1, y, 0, silver);
                addVoxel(-1, y, 0, silver);
                addVoxel(0, y, 1, silver);
                addVoxel(0, y, -1, silver);
            }

            // APERTURE DOOR (Open flap at top)
            for (let y = 3; y <= 5; y++) addVoxel(1, y, 1, grey);

            // SOLAR PANELS (Rectangular wings)
            for (let x = -4; x <= 4; x++) {
                if (Math.abs(x) > 1) {
                    addVoxel(x, 0, 0, solarBlue);
                    addVoxel(x, 0, 1, solarBlue);
                }
            }

        } else if (type === 'james-webb') {
            // SUNSHIELD (Kite shape, layered)
            // 5 layers of silver/pinkish material - simplified to flat layers
            for (let x = -4; x <= 4; x++) {
                for (let z = -6; z <= 6; z++) {
                    // Rhombus shape equation check roughly
                    if (Math.abs(x) + Math.abs(z) * 0.6 < 5) {
                        addVoxel(x, -1, z, silver); // Silver base
                        addVoxel(x, -0.5, z, "#E0E0E0");
                    }
                }
            }

            // PRIMARY MIRROR (Hexagonal Gold)
            // 18 segments roughly
            const mirrorV = [
                [0, 0], [1, 0], [-1, 0],
                [0.5, 0.8], [-0.5, 0.8],
                [0.5, -0.8], [-0.5, -0.8],
                [1.5, 0], [-1.5, 0],
                [1, 0.8], [-1, 0.8], [1, -0.8], [-1, -0.8]
            ];

            mirrorV.forEach(([vx, vy]) => {
                // Scale positions to voxels
                const ix = Math.round(vx * 2);
                const iy = Math.round(vy * 2) + 2; // Lift up
                addVoxel(ix, iy, 1, gold);
            });

            // SECONDARY MIRROR (Tripod out front)
            addVoxel(0, 2, 4, black); // Mirror
            // Struts
            addVoxel(0, 2, 2, grey);
            addVoxel(0, 2, 3, grey);
        }

        return { positions: tempPositions, colors: tempColors };
    }, [type]);

    useLayoutEffect(() => {
        if (meshRef.current) {
            const tempObject = new THREE.Object3D();

            // Voxel Size needs to be relative to scale
            // Total width of models is approx 10-16 voxels
            // We want the whole model to fit in radius ~1-2 world units
            const voxelSize = 0.15 * scale;

            // Ensure color buffer exists
            if (!meshRef.current.instanceColor) {
                meshRef.current.instanceColor = new THREE.InstancedBufferAttribute(new Float32Array(positions.length * 3), 3);
            }

            positions.forEach((pos, i) => {
                tempObject.position.set(pos.x * voxelSize, pos.y * voxelSize, pos.z * voxelSize);
                // Slightly overlap voxels
                tempObject.scale.set(voxelSize * 1.01, voxelSize * 1.01, voxelSize * 1.01);
                tempObject.updateMatrix();
                meshRef.current!.setMatrixAt(i, tempObject.matrix);
                meshRef.current!.setColorAt(i, new THREE.Color().fromArray(colors[i]));
            });
            meshRef.current.instanceMatrix.needsUpdate = true;
            if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;
        }
    }, [positions, colors, scale]);

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, positions.length]} castShadow receiveShadow>
            <boxGeometry args={[1, 1, 1]} />
            <meshStandardMaterial
                roughness={0.3}
                metalness={0.6}
                envMapIntensity={1}
            />
        </instancedMesh>
    );
}
