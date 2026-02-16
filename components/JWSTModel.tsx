import React from 'react';
import { Box } from '@react-three/drei';

export const JWSTModel = ({ scale = 1 }: { scale?: number }) => {
    // Voxel size unit
    const u = 0.05 * scale;

    return (
        <group rotation={[0, -Math.PI / 2, 0]}> 
            {/* Sunshield - 5 layers simulated by stepped slabs - Silver/Purple */}
            {/* Main base */}
            <group position={[0, -2 * u, 0]}>
                <Box args={[14 * u, 1 * u, 20 * u]} position={[0, 0, 0]}>
                    <meshStandardMaterial color="#C0C0C0" roughness={0.3} metalness={0.8} />
                </Box>
                <Box args={[12 * u, 1 * u, 18 * u]} position={[0, -1 * u, 0]}>
                    <meshStandardMaterial color="#B0B0C0" roughness={0.3} metalness={0.8} />
                </Box>
                 <Box args={[10 * u, 1 * u, 16 * u]} position={[0, -2 * u, 0]}>
                    <meshStandardMaterial color="#DA70D6" roughness={0.3} metalness={0.8} />
                </Box>
            </group>

            {/* Main Mirror - Gold Hexagon-ish structure */}
            <group position={[0, 2 * u, 0]} rotation={[Math.PI / 6, 0, 0]}>
                {/* Center */}
                <Box args={[3 * u, 3 * u, 1 * u]} position={[0, 0, 0]}>
                     <meshStandardMaterial color="#FFD700" roughness={0.1} metalness={1} />
                </Box>
                {/* Surrounding segments (Hexagon approximation with cubes) */}
                <Box args={[3 * u, 3 * u, 1 * u]} position={[3.1 * u, 0, 0]}>
                     <meshStandardMaterial color="#FFD700" roughness={0.1} metalness={1} />
                </Box>
                <Box args={[3 * u, 3 * u, 1 * u]} position={[-3.1 * u, 0, 0]}>
                     <meshStandardMaterial color="#FFD700" roughness={0.1} metalness={1} />
                </Box>
                 <Box args={[3 * u, 3 * u, 1 * u]} position={[1.55 * u, 2.7 * u, 0]}>
                     <meshStandardMaterial color="#FFD700" roughness={0.1} metalness={1} />
                </Box>
                 <Box args={[3 * u, 3 * u, 1 * u]} position={[-1.55 * u, 2.7 * u, 0]}>
                     <meshStandardMaterial color="#FFD700" roughness={0.1} metalness={1} />
                </Box>
                 <Box args={[3 * u, 3 * u, 1 * u]} position={[1.55 * u, -2.7 * u, 0]}>
                     <meshStandardMaterial color="#FFD700" roughness={0.1} metalness={1} />
                </Box>
                 <Box args={[3 * u, 3 * u, 1 * u]} position={[-1.55 * u, -2.7 * u, 0]}>
                     <meshStandardMaterial color="#FFD700" roughness={0.1} metalness={1} />
                </Box>
                
                {/* Secondary Mirror Support */}
                <group position={[0, 0, 6 * u]}>
                     <Box args={[1 * u, 1 * u, 1 * u]} position={[0, 0, 0]}>
                        <meshStandardMaterial color="#333333" />
                     </Box>
                     <Box args={[0.5 * u, 0.5 * u, 6 * u]} position={[0, 0, -3 * u]} rotation={[0,0,0]}>
                        <meshStandardMaterial color="#333333" />
                     </Box>
                </group>

                 {/* Black central instrument */}
                 <Box args={[2 * u, 2 * u, 2 * u]} position={[0, 0, -1.5 * u]}>
                    <meshStandardMaterial color="#111111" />
                </Box>
            </group>
        </group>
    );
};
