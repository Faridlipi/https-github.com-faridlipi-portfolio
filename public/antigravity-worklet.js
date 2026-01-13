/*
  Antigravity Particles Worklet
  Replicates the "Ring Particles" look but adds independent floating physics.
*/

if (typeof registerPaint !== 'undefined') {
    class AntigravityPainter {
        static get inputProperties() {
            return [
                '--ring-radius',
                '--ring-thickness',
                '--particle-count',
                '--particle-color',
                '--particle-size',
                '--ring-x',
                '--ring-y',
                '--ring-interactive',
                '--animation-tick', // Driven by JS loop for continuous animation
                '--seed'
            ];
        }

        paint(ctx, size, props) {
            const radius = parseFloat(props.get('--ring-radius').toString()) || 300;
            const thickness = parseFloat(props.get('--ring-thickness').toString()) || 100;
            const count = parseInt(props.get('--particle-count').toString()) || 100;
            const color = props.get('--particle-color').toString().trim() || '#ffffff';
            const particleSize = parseFloat(props.get('--particle-size').toString()) || 2;

            // Interaction State
            const mouseX = parseFloat(props.get('--ring-x').toString());
            const mouseY = parseFloat(props.get('--ring-y').toString());
            const tick = parseFloat(props.get('--animation-tick').toString()) || 0;
            const seed = parseInt(props.get('--seed').toString()) || 1;

            // Seeded random function for deterministic particle placement
            let currentSeed = seed;
            const random = () => {
                const x = Math.sin(currentSeed++) * 10000;
                return x - Math.floor(x);
            };

            const centerX = size.width / 2;
            const centerY = size.height / 2;

            // Mouse Tilt Calculation (moves the center slightly based on mouse)
            // 50 is center. (0-100 range)
            const tiltX = (mouseX - 50) * 2; // -100 to 100 range approx
            const tiltY = (mouseY - 50) * 2;

            ctx.fillStyle = color;

            for (let i = 0; i < count; i++) {
                // Polar Coordinates for Ring
                const angle = random() * Math.PI * 2;

                // Gaussian-like distribution for thickness (denser in middle of ring)
                // We use multiple randoms to approximate gaussian
                const randR = (random() + random() + random()) / 3;
                const distOffset = (randR - 0.5) * thickness;

                const r = radius + distOffset;

                // Base Position
                let x = centerX + Math.cos(angle) * r;
                let y = centerY + Math.sin(angle) * r;

                // --- 3D / Antigravity Physics ---

                // 1. Independent Float (Breathing)
                // Each particle has a unique offset based on its index (i)
                // We use Time (tick) to animate it.
                // driftY moves up/down. driftX moves slightly left/right.
                const floatSpeed = 0.05 + (random() * 0.05); // vary speed
                const floatAmp = 10 + (random() * 20); // vary amplitude
                const timeOffset = i * 0.1;

                const driftX = Math.sin(tick * floatSpeed + timeOffset) * (floatAmp * 0.5);
                const driftY = Math.cos(tick * floatSpeed + timeOffset) * floatAmp;

                // 2. Mouse Parallax (Tilt)
                // Particles "closer" (larger z-index simulation) move more?
                // For a ring, we can just apply the global tilt with a slight random factor to simulate depth.
                const depth = 0.5 + random(); // 0.5 to 1.5 depth scale
                const parallaxX = tiltX * depth;
                const parallaxY = tiltY * depth;

                // Apply Positions
                const finalX = x + driftX - parallaxX; // Minus for inverse parallax feel
                const finalY = y + driftY - parallaxY;

                // Draw Particle
                ctx.beginPath();
                // Vary size slightly by depth for "pseudo-3d"
                const sizeMod = particleSize * depth;
                ctx.arc(finalX, finalY, Math.max(0.1, sizeMod), 0, 2 * Math.PI);
                ctx.fill();
            }
        }
    }

    registerPaint('ring-particles', AntigravityPainter);
}
