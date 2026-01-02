import { Ring, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Language, dictionary } from '@/data/dictionary';

interface HabitableZoneLayerProps {
    orbitMode: 'simplified' | 'real';
    lang: Language;
}

export function HabitableZoneLayer({ orbitMode, lang }: HabitableZoneLayerProps) {
    // Earth Distance: 10 (Simplified) vs 15 (Real)
    // HZ approx 0.95 AU to 1.5 AU

    // Real Mode Scale: 1 unit = 25,000,000 km.
    // Inner (0.95 AU / 142M km) = 5.68 units
    // Outer (1.67 AU / 250M km) = 10 units
    // Simplified Scale (Earth = 10):
    // Inner = 9.5, Outer = 16.7

    const innerRadius = orbitMode === 'real' ? 5.68 : 9.5;
    const outerRadius = orbitMode === 'real' ? 10 : 16.7;

    const t = dictionary[lang];
    const label = t?.layerHabitable || 'Habitable Zone';

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
                    {label}
                </Text>
            </group>
        </group>
    );
}
