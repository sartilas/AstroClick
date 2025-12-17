import { Ring, Text } from '@react-three/drei';
import * as THREE from 'three';

interface HabitableZoneLayerProps {
    orbitMode: 'simplified' | 'real';
}

export function HabitableZoneLayer({ orbitMode }: HabitableZoneLayerProps) {
    // Earth Distance: 10 (Simplified) vs 15 (Real)
    // HZ approx 0.95 AU to 1.5 AU

    const earthDist = orbitMode === 'real' ? 15 : 10;

    const innerRadius = earthDist * 0.95;
    const outerRadius = earthDist * 1.5;

    return (
        <group rotation={[-Math.PI / 2, 0, 0]}>
            <Ring args={[innerRadius, outerRadius, 64]} receiveShadow>
                <meshBasicMaterial color="#4CAF50" transparent opacity={0.2} side={THREE.DoubleSide} />
            </Ring>
            <Ring args={[innerRadius, innerRadius + 0.1, 64]}>
                <meshBasicMaterial color="#4CAF50" side={THREE.DoubleSide} />
            </Ring>
            <Ring args={[outerRadius - 0.1, outerRadius, 64]}>
                <meshBasicMaterial color="#4CAF50" side={THREE.DoubleSide} />
            </Ring>

            {/* Labels */}
            <group rotation={[Math.PI / 2, 0, 0]}>
                <Text
                    position={[0, 0, 12]}
                    fontSize={1}
                    color="#4CAF50"
                    anchorX="center"
                    anchorY="middle"
                    rotation={[-Math.PI / 2, 0, 0]}
                >
                    Habitable Zone
                </Text>
            </group>
        </group>
    );
}
