import React, { useEffect, useState, useRef } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ── Keyframes (Liquid Glass Wobble & Breathing) ────────────────────────── */
const wobble1 = keyframes` 
  0% { transform: translate(0, 0) scale(1) rotate(0deg); border-radius: 40% 60% 70% 30% / 50% 30% 70% 50%; } 
  50% { transform: translate(30px, -40px) scale(1.05) rotate(15deg); border-radius: 60% 40% 30% 70% / 60% 50% 50% 40%; } 
  100% { transform: translate(0, 0) scale(1) rotate(30deg); border-radius: 40% 60% 70% 30% / 50% 30% 70% 50%; }
`;
const wobble2 = keyframes` 
  0% { transform: translate(0, 0) scale(1) rotate(0deg); border-radius: 60% 40% 30% 70% / 60% 50% 50% 40%; } 
  50% { transform: translate(-40px, 30px) scale(0.95) rotate(-15deg); border-radius: 40% 60% 70% 30% / 50% 30% 70% 50%; } 
  100% { transform: translate(0, 0) scale(1) rotate(-30deg); border-radius: 60% 40% 30% 70% / 60% 50% 50% 40%; }
`;
const breathe = keyframes` 
  0% { transform: scale(1); opacity: 0.4; } 
  50% { transform: scale(1.15); opacity: 0.6; } 
  100% { transform: scale(1); opacity: 0.4; }
`;

/* ── Styled Components (Depth Layer Architecture) ─────────────────────── */
const AtmosphereContainer = styled.div`
  position: fixed; inset: 0; overflow: hidden; z-index: -999;
  background: #020308;
  pointer-events: none;
`;

/* 1. Far Blur Circles (Extreme Depth) */
const FarBlurCircle1 = styled(motion.div)`
  position: absolute; width: 40vw; height: 40vw; left: 10%; top: 10%;
  background: radial-gradient(circle, rgba(107, 0, 255, 0.06) 0%, transparent 70%);
  filter: blur(80px);
  animation: ${breathe} 18s ease-in-out infinite alternate;
`;
const FarBlurCircle2 = styled(motion.div)`
  position: absolute; width: 50vw; height: 50vw; right: 5%; bottom: 15%;
  background: radial-gradient(circle, rgba(1, 209, 255, 0.05) 0%, transparent 70%);
  filter: blur(100px);
  animation: ${breathe} 22s ease-in-out infinite alternate-reverse;
`;

/* 2. Medium Transparent Glass Orbs */
const MediumGlassOrb1 = styled(motion.div)`
  position: absolute; width: 35vw; height: 35vw; left: 20%; top: 40%;
  background: rgba(255, 255, 255, 0.015);
  backdrop-filter: blur(25px); -webkit-backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: inset 0 0 40px rgba(107, 0, 255, 0.04);
  animation: ${wobble1} 24s ease-in-out infinite;
`;
const MediumGlassOrb2 = styled(motion.div)`
  position: absolute; width: 30vw; height: 30vw; right: 15%; top: 15%;
  background: rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: inset 0 0 30px rgba(1, 209, 255, 0.04);
  animation: ${wobble2} 28s ease-in-out infinite reverse;
`;

/* 3. Front Liquid Crystal Circles (Sharpness + Refraction) */
const FrontCrystalOrb1 = styled(motion.div)`
  position: absolute; width: 18vw; height: 18vw; left: 60%; bottom: 20%;
  background: radial-gradient(135deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.005) 100%);
  backdrop-filter: blur(40px) saturate(200%); -webkit-backdrop-filter: blur(40px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.1), 0 30px 60px rgba(0, 0, 0, 0.3);
  animation: ${wobble1} 15s ease-in-out infinite reverse;
`;
const FrontCrystalOrb2 = styled(motion.div)`
  position: absolute; width: 14vw; height: 14vw; left: 15%; bottom: 10%;
  background: radial-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.005) 100%);
  backdrop-filter: blur(35px) saturate(180%); -webkit-backdrop-filter: blur(35px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.15);
  box-shadow: inset 0 0 15px rgba(1, 209, 255, 0.05), 0 20px 40px rgba(0, 0, 0, 0.2);
  animation: ${wobble2} 18s ease-in-out infinite;
`;

/* 4. Glow Fog Layer */
const FarGlowFog = styled(motion.div)`
  position: absolute; inset: -20%; width: 140%; height: 140%;
  background: radial-gradient(circle at 10% 20%, rgba(107, 0, 255, 0.05) 0%, transparent 30%),
              radial-gradient(circle at 90% 80%, rgba(1, 209, 255, 0.05) 0%, transparent 35%);
  filter: blur(120px); mix-blend-mode: color-dodge;
`;

const ParticlesCanvas = styled(motion.canvas)`
  position: absolute; inset: -20%; width: 140%; height: 140%; pointer-events: none;
`;

/* ── Canvas Engine (Deep Particles & Droplets) ────────────────────────── */
class AmbientParticle {
  constructor(canvasWidth, canvasHeight) {
    this.w = canvasWidth;
    this.h = canvasHeight;
    this.reset(true);
  }

