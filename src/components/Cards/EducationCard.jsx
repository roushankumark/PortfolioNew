import styled, { keyframes } from 'styled-components'
import Tilt from 'react-parallax-tilt'

const liquidReflection = keyframes`
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
`;

/* ── Animations ────────────────────────────────────────────── */
const slideIn = keyframes`
  from { opacity: 0; transform: translateX(16px); }
  to   { opacity: 1; transform: translateX(0); }
`

const gradeGlow = keyframes`
  0%, 100% { color: #01d1ff; text-shadow: 0 0 8px rgba(1,209,255,0.3); }
  50%       { color: #a8e6ff; text-shadow: 0 0 16px rgba(1,209,255,0.6); }
`

const Card = styled.div.attrs({ className: 'glass-box' })`
    width: 650px;
    background: rgba(255, 255, 255, 0.03); /* iPhone glass */
    backdrop-filter: blur(25px) saturate(200%);
    -webkit-backdrop-filter: blur(25px) saturate(200%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 28px;
    padding: 26px 30px;
    position: relative;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    gap: 12px;
    transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), box-shadow 0.5s ease, background 0.5s ease, border-color 0.5s ease;
    animation: ${slideIn} 0.5s ease both;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3);

    /* Inner white reflection top */
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

    /* Strict Isolated Hover Border Layer */
    &::after {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: 28px;
        padding: 1.5px;
        -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        opacity: 0;
        transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        pointer-events: none;
        z-index: 10;
    }

    /* Transform ONLY the layout position on main hover */
    &:hover {
        transform: translateY(-8px) scale(1.02);
    }

    /* Trigger ONLY the isolated border glow on hover */
    &:hover::after {
        opacity: 1;
        background: linear-gradient(115deg, transparent 20%, rgba(1, 209, 255, 0.25) 35%, rgba(255, 255, 255, 1) 50%, rgba(1, 209, 255, 0.25) 65%, transparent 80%);
        background-size: 200% 200%;
        animation: borderFlow 3s linear infinite;
    }

    @media only screen and (max-width: 768px) {
        padding: 14px 14px;
        gap: 10px;
        width: 300px;
    }
`

const Top = styled.div`
    width: 100%;
    display: flex;
    gap: 14px;
    align-items: flex-start;
`

const Image = styled.img`
    height: 52px;
    width: 52px;
    object-fit: cover;
    border-radius: 12px;
    margin-top: 2px;
    border: 1px solid rgba(189,46,46,0.25);
    background: rgba(7,25,47,0.8);
    transition: box-shadow 0.3s ease;

    ${Card}:hover & {
        box-shadow: 0 0 16px rgba(189, 46, 46, 0.4);
    }

    @media only screen and (max-width: 768px) {
        height: 40px;
        width: 40px;
    }
`

const Body = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2px;
`

const Name = styled.div`
    font-size: 18px;
    font-weight: 700;
    color: #f0f4ff;
    @media only screen and (max-width: 768px) { font-size: 14px; }
`

const Degree = styled.div`
    font-size: 14px;
    font-weight: 500;
    color: rgba(1, 209, 255, 0.85);
    @media only screen and (max-width: 768px) { font-size: 12px; }
`

const Date = styled.div`
    font-size: 12px;
    font-weight: 400;
    color: rgba(142, 168, 195, 0.7);
    @media only screen and (max-width: 768px) { font-size: 10px; }
`

const Grade = styled.div`
    font-size: 14px;
    font-weight: 600;
    color: #01d1ff;
    
    b {
        color: rgba(142, 168, 195, 0.85);
        font-weight: 500;
    }

    ${Card}:hover & {
        animation: ${gradeGlow} 2s ease-in-out infinite;
    }

    @media only screen and (max-width: 768px) { font-size: 12px; }
`

const Description = styled.div`
    width: 100%;
    font-size: 14px;
    font-weight: 400;
    color: rgba(180, 200, 230, 0.82);
    line-height: 1.6;
    @media only screen and (max-width: 768px) { font-size: 12px; }
`

const Span = styled.span`
    overflow: hidden;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;

    ${Card}:hover & {
        overflow: visible;
        -webkit-line-clamp: unset;
    }
`

const EducationCard = ({ education }) => {
    return (
        <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.02} transitionSpeed={2000} glareEnable={true} glareMaxOpacity={0.2} glarePosition="all" glareColor="#bd2e2e" style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        <Card className="glass-card">
            <Top>
                <Image src={education.img} alt={education.school} />
                <Body>
                    <Name>{education.school}</Name>
                    <Degree>{education.degree}</Degree>
                    <Date>{education.date}</Date>
                </Body>
            </Top>
            <Grade><b>Grade: </b>{education.grade}</Grade>
            <Description>
                <Span>{education.desc}</Span>
            </Description>
        </Card>
        </Tilt>
    )
}

export default EducationCard