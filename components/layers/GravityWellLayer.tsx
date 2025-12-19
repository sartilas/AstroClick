import { useRef, useMemo } from 'react';
import { useFrame, extend, ReactThreeFiber } from '@react-three/fiber';
import * as THREE from 'three';
import { shaderMaterial } from '@react-three/drei';
import { solarSystemData } from '../../data/solarSystemData';
import { kerbolSystemData } from '../../data/kerbolSystemData';
import { SystemType } from '../types';

interface GravityWellLayerProps {
    systemType?: SystemType;
}

// Custom Shader Material that handles both vertex displacement (density/well) 
// and fragment styling (tech grid/black holes).
const GravityTechMaterial = shaderMaterial(
    {
        uTime: 0,
        uColor: new THREE.Color(0.2, 0.3, 0.5), // Tech Blue-Grey
        uBodyPositions: new Array(20).fill(new THREE.Vector3()),
        uBodyMasses: new Float32Array(20),
        uBodyCount: 0,
        uResolution: new THREE.Vector2(1, 1)
    },
    // VERTEX SHADER
    `
    varying vec2 vUv;
    varying vec3 vWorldPosition;
    varying float vGravityIntensity;
    varying vec3 vViewPosition;
    
    uniform float uTime;
    uniform vec3 uBodyPositions[20];
    uniform float uBodyMasses[20];
    uniform int uBodyCount;
    
    // Smooth minimum function for blending gravity wells
    float smin(float a, float b, float k) {
        float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
        return mix(b, a, h) - k * h * (1.0 - h);
    }
    
    void main() {
        vUv = uv;
        vec3 pos = position; // Local position (plane is flat on XY, rotated later)
        vec4 worldPos = modelMatrix * vec4(pos, 1.0);
        
        // Accumulators for displacement
        vec3 totalDisplacement = vec3(0.0);
        float totalGravity = 0.0;
        
        // We calculate physics in World Space coordinates usually, 
        // but here our plane is transformed. Let's work with worldPos.
        
        for(int i = 0; i < 20; i++) {
            if(i >= uBodyCount) break;
            
            vec3 bodyPos = uBodyPositions[i];
            float mass = uBodyMasses[i];
            
            // Distance on the horizontal plane (XZ)
            vec2 dir = bodyPos.xz - worldPos.xz;
            float dist = length(dir);
            vec2 dirNorm = normalize(dir);
            
            // 1. VERTICAL DISPLACEMENT (The Well)
            // -G*M / (r + blend)
            // We use a Gaussian-ish or Lorentzian falloff for smoother looks
            float wellDepth = -(mass * 50.0) / (dist * dist + 10.0);
            
            // 2. HORIZONTAL DISPLACEMENT (The Density/Tessellation)
            // We pull vertices TOWARDS the center to increase density
            // Stronger pull closer to center, but clamped to avoid singularity
            float pullStrength = (mass * 20.0) / (dist * dist + 50.0);
            pullStrength = min(pullStrength, dist * 0.8); // Don't overshoot center
            
            vec2 pull = dirNorm * pullStrength;
            
            worldPos.xz += pull;
            worldPos.y += wellDepth;
            
            // Accumulate gravity for color intensity
            totalGravity += (mass) / (dist + 1.0);
        }
        
        // Flatten geometry at huge depth to simulate event horizon cutoff?
        // worldPos.y = max(worldPos.y, -100.0);
        
        vWorldPosition = worldPos.xyz;
        vGravityIntensity = totalGravity;
        
        // Pass to fragment
        vec4 viewPos = viewMatrix * worldPos;
        vViewPosition = -viewPos.xyz;
        gl_Position = projectionMatrix * viewPos;
    }
    `,
    // FRAGMENT SHADER
    `
    varying vec2 vUv;
    varying vec3 vWorldPosition;
    varying float vGravityIntensity;
    
    uniform float uTime;
    uniform vec3 uColor;
    
    // Pseudo-random
    float noise(vec2 st) {
        return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
    }
    
    // 2D Noise
    float smoothNoise(vec2 st) {
        vec2 i = floor(st);
        vec2 f = fract(st);
        float a = noise(i);
        float b = noise(i + vec2(1.0, 0.0));
        float c = noise(i + vec2(0.0, 1.0));
        float d = noise(i + vec2(1.0, 1.0));
        vec2 u = f * f * (3.0 - 2.0 * f);
        return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
    }

    void main() {
        // Use WorldPosition for grid to act continuously even if geometry warps
        // But we want the grid lines to warp WITH the geometry density?
        // If we use vUv, the texture stretches. 
        // If we use Barycentric (via extension) we get real wireframe. 
        // Let's use a technique based on derivatives of position to draw constant-width lines on warped geo.
        
        // Grid generation based on warped coordinates gives the visual "density" effect requested
        // because the vertices themselves moved.
        // We can simulate wireframe using standard grid on UVs if the UVs are NOT warped?
        // Wait, UVs are interpolated. If vertices move closer, the UV-space between them shrinks in world-space.
        // So drawing a grid on UVs will look STRETCHED on the compressed area? 
        // No, if vertices cluster, UV density per WorldUnit increases. 
        // So a grid based on UV (0..1) will appear to have smaller cells in the dense area?? 
        // Actually: 
        // Vertices A (u=0) and B (u=0.1) are normally 10 units apart.
        // Gravity pulls them to 1 unit apart.
        // The texture mapped from 0 to 0.1 is now squeezed into 1 unit.
        // So the grid lines in that texture look squashed/smaller = HIGHER DENSITY. 
        // THIS IS EXACTLY WHAT WE WANT!
        
        float gridScale = 50.0;
        vec2 uv = vUv * gridScale;
        
        // Dynamic Tech Morphism
        float time = uTime * 0.2;
        
        // Add some "digital rain" or circuit noise flowing
        float circuit = smoothNoise(uv * 0.5 + vec2(0.0, time));
        float techPattern = step(0.7, circuit);
        
        // Base Grid
        vec2 grid = abs(fract(uv - 0.5) - 0.5) / fwidth(uv);
        float line = min(grid.x, grid.y);
        float gridIntensity = 1.0 - smoothstep(0.0, 1.5, line);
        
        // Colors
        vec3 finalColor = uColor;
        
        // Add tech markers (little dots/crosses) at intersections
        float intersection = (1.0 - smoothstep(0.0, 1.0, grid.x)) * (1.0 - smoothstep(0.0, 1.0, grid.y));
        finalColor += vec3(0.5, 0.8, 1.0) * intersection * techPattern * 2.0;
        
        // Gravity Black Hole Effect
        // vGravityIntensity is high near objects.
        // We want a sharp transition to black "hole"
        float hole = smoothstep(5.0, 15.0, vGravityIntensity);
        
        // Alpha logic
        // Far away: faint grid
        // Near hole: grid gets brighter then turns black?
        // User: "trou ... qui deviens noir" 
        
        float alpha = gridIntensity * 0.15; // Base subtle grid
        alpha += techPattern * 0.1; // Tech glow
        alpha += intersection * 0.3; // Intersections
        
        // Make the grid glow near the event horizon before turning black
        float horizonGlow = smoothstep(2.0, 5.0, vGravityIntensity) * (1.0 - hole);
        finalColor += vec3(0.0, 0.5, 1.0) * horizonGlow * 2.0;
        alpha += horizonGlow * 0.5;
        
        // Final opaque black hole
        vec3 black = vec3(0.0);
        finalColor = mix(finalColor, black, hole);
        alpha = mix(alpha, 1.0, hole); // Opaque black
        
        gl_FragColor = vec4(finalColor, alpha);
    }
    `
);