  reset(randomizeY) {
    this.type = Math.random() > 0.6 ? 'droplet' : 'star';
    this.x = Math.random() * this.w;
    this.y = randomizeY ? Math.random() * this.h : (this.type === 'droplet' ? this.h + 50 : Math.random() * this.h);
    
    if (this.type === 'star') {
      this.size = Math.random() * 1.5 + 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.speed = Math.random() * 0.2 + 0.05;
      this.blinkPhase = Math.random() * Math.PI * 2;
      this.blinkSpeed = Math.random() * 0.02 + 0.01;
      this.color = Math.random() > 0.5 ? '255, 255, 255' : '1, 209, 255';
    } else {
      // Liquid glass droplets
      this.size = Math.random() * 8 + 3;
      this.opacity = Math.random() * 0.3 + 0.1;
      this.vy = -(Math.random() * 0.5 + 0.2); // Slow rise
      this.vx = (Math.random() - 0.5) * 0.3; // Tiny drift
    }
  }

  update() {
    if (this.type === 'star') {
      this.y -= this.speed;
      this.blinkPhase += this.blinkSpeed;
      if (this.y < -50) this.reset();
    } else {
      this.y += this.vy;
      this.x += this.vx;
      if (this.y < -50 || this.x < -50 || this.x > this.w + 50) this.reset();
    }
  }

  draw(ctx) {
    if (this.type === 'star') {
      const currentOpacity = this.opacity + Math.sin(this.blinkPhase) * 0.2;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, ${Math.max(0, currentOpacity)})`;
      ctx.shadowBlur = this.size * 2;
      ctx.shadowColor = `rgba(${this.color}, 0.8)`;
      ctx.fill();
    } else {
      // Glossy transparent water bead rendering
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.2})`;
      ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity * 1.5})`;
      ctx.lineWidth = this.size * 0.15;
      ctx.shadowBlur = 4;
      ctx.shadowColor = 'rgba(1, 209, 255, 0.4)';
      ctx.fill();
      ctx.stroke();

      // Delicate top-left reflection highlight inside droplet
      ctx.beginPath();
      ctx.arc(this.x - this.size * 0.3, this.y - this.size * 0.3, this.size * 0.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity + 0.4})`;
      ctx.shadowBlur = 0;
      ctx.fill();
    }
    ctx.shadowBlur = 0; // Reset
  }
}

const BackgroundParticleCanvas = ({ layerY, mouseX }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    let frameId;
    let width = window.innerWidth * 1.4;
    let height = window.innerHeight * 1.4;
    
    // Create heavy ambient count
    let particles = Array.from({ length: 150 }, () => new AmbientParticle(width, height));

    const resize = () => {
      width = window.innerWidth * 1.4;
      height = window.innerHeight * 1.4;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', resize);
    resize();

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach(p => { p.update(); p.draw(ctx); });
      frameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <ParticlesCanvas ref={canvasRef} style={{ y: layerY, x: mouseX }} />;
};

/* ── Component ────────────────────────────────────────────────────────── */
const ParallaxAtmosphere = () => {
  const { scrollY } = useScroll();
  
  const layer1Y = useTransform(scrollY, [0, 4000], [0, 150]);  // Far Fog
  const layer2Y = useTransform(scrollY, [0, 4000], [0, 350]);  // Glass Blobs
  const layer3Y = useTransform(scrollY, [0, 4000], [0, -250]); // Light Streaks
  const layer4Y = useTransform(scrollY, [0, 4000], [0, 500]);  // Liquid Refraction
  const layer5Y = useTransform(scrollY, [0, 4000], [0, -600]); // Droplets Parallax Engine
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    let ticking = false;
    const handleMouseMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const x = (e.clientX / window.innerWidth - 0.5) * 200;
          const y = (e.clientY / window.innerHeight - 0.5) * 200;
          setMousePos({ x, y });
          ticking = false;
        });
        ticking = true;
      }
    };
    if (!window.matchMedia("(pointer: coarse)").matches) window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <AtmosphereContainer>
      {/* 4. Glow Fog Layer (Extreme Distance Slowest Mapping) */}
      <FarGlowFog style={{ y: layer1Y, x: mousePos.x * 0.05, y: mousePos.y * 0.05 }} />

      {/* 1. Far Blur Circles (Deep Parallax) */}
      <FarBlurCircle1 style={{ y: layer2Y, x: mousePos.x * 0.2, y: mousePos.y * 0.2 }} />
      <FarBlurCircle2 style={{ y: layer2Y, x: -mousePos.x * 0.25, y: -mousePos.y * 0.25 }} />

      {/* 2. Medium Transparent Glass Orbs (Mid-tracking) */}
      <MediumGlassOrb1 style={{ y: layer3Y, x: -mousePos.x * 0.35, y: -mousePos.y * 0.35 }} />
      <MediumGlassOrb2 style={{ y: layer3Y, x: mousePos.x * 0.4, y: mousePos.y * 0.4 }} />

      {/* 3. Front Liquid Crystal Circles (Aggressive Floating tracking) */}
      <FrontCrystalOrb1 style={{ y: layer4Y, x: mousePos.x * 0.6, y: mousePos.y * 0.6 }} />
      <FrontCrystalOrb2 style={{ y: layer4Y, x: -mousePos.x * 0.7, y: -mousePos.y * 0.7 }} />

      {/* Layer 5: Unmodified Particles Drop Engine (Reverse extreme) */}
      <BackgroundParticleCanvas layerY={layer5Y} mouseX={mousePos.x * 0.8} />
    </AtmosphereContainer>
  );
};

export default ParallaxAtmosphere;
