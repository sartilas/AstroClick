'use client';

import { EffectComposer, Bloom, GodRays } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import React, { memo } from 'react';
import * as THREE from 'three';

interface EffectsProps {
    sunRef: React.RefObject<THREE.Mesh>;
    rtxMode: boolean;
}

export const Effects = memo(({ sunRef, rtxMode }: EffectsProps) => {
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
                    samples={30}
                    density={0.93}
                    decay={0.92}
                    weight={0.35}
                    exposure={0.55}
                    clampMax={1}
                    blur={false}
                />
            ) as any}
        </EffectComposer>
    );
});

Effects.displayName = 'Effects';

