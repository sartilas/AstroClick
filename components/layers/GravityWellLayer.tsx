import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { solarSystemData } from '../../data/solarSystemData';

export function GravityWellLayer() {
    const planeRef = useRef<THREE.Mesh>(null);

    // Create a dense grid geometry
    const geometry = useMemo(() => {
        const geo = new THREE.PlaneGeometry(200, 200, 100, 100);
        return geo;
    }, []);

    // Physics constants for visualization
    // These are tweaked for visual effect, not realistic simulation
    const G_VISUAL = 200;

    const bodies = useMemo(() => {
        return solarSystemData.map(d => ({
            id: d.id,
            // Exaggerated mass for visual dip
            mass: d.id === 'sun' ? 50 : (d.size * 5),
            radius: d.distance
        }));
    }, []);

    useFrame(({ scene }) => {
        if (!planeRef.current) return;

        const positions = planeRef.current.geometry.attributes.position;
        const v3 = new THREE.Vector3();

        // Get current positions of massive objects
        const currentBodyPositions = bodies.map(b => {
            const obj = scene.getObjectByName(`celestial-${b.id}`);
            if (obj) {
                const worldPos = new THREE.Vector3();
                obj.getWorldPosition(worldPos);
                return { ...b, pos: worldPos };
            }
            return { ...b, pos: new THREE.Vector3(0, 0, 0) }; // Fallback
        });

        // Update vertex Z (which is Up in rotated plane) based on gravity
        for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i); // This is Z in world space

            // World coords of this vertex (assuming plane is at y=0, rotated -90 deg X)
            // Plane local (x, y, 0) -> World (x, 0, y) ??? 
            // Wait, we will rotate the mesh -Math.PI/2 on X so it lies flat.
            // Local (x,y,z) -> World (x, -z, y) or similar. 
            // Local Z is displacement.

            let totalPot = 0;

            // Simplified Gravity Potential: V = -GM/r
            // We clamp it to avoid infinite dip

            for (const body of currentBodyPositions) {
                const dx = x - body.pos.x;
                const dy = y - body.pos.z; // y in plane geography corresponds to z in world
                const distSq = dx * dx + dy * dy;
                const dist = Math.sqrt(distSq);

                // Add "well" shape
                // function: - Mass / (Distance + Softening)
                totalPot -= (G_VISUAL * body.mass) / (dist + 5);
            }

            // Set Z (height)
            positions.setZ(i, Math.max(totalPot, -50));
        }

        positions.needsUpdate = true;
        planeRef.current.geometry.computeVertexNormals();
    });

    return (
        <group>
            {/* White background / fog is handled in parent or global state */}
            {/* Using a wireframe mesh */}
            <mesh ref={planeRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
                <meshStandardMaterial
                    color="black"
                    wireframe
                    side={THREE.DoubleSide}
                    transparent
                    opacity={0.5}
                />
            </mesh>

            {/* Alternatively, solid white mesh with grid helper? */}
            {/* The user asked for "tout blanc" and "gravity en trou/noir". 
                Maybe a solid white surface with shading showing the holes? */}
            <mesh ref={planeRef} geometry={geometry} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.1, 0]}>
                <meshStandardMaterial
                    color="white"
                    roughness={0.5}
                    metalness={0.1}
                    side={THREE.DoubleSide}
                />
            </mesh>
        </group>
    );
}
