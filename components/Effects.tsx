'use client';

import { EffectComposer, Bloom, GodRays, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import React, { memo, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface EffectsProps {
    sunRef: React.RefObject<THREE.Mesh | null>;
    rtxMode: boolean;
}

export const Effects = memo(({ sunRef, rtxMode }: EffectsProps) => {
    const { gl } = useThree();

    // EffectComposer sets renderer.autoClear = false and does not restore it on unmount.
    // With preserveDrawingBuffer enabled (Photo Mode), frames would then accumulate
    // into ghosting trails once RTX is switched off — restore the default explicitly.
    useEffect(() => {
        if (!rtxMode) {
            gl.autoClear = true;
        }
    }, [rtxMode, gl]);

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
            <Vignette offset={0.25} darkness={0.55} eskil={false} />
        </EffectComposer>
    );
});

Effects.displayName = 'Effects';

