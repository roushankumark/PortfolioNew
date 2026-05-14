import styled, { keyframes } from 'styled-components'
import Tilt from 'react-parallax-tilt'
import { skills } from '../../data/constants'

const liquidReflection = keyframes`
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
`;

/* ── Animations ─────────────────────────────────────────── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`

const iconSpin = keyframes`
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
`

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(1,209,255,0); }
  50%       { box-shadow: 0 0 0 6px rgba(1,209,255,0.12); }
`

const shimmerBar = keyframes`
  from { background-position: -200px 0; }
  to   { background-position: 200px 0; }
`

/* ── Section layout ─────────────────────────────────────── */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 60px 16px;
`

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  gap: 16px;
`

export const Title = styled.div`
  font-size: 44px;
  text-align: center;
  font-weight: 700;
  color: #f0f4ff;
  letter-spacing: -0.5px;
  text-shadow: 0 0 40px rgba(1,209,255,0.2);
  animation: ${fadeUp} 0.7s ease both;

  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 32px;
  }
`

export const Desc = styled.div`
  font-size: 17px;
  text-align: center;
  max-width: 580px;
  color: rgba(142, 168, 195, 0.9);
  line-height: 1.6;
  animation: ${fadeUp} 0.7s ease 0.1s both;

  @media (max-width: 768px) { font-size: 15px; }
`

/* ── Skills grid ────────────────────────────────────────── */
const SkillsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  margin-top: 20px;
  gap: 28px;
  justify-content: center;
`

/* ── Individual skill category card ────────────────────── */
const Skill = styled.div.attrs({ className: 'glass-box' })`
  width: 100%;
  max-width: 500px;
  background: rgba(255, 255, 255, 0.03); /* iPhone Style */
  backdrop-filter: blur(25px) saturate(200%);
  -webkit-backdrop-filter: blur(25px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 28px;
  padding: 26px 36px;
  position: relative;
  overflow: hidden;
  transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease, background 0.5s ease, border-color 0.5s ease;
  animation: ${fadeUp} 0.7s ease both;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3);

  /* Inner white reflection */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 28px;
    background: radial-gradient(circle at 0% 0%, rgba(255,255,255,0.3) 0%, transparent 50%);
    background-size: 200% 200%;
    animation: ${liquidReflection} 8s ease-in-out infinite;
    pointer-events: none;
    z-index: 10;
    transition: background 0.5s ease;
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
    background: rgba(255, 255, 255, 0.18);
    box-shadow: 0 24px 60px rgba(0,0,0,0.25),
                0 0 40px rgba(6,182,212,0.15),
                inset 0 1px 2px rgba(255, 255, 255, 0.5);
    border-color: rgba(255, 255, 255, 0.4);
  }

  &:hover::before {
    background: radial-gradient(circle at 0% 0%, rgba(255,255,255,0.4) 0%, transparent 60%);
  }

  @media (max-width: 768px) {
    max-width: 400px;
    padding: 16px 24px;
  }

  @media (max-width: 500px) {
    max-width: 330px;
    padding: 14px 18px;
  }
`

const SkillTitle = styled.h2`
  font-size: 22px;
  font-weight: 700;
  color: #01d1ff;
  margin-bottom: 18px;
  text-align: center;
  text-shadow: 0 0 16px rgba(1,209,255,0.3);
  letter-spacing: 0.2px;
`

const SkillList = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 8px;
`

/* ── Individual skill badge ─────────────────────────────── */
const SkillItem = styled.div`
  font-size: 14px;
  font-weight: 500;
  color: rgba(240, 244, 255, 0.88);
  border: 1px solid rgba(1, 209, 255, 0.18);
  background: rgba(1, 209, 255, 0.06);
  border-radius: 10px;
  padding: 8px 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: default;
  transition: background 0.25s ease,
              border-color 0.25s ease,
              transform 0.25s ease,
              box-shadow 0.25s ease;

  &:hover {
    background: rgba(1, 209, 255, 0.14);
    border-color: rgba(1, 209, 255, 0.45);
    box-shadow: 0 0 14px rgba(1, 209, 255, 0.25);
    transform: translateY(-3px) scale(1.04);

    img {
      animation: ${iconSpin} 0.6s ease;
    }
  }

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 6px 12px;
  }
`

const SkillImage = styled.img`
  width: 22px;
  height: 22px;
  object-fit: contain;
  transition: transform 0.3s ease;
`

const Skills = () => {
  return (
    <Container id="skills">
      <Wrapper>
        <Title>Skills</Title>
        <Desc>
          Here are some skills I've honed over the past two years, through dedicated practice and experience.
        </Desc>
        <SkillsContainer>
          {skills.map((skill, i) => (
            <Tilt key={i} tiltMaxAngleX={8} tiltMaxAngleY={8} scale={1.02} transitionSpeed={2000} glareEnable={true} glareMaxOpacity={0.15} glareColor="#01d1ff" style={{ display: 'flex', width: '100%', maxWidth: '500px', justifyContent: 'center' }}>
            <Skill style={{ animationDelay: `${i * 0.1}s`, width: '100%' }}>
              <SkillTitle>{skill.title}</SkillTitle>
              <SkillList>
                {skill.skills.map((item, j) => (
                  <SkillItem key={j}>
                    <SkillImage src={item.image} alt={item.name} />
                    {item.name}
                  </SkillItem>
                ))}
              </SkillList>
            </Skill>
            </Tilt>
          ))}
        </SkillsContainer>
      </Wrapper>
    </Container>
  )
}

export default Skills