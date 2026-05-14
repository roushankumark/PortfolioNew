import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

/* ── Animations ──────────────────────────────────────────── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(30px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const avatarGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0 3px rgba(1,209,255,0.2), 0 0 28px rgba(1,209,255,0.3), 0 0 60px rgba(189,46,46,0.12); }
  50%       { box-shadow: 0 0 0 3px rgba(1,209,255,0.4), 0 0 44px rgba(1,209,255,0.5), 0 0 80px rgba(189,46,46,0.18); }
`;

const shimmerCyan = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const liquidWobble = keyframes`
  0%, 100% { border-radius: 50%; }
  25% { border-radius: 52% 48% 51% 49% / 51% 49% 52% 48%; }
  50% { border-radius: 49% 51% 48% 52% / 49% 51% 48% 52%; }
  75% { border-radius: 51% 49% 52% 48% / 52% 48% 49% 51%; }
`;

const orbitalBreathing = keyframes`
  0%, 100% { transform: scale(1) rotateX(15deg) rotateY(15deg); opacity: 0.6; box-shadow: 0 0 40px rgba(1, 209, 255, 0.2); }
  50% { transform: scale(1.05) rotateX(-5deg) rotateY(-5deg); opacity: 0.9; box-shadow: 0 0 60px rgba(1, 209, 255, 0.4); }
`;

const expandRipple = keyframes`
  0% { transform: scale(1) rotate(0deg); opacity: 0.8; }
  100% { transform: scale(1.2) rotate(45deg); opacity: 0; }
`;

const orbitSpin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const reverseOrbitSpin = keyframes`
  from { transform: rotate(360deg); }
  to { transform: rotate(0deg); }
`;

/* ── Hero full-section container ─────────────────────────── */
export const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  position: relative;
  padding: 80px 30px;
  background: transparent;
  overflow: hidden;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 70% 96%, 0 100%);
  z-index: 1;

  @media (max-width: 960px) { padding: 66px 16px; }
  @media (max-width: 640px) { padding: 32px 16px; }
`;

/* ── BG slot — transparent, Vanta shows through ─────────── */
export const HeroBg = styled.div`
  position: absolute;
  top: 0; right: 0; bottom: 0; left: 0;
  width: 100%; height: 100%;
  overflow: hidden;
  z-index: 0;
  pointer-events: none;
`;

/* ── Content row ─────────────────────────────────────────── */
export const HeroInnerContainer = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 1100px;

  @media (max-width: 960px) { flex-direction: column; }
`;

/* ── Left column ─────────────────────────────────────────── */
export const HeroLeftContainer = styled.div`
  width: 100%;
  order: 1;
  animation: ${fadeUp} 0.9s ease both;

  @media (max-width: 960px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media (max-width: 640px) {
    order: 2;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

/* ── Right column ────────────────────────────────────────── */
export const HeroRightContainer = styled.div`
  width: 100%;
  display: flex;
  order: 2;
  justify-content: flex-end;
  gap: 12px;
  animation: ${fadeUp} 1.1s ease 0.15s both;

  @media (max-width: 960px) {
    order: 1;
    justify-content: center;
    align-items: center;
    margin-bottom: 80px;
  }

  @media (max-width: 640px) { margin-bottom: 30px; }
`;

export const ProfileOrbWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 400px;
  height: 100%;
  max-height: 400px;
  perspective: 1000px;
  
  @media (max-width: 768px) { max-width: 400px; max-height: 400px; }
  @media (max-width: 640px) { max-width: 280px; max-height: 280px; }
`;

export const OuterEnergyRing = styled.div`
  position: absolute;
  top: -20px; left: -20px; right: -20px; bottom: -20px;
  border-radius: 50%;
  border: 1px solid rgba(138, 43, 226, 0.3);
  box-shadow: 0 0 40px rgba(1, 209, 255, 0.2), inset 0 0 20px rgba(1, 209, 255, 0.2);
  animation: ${orbitalBreathing} 6s ease-in-out infinite;
  pointer-events: none;
  z-index: 0;
  transform-style: preserve-3d;
`;

export const OrbitPathRing = styled.div`
  position: absolute;
  top: -30px; left: -30px; right: -30px; bottom: -30px;
  border-radius: 50%;
  border: 2px dashed rgba(1, 209, 255, 0.2);
  animation: ${orbitSpin} 20s linear infinite;
  pointer-events: none;
  z-index: 0;
`;

export const SpinShineRing = styled(motion.div)`
  position: absolute;
  top: -40px; left: -40px; right: -40px; bottom: -40px;
  border-radius: 50%;
  background: conic-gradient(from 0deg, transparent 0%, rgba(1, 209, 255, 0.1) 15%, rgba(255, 255, 255, 0.7) 25%, rgba(1, 209, 255, 0.1) 35%, transparent 50%);
  filter: blur(10px);
  pointer-events: none;
  z-index: 0;
  opacity: 0.6;
`;

export const CrystalHalo = styled.div`
  position: absolute;
  top: -50px; left: -50px; right: -50px; bottom: -50px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(1, 209, 255, 0.1) 0%, rgba(138, 43, 226, 0.05) 50%, transparent 70%);
  filter: blur(25px);
  pointer-events: none;
  z-index: -1;
`;

