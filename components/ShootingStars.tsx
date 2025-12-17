'use client';

import { useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

interface ShootingStar {
    id: number;
    initialPos: THREE.Vector3;
    axis: THREE.Vector3;
    speed: number;
    life: number;
    maxLife: number;
    active: boolean;
    color: THREE.Color;
}

export function ShootingStars() {
    const starsRef = useRef<THREE.Group>(null);
    const starCount = 8; // Increased count slightly

    // Initialize stars
    const starsData = useMemo(() => {
        const stars: ShootingStar[] = [];
        for (let i = 0; i < starCount; i++) {
            stars.push({
                id: i,
                initialPos: new THREE.Vector3(),
                axis: new THREE.Vector3(),
                speed: 0,
                life: 0,
                maxLife: 0,
                active: false,
                color: new THREE.Color()
            });
        }
        return stars;
    }, []);

    const PALETTE = [
        '#CAE9FF', // Light Blue
        '#FFD9B3', // Light Orange
        '#E8F4F8', // Ice White
        '#E6CAFF', // Light Purple
        '#FFF4E6'  // Soft Cream
    ];

    const spawnStar = (star: ShootingStar) => {
        const radius = 300;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);

        star.initialPos.setFromSphericalCoords(radius, phi, theta);

        // Pick a random orbital plane (axis perpendicular to position)
        // 1. Get a random direction
        const randomDir = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
        // 2. Cross product with position to get tangent axis
        star.axis.crossVectors(star.initialPos, randomDir).normalize();

        // Slower angular speed for "floating" effect, but visible movement
        star.speed = 0.0005 + Math.random() * 0.001;

        star.life = 0;
        star.maxLife = 400 + Math.random() * 300;
        star.active = true;

        // Random color
        star.color.set(PALETTE[Math.floor(Math.random() * PALETTE.length)]);
    };

    useFrame(() => {
        if (!starsRef.current) return;

        starsData.forEach((star, index) => {
            const mesh = starsRef.current!.children[index] as THREE.Mesh;
            if (!mesh) return;

            if (!star.active) {
                if (Math.random() < 0.003) {
                    spawnStar(star);
                }
                mesh.visible = false;
            } else {
                mesh.visible = true;
                star.life++;

                // Orbital movement: Rotate initial position around axis
                const angle = star.speed * star.life;
                const currentPos = star.initialPos.clone().applyAxisAngle(star.axis, angle);
                mesh.position.copy(currentPos);

                // Construct next position for lookAt (tangent)
                const nextPos = star.initialPos.clone().applyAxisAngle(star.axis, angle + 0.1);
                mesh.lookAt(nextPos);

                // Scale streak based on speed (constant here) but keep it thin
                mesh.scale.z = 15; // Constant streak length for style
                mesh.scale.x = 0.5;
                mesh.scale.y = 0.5;

                const material = mesh.material as THREE.MeshBasicMaterial;
                material.color = star.color;

                // Fade in and out
                const progress = star.life / star.maxLife;
                // bell curve opacity or simple fade in/out
                let opacity = 1;
                if (progress < 0.1) opacity = progress * 10;
                else if (progress > 0.8) opacity = (1 - progress) * 5;

                material.opacity = opacity;

                if (star.life >= star.maxLife) {
                    star.active = false;
                    mesh.visible = false;
                }
            }
        });
    });

    return (
        <group ref={starsRef}>
            {starsData.map((star) => (
                <mesh key={star.id} visible={false}>
                    <boxGeometry args={[0.5, 0.5, 1]} />
                    <meshBasicMaterial transparent opacity={1} />
                </mesh>
            ))}
        </group>
    );
}
