'use client';

import { EffectComposer, Bloom, GodRays } from '@react-three/postprocessing';
import { BlendFunction, Resizer, KernelSize } from 'postprocessing';
import { forwardRef } from 'react';
import * as THREE from 'three';

interface EffectsProps {
    sunRef: React.RefObject<THREE.Mesh>;
    rtxMode: boolean;
}

export const Effects = ({ sunRef, rtxMode }: EffectsProps) => {
    if (!rtxMode) return null;

    return (
        <EffectComposer multisampling={0}>
            <Bloom
                intensity={1.5}
                luminanceThreshold={0.5}
                luminanceSmoothing={0.9}
                mipmapBlur
            />
            {sunRef.current && (
                <GodRays
                    sun={sunRef.current}
                    blendFunction={BlendFunction.SCREEN}
                    samples={60}
                    density={0.96}
                    decay={0.9}
                    weight={0.4}
                    exposure={0.6}
                    clampMax={1}
                    blur={true}
                />
            ) as any}
        </EffectComposer>
    );
};
