import * as THREE from 'three';

export interface Rocket {
    id: number;
    position: THREE.Vector3;
    velocity: THREE.Vector3;
    createdAt: number;
    color: string;
    name: string;
    designType: number;
    score: number;
    attractorEnabled: boolean;
    lastMoveTime: number;
}

export interface Explosion {
    id: number;
    position: THREE.Vector3;
    startTime: number;
}

export type LayerMode = 'none' | 'habitable' | 'gravity' | 'lagrange';

export type SystemType = 'solar' | 'kerbol';
