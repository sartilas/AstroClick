'use client';

import { useEffect, useRef, useState } from 'react';

interface LoadingScreenProps {
    onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
    const [progress, setProgress] = useState(0);
    const systemRef = useRef<HTMLDivElement>(null);
    const rotationRef = useRef(0);

    useEffect(() => {
        // Use a mounted flag to properly handle cleanup and prevent stale state
        let isMounted = true;
        const startTime = performance.now();
        const duration = 1500; // 1.5 seconds (reduced from 5s)
        let animationFrameId: number;

        const easeInOutCubic = (x: number): number => {
            // Custom non-linear curve: Fast start, extended slow middle, fast finish
            // 0-20%: 0->30%
            // 20-80%: 30->70% (Very slow)
            // 80-100%: 70->100%

            if (x < 0.2) return (x / 0.2) * 0.3;
            if (x < 0.8) return 0.3 + ((x - 0.2) / 0.6) * 0.4;
            return 0.7 + ((x - 0.8) / 0.2) * 0.3;
        };

        const animate = (currentTime: number) => {
            if (!isMounted) return; // Stop if unmounted

            const elapsed = currentTime - startTime;
            const rawT = Math.min(elapsed / duration, 1);

            // Calculate progress 0-1
            const p = easeInOutCubic(rawT);

            // Calculate instantaneous speed (derivative approximation)
            // Just use the difference from previous frame or slope of curve
            // Slope at x:
            let slope = 0;
            if (rawT < 0.2) slope = 0.3 / 0.2; // 1.5
            else if (rawT < 0.8) slope = 0.4 / 0.6; // 0.66
            else slope = 0.3 / 0.2; // 1.5

            // Smooth transition of slope?
            // Actually, let's just use the slope to drive rotation speed
            const rotationSpeed = slope * 5; // Multiplier

            // Update rotation
            rotationRef.current += rotationSpeed;
            if (systemRef.current) {
                systemRef.current.style.transform = `rotate(${rotationRef.current}deg)`;
            }

            setProgress(p * 100);

            if (rawT < 1) {
                animationFrameId = requestAnimationFrame(animate);
            } else {
                setTimeout(() => {
                    if (isMounted) onComplete();
                }, 200); // Small pause at 100%
            }
        };

        animationFrameId = requestAnimationFrame(animate);

        return () => {
            isMounted = false;
            cancelAnimationFrame(animationFrameId);
        };
    }, [onComplete]);

    return (
        <div className="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center text-white overflow-hidden">
            {/* Background stars effect would be nice but keep it simple/clean */}

            {/* Miniature System */}
            <div
                ref={systemRef}
                className="relative w-64 h-64 mb-12 flex items-center justify-center"
            >
                {/* Sun */}
                <div className="absolute w-12 h-12 bg-[#FDB813] rounded-full shadow-[0_0_30px_#FDB813] z-10" />

                {/* Orbit 1 */}
                <div className="absolute w-32 h-32 border border-white/20 rounded-full flex items-center justify-center animate-spin-slow">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-blue-400 rounded-full shadow-[0_0_10px_blue]" />
                </div>

                {/* Orbit 2 */}
                <div className="absolute w-48 h-48 border border-white/10 rounded-full flex items-center justify-center"
                    style={{ transform: 'rotate(45deg)' }}
                >
                    <div className="absolute bottom-0 right-1/2 translate-x-1/2 translate-y-1/2 w-3 h-3 bg-red-400 rounded-full" />
                </div>

                {/* Orbit 3 */}
                <div className="absolute w-60 h-60 border border-white/5 rounded-full flex items-center justify-center"
                    style={{ transform: 'rotate(-30deg)' }}
                >
                    <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-orange-300 rounded-full" />
                </div>
            </div>

            {/* Loading Text */}
            <div className="text-2xl font-mono font-bold mb-4 tracking-wider animate-pulse">
                INITIALIZING SYSTEM...
            </div>

            {/* Progress Bar Container */}
            <div className="w-96 h-2 bg-white/10 rounded-full overflow-hidden relative border border-white/5">
                {/* Progress Bar */}
                <div
                    className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-75 ease-linear shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                    style={{ width: `${progress}%` }}
                />
            </div>

            {/* Percentage */}
            <div className="mt-2 text-white/50 font-mono text-sm">
                {Math.round(progress)}%
            </div>
        </div>
    );
}