extend({ GravityTechMaterial });

declare global {
    namespace JSX {
        interface IntrinsicElements {
            gravityTechMaterial: ReactThreeFiber.Object3DNode<THREE.ShaderMaterial, typeof GravityTechMaterial>;
        }
    }
}

export function GravityWellLayer({ systemType = 'solar' }: GravityWellLayerProps) {
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const planeRef = useRef<THREE.Mesh>(null);

    // Select the correct system data based on systemType
    const currentSystemData = systemType === 'kerbol' ? kerbolSystemData : solarSystemData;
    const starId = systemType === 'kerbol' ? 'kerbol' : 'sun';

    const bodiesData = useMemo(() => {
        return currentSystemData.map(d => ({
            id: d.id,
            mass: d.id === starId ? 50.0 : Math.max(d.size * 5, 2.0),
        }));
    }, [currentSystemData, starId]);

    useFrame(({ scene, clock }) => {
        if (!materialRef.current) return;

        materialRef.current.uniforms.uTime.value = clock.getElapsedTime();

        const vecPositions: THREE.Vector3[] = [];
        const masses: number[] = [];
        let count = 0;

        bodiesData.forEach((b) => {
            const obj = scene.getObjectByName(`celestial-${b.id}`);
            if (obj) {
                const v = new THREE.Vector3();
                obj.getWorldPosition(v);
                vecPositions.push(v);
                masses.push(b.mass);
                count++;
            }
        });

        // Zero-fill
        while (vecPositions.length < 20) {
            vecPositions.push(new THREE.Vector3(0, -1000, 0));
        }
        while (masses.length < 20) {
            masses.push(0);
        }

        // Update uniforms
        materialRef.current.uniforms.uBodyPositions.value = vecPositions;
        materialRef.current.uniforms.uBodyMasses.value = masses;
        materialRef.current.uniforms.uBodyCount.value = count;
    });

    return (
        // High segment count for smooth vertex displacement (Adaptive Density Simulation)
        <mesh ref={planeRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -5, 0]}>
            <planeGeometry args={[600, 600, 256, 256]} />
            <gravityTechMaterial
                ref={materialRef}
                transparent
                side={THREE.DoubleSide}
                depthWrite={false} // Allow transparency to work nicely with stars
            />
        </mesh>
    );
}