export const RippleCircle = styled.div`
  position: absolute;
  top: -5px; left: -5px; right: -5px; bottom: -5px;
  border-radius: 50%;
  border: 2px solid rgba(1, 209, 255, 0.4);
  animation: ${expandRipple} 4s cubic-bezier(0.1, 0.7, 0.3, 1) infinite;
  pointer-events: none;
  z-index: 0;
`;

export const OrbiterContainer = styled.div`
  position: absolute;
  top: -30px; left: -30px; right: -30px; bottom: -30px;
  animation: ${props => props.reverse ? reverseOrbitSpin : orbitSpin} ${props => props.duration || '10s'} linear infinite;
  pointer-events: none;
  z-index: 0;
`;

export const OrbitingCrystal = styled.div`
  position: absolute;
  top: -4px; left: 50%;
  transform: translateX(-50%);
  width: ${props => props.size || '8px'};
  height: ${props => props.size || '8px'};
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 15px 5px rgba(1, 209, 255, 0.9), 0 0 30px 10px rgba(255, 255, 255, 0.5);
  pointer-events: none;
`;

export const OrbitingComet = styled.div`
  position: absolute;
  top: -6px; left: 50%;
  transform: translateX(-50%);
  width: 12px; height: 12px;
  background: #fff;
  border-radius: 50%;
  box-shadow: 0 0 20px 8px rgba(1, 209, 255, 1);
  pointer-events: none;

  &::after {
    content: '';
    position: absolute;
    top: 50%; left: 100%;
    transform: translateY(-50%);
    width: 60px; height: 4px;
    background: linear-gradient(90deg, rgba(255,255,255,0.8), transparent);
    border-radius: 4px;
    filter: blur(2px);
  }
`;

export const Img = styled.img`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  border-radius: 50%;
  border: 2px solid rgba(1, 209, 255, 0.6);
  animation: ${avatarGlow} 3.5s ease-in-out infinite;
  transition: transform 0.4s ease;
  z-index: 10;

  &:hover {
    transform: scale(1.04);
  }
`;

/* ── Hero title ──────────────────────────────────────────── */
export const Title = styled.div`
  font-weight: 700;
  font-size: 50px;
  color: #f0f4ff;
  line-height: 68px;
  text-shadow: 0 2px 24px rgba(1, 209, 255, 0.25), 0 0 60px rgba(189,46,46,0.1);
  letter-spacing: -0.5px;

  @media (max-width: 960px) { text-align: center; }

  @media (max-width: 640px) {
    font-size: 40px;
    line-height: 48px;
    margin-bottom: 8px;
  }
`;

/* ── Typewriter row ──────────────────────────────────────── */
export const TextLoop = styled.div`
  font-weight: 600;
  font-size: 32px;
  display: flex;
  gap: 12px;
  color: #ccd8ee;
  line-height: 68px;

  @media (max-width: 960px) { text-align: center; }

  @media (max-width: 640px) {
    font-size: 22px;
    line-height: 48px;
    margin-bottom: 16px;
  }
`;

/* ── Coloured typewriter span — cyan shimmer ─────────────── */
export const Span = styled.span`
  background: linear-gradient(
    90deg,
    #01d1ff 0%,
    #bd2e2e 35%,
    #01d1ff 70%,
    #bd2e2e 100%
  );
  background-size: 400px 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: ${shimmerCyan} 4s linear infinite;
  cursor: pointer;
`;

/* ── Subtitle ────────────────────────────────────────────── */
export const SubTitle = styled.div`
  font-size: 20px;
  line-height: 32px;
  margin-bottom: 42px;
  color: rgba(180, 200, 230, 0.78);

  @media (max-width: 960px) { text-align: center; }
  @media (max-width: 640px) {
    font-size: 16px;
    line-height: 32px;
  }
`;

/* ── CTA Resume Button — iPhone glass pill ────────────────── */
export const ResumeButton = styled.a`
  -webkit-appearance: button;
  -moz-appearance: button;
  appearance: button;
  text-decoration: none;
  width: 95%;
  max-width: 300px;
  text-align: center;
  padding: 18px 0;
  color: #fff;
  border-radius: 50px; /* Pill shape */
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  letter-spacing: 0.5px;
  position: relative;
  overflow: hidden;

  background: rgba(255, 255, 255, 0.12); /* Translucent white glass */
  border: 1px solid rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.4);
  transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), background 0.5s ease, box-shadow 0.5s ease;

  /* Gloss shine */
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 50%;
    background: linear-gradient(180deg, rgba(255,255,255,0.2) 0%, transparent 100%);
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-4px) scale(1.02);
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25), inset 0 1px 2px rgba(255, 255, 255, 0.6);
  }

  &:active {
    transform: translateY(2px) scale(0.96); /* Liquid press animation */
    background: rgba(255, 255, 255, 0.15);
  }

  @media (max-width: 640px) {
    padding: 14px 0;
    font-size: 16px;
  }
`;

/* ── Social icons ────────────────────────────────────────── */
export const SocialMediaIcons = styled.div`
  display: flex;
  margin-top: 1rem;
`;

export const SocialMediaIcon = styled.a`
  display: inline-block;
  margin: 0 1rem;
  font-size: 1.5rem;
  color: rgba(180, 200, 230, 0.7);
  transition: color 0.25s ease, transform 0.25s ease;

  &:hover {
    color: #01d1ff;
    transform: translateY(-3px);
  }
`;
