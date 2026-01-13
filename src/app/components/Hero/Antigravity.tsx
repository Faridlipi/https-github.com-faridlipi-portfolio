"use client";

/* eslint-disable react/no-unknown-property */
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

const AntigravityInner = ({
    count = 300,
    ringRadius = 10,
    ringThickness = 5,
    waveSpeed = 0.4,
    waveAmplitude = 1,
    particleSize = 2,
    lerpSpeed = 0.1,
    color = '#4352c7',
    particleVariance = 1,
    pulseSpeed = 3,
    particleShape = 'sphere'
}: any) => {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const { viewport } = useThree();
    const dummy = useMemo(() => new THREE.Object3D(), []);

    // Interactive Mouse State
    const mouse = useRef({ x: 0, y: 0 });

    const particles = useMemo(() => {
        const temp = [];
        // Determine Ring Dimensions
        // If ringRadius is passed small (e.g. 10), we use it. 
        // If it's huge or missing, we default to a reasonable size.
        const rBase = ringRadius || 12;

        for (let i = 0; i < count; i++) {
            // --- VISUAL DESIGN: HOUDINI RING ---
            // 1. Angle: Random around the circle
            const angle = Math.random() * Math.PI * 2;

            // 2. Radius: Gaussian-like cluster around the ring band
            // (Sum of randoms concentrates it in the middle -> clean band look)
            const randR = (Math.random() + Math.random() + Math.random()) / 3;
            const r = rBase + (randR - 0.5) * ringThickness;

            // 3. Position: Polar to Cartesian
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            // 4. Depth: Flattened Z for the "2D Ring" look
            const z = (Math.random() - 0.5) * 2;

            // --- ANIMATION ATTRIBUTES ---
            const speed = 0.01 + Math.random() * 0.05; // Random float speed
            const amp = 0.5 + Math.random() * 1.5;     // Random float distance

            // Random start time for organic feel
            const timeOffset = Math.random() * 100;
            const randomRadiusOffset = (Math.random() - 0.5) * 2;

            temp.push({
                x, y, z,       // Base (Home) Position
                speed, amp, timeOffset, // Movement Props
                randomRadiusOffset,
                // Init current pos
                cx: x, cy: y, cz: z
            });
        }
        return temp;
    }, [count, ringRadius, ringThickness]);

    useFrame((state) => {
        const mesh = meshRef.current;
        if (!mesh) return;

        const time = state.clock.getElapsedTime();
        const { pointer, viewport } = state;

        // Smooth Mouse Parallax (Tilt)
        const targetMouseX = pointer.x * viewport.width * 0.1; // Moderate tilt
        const targetMouseY = pointer.y * viewport.height * 0.1;

        mouse.current.x += (targetMouseX - mouse.current.x) * 0.05;
        mouse.current.y += (targetMouseY - mouse.current.y) * 0.05;

        particles.forEach((particle, i) => {
            // --- PHYSICS MOVEMENT ---

            // 1. Independent Float (Breathing)
            // Use time + individual speed to create unrelated movements
            const driftX = Math.sin(time * particle.speed + particle.timeOffset) * (particle.amp * 0.5);
            const driftY = Math.cos(time * particle.speed + particle.timeOffset) * particle.amp;

            // 2. Apply Position
            // BaseRing + Drift - MouseParallax
            // The mouse subtraction creates the "depth" illusion against the background
            const finalX = particle.x + driftX - mouse.current.x;
            const finalY = particle.y + driftY - mouse.current.y;
            const finalZ = particle.z;

            dummy.position.set(finalX, finalY, finalZ);

            // 3. Scale Pulse
            const scale = 1 + Math.sin(time * pulseSpeed + particle.timeOffset) * 0.1;
            dummy.scale.set(scale, scale, scale);

            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);
        });

        mesh.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            {particleShape === 'sphere' && <sphereGeometry args={[0.1 * particleSize, 16, 16]} />}
            {particleShape === 'capsule' && <capsuleGeometry args={[0.1, 0.4, 4, 8]} />}

            <meshBasicMaterial
                color={color}
                transparent={true}
                opacity={0.6} // Calm, semi-transparent look (Essential for "Visuals like before")
            />
        </instancedMesh>
    );
};

const Antigravity = (props: any) => {
    return (
        <Canvas camera={{ position: [0, 0, 50], fov: 35 }}>
            <AntigravityInner {...props} />
        </Canvas>
    );
};

export default Antigravity;
