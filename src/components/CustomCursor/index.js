import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CursorWrapper = styled.div`
  * { cursor: none !important; }
`;

const LiquidPointer = styled(motion.div)`
  position: fixed; top: 0; left: 0;
  width: 14px; height: 18px; 
  border-radius: 50% 50% 40% 40% / 60% 60% 40% 40%; /* Subtle organic droplet curve */
  pointer-events: none; z-index: 10000;
  backdrop-filter: blur(4px); -webkit-backdrop-filter: blur(4px);
  background: radial-gradient(circle at 35% 25%, rgba(255, 255, 255, 0.9) 0%, rgba(1, 209, 255, 0.1) 40%, rgba(255, 255, 255, 0.0) 80%);
  box-shadow: inset 1px 1px 3px rgba(255, 255, 255, 1), inset -1px -2px 4px rgba(0, 0, 10, 0.1), 0 2px 8px rgba(1, 209, 255, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transform: translate(-50%, -50%);
`;

const CanvasContainer = styled.canvas`
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 9999;
  mix-blend-mode: screen;
`;

class Particle {
  constructor(x, y, type, vx, vy) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.life = 1.0;
    
    const colors = ['#00d4ff', '#6b00ff', '#ffffff'];
    this.color = colors[Math.floor(Math.random() * colors.length)];

    if (type === 'star') {
      this.vx = vx * 0.2 + (Math.random() - 0.5) * 1;
      this.vy = vy * 0.2 + (Math.random() - 0.5) * 1;
      this.decay = Math.random() * 0.015 + 0.01;
      this.radius = Math.random() * 2 + 0.5;
    } else if (type === 'smoke') {
      this.vx = vx * 0.1 + (Math.random() - 0.5) * 0.5;
      this.vy = vy * 0.1 - Math.random() * 1;
      this.decay = Math.random() * 0.008 + 0.005;
      this.radius = Math.random() * 6 + 4;
    } else if (type === 'ripple') {
      this.vx = vx * 0.4 + (Math.random() - 0.5) * 3;
      this.vy = vy * 0.4 + (Math.random() - 0.5) * 3;
      this.decay = Math.random() * 0.03 + 0.02;
      this.radius = Math.random() * 3 + 1.5;
    }
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.life -= this.decay;
    if (this.type === 'smoke') {
      this.radius += 0.2;
    }
  }

  draw(ctx) {
    if (this.life <= 0) return;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

    if (this.type === 'star') {
      ctx.fillStyle = `rgba(${this.hexToRgb(this.color)}, ${this.life})`;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
    } else if (this.type === 'smoke') {
      ctx.fillStyle = `rgba(${this.hexToRgb(this.color)}, ${this.life * 0.3})`;
      ctx.shadowBlur = 20;
      ctx.shadowColor = this.color;
    } else if (this.type === 'ripple') {
      ctx.fillStyle = 'transparent';
      ctx.strokeStyle = `rgba(${this.hexToRgb(this.color)}, ${this.life})`;
      ctx.lineWidth = 1.5;
      ctx.shadowBlur = 5;
      ctx.shadowColor = this.color;
      ctx.stroke();
      return; 
    }
    
    ctx.fill();
    ctx.shadowBlur = 0; 
  }

  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '255, 255, 255';
  }
}

const CustomCursor = () => {
  const canvasRef = useRef(null);
  const pointerX = useMotionValue(-100);
  const pointerY = useMotionValue(-100);
  
  // Spring settings for hyper-smooth DOM droplet lead
  const springX = useSpring(pointerX, { damping: 30, stiffness: 400, mass: 0.1 });
  const springY = useSpring(pointerY, { damping: 30, stiffness: 400, mass: 0.1 });
  
  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) {
       document.body.style.cursor = "auto";
       return; 
    } else {
       document.documentElement.style.cursor = "none";
       document.body.style.cursor = "none";
    }
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    let lastX = -100;
    let lastY = -100;
    let mouseX = -100;
    let mouseY = -100;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      // Update DOM Framer Motion Droplet
      pointerX.set(mouseX);
      pointerY.set(mouseY);
      
      const dx = mouseX - lastX;
      const dy = mouseY - lastY;
      const speed = Math.sqrt(dx * dx + dy * dy);

      // Canvas Particle Emissions
      particles.push(new Particle(mouseX, mouseY, 'star', dx, dy));
      if (Math.random() > 0.5) particles.push(new Particle(mouseX, mouseY, 'smoke', dx, dy));

      if (speed > 40 && lastX !== -100) {
        for (let i = 0; i < 5; i++) {
          particles.push(new Particle(mouseX, mouseY, 'ripple', dx, dy));
        }
      }

      lastX = mouseX;
      lastY = mouseY;
    };

    const handleMouseOver = (e) => {
      const t = e.target;
      if (window.getComputedStyle(t).cursor === 'pointer' || t.closest('.glass-box') || t.tagName.toLowerCase() === 'a' || t.tagName.toLowerCase() === 'button') {
        for (let i = 0; i < 12; i++) {
          particles.push(new Particle(mouseX, mouseY, 'ripple', (Math.random() - 0.5) * 15, (Math.random() - 0.5) * 15));
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height); 
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw(ctx);
        if (p.life <= 0) {
          particles.splice(i, 1);
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    return () => {
      document.documentElement.style.cursor = "auto";
      document.body.style.cursor = "auto";
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, [pointerX, pointerY]);

  if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <CursorWrapper>
      <LiquidPointer style={{ x: springX, y: springY, marginLeft: '-7px', marginTop: '-9px' }} />
      <CanvasContainer ref={canvasRef} />
    </CursorWrapper>
  );
};

export default CustomCursor;
