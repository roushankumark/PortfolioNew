import styled, { keyframes } from 'styled-components'
import Tilt from 'react-parallax-tilt'

/* ── Animations ────────────────────────────────────────────── */
const borderFlow = keyframes`
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const liquidReflection = keyframes`
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
`;

const imageZoom = keyframes`
  from { transform: scale(1); }
  to   { transform: scale(1.07); }
`;

/* ── Card shell — glassmorphism ──────────────────────────── */
const Card = styled.div.attrs({ className: 'glass-box' })`
    width: 330px;
    min-height: 490px;
    background: rgba(255, 255, 255, 0.03); /* iPhone liquid glass */
    backdrop-filter: blur(25px) saturate(200%);
    -webkit-backdrop-filter: blur(25px) saturate(200%);
    border: 1px solid rgba(255, 255, 255, 0.1);
    cursor: pointer;
    border-radius: 28px;
    overflow: hidden;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0;
    position: relative;
    transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1),
                box-shadow 0.5s ease,
                background 0.5s ease,
                border-color 0.5s ease;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.3);

    /* Inner white reflection */
    &::after {
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
    &::before {
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
    &:hover::before {
        opacity: 1;
        background: linear-gradient(115deg, transparent 20%, rgba(1, 209, 255, 0.25) 35%, rgba(255, 255, 255, 1) 50%, rgba(1, 209, 255, 0.25) 65%, transparent 80%);
        background-size: 200% 200%;
        animation: ${borderFlow} 3s linear infinite;
    }
`

/* ── Image container with overflow clip for zoom ─────────── */
const ImageWrap = styled.div`
    width: 100%;
    height: 190px;
    overflow: hidden;
    border-radius: 18px 18px 0 0;
    position: relative;
`

const Image = styled.img`
    width: 100%;
    height: 190px;
    object-fit: cover;
    transition: transform 0.5s cubic-bezier(0.4,0,0.2,1);
    display: block;

    ${Card}:hover & {
        transform: scale(1.09);
    }
`

/* ── Image overlay on hover ──────────────────────────────── */
const ImageOverlay = styled.div`
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 30%, rgba(7,25,47,0.7) 100%);
    opacity: 0;
    transition: opacity 0.3s ease;

    ${Card}:hover & {
        opacity: 1;
    }
`

/* ── Content area ────────────────────────────────────────── */
const Content = styled.div`
    padding: 18px 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    flex: 1;
`

const Tags = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 6px;
`

const Tag = styled.span`
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.3px;
    color: #01d1ff;
    background: rgba(1, 209, 255, 0.1);
    border: 1px solid rgba(1, 209, 255, 0.25);
    padding: 3px 10px;
    border-radius: 20px;
    transition: background 0.25s ease, box-shadow 0.25s ease;

    ${Card}:hover & {
        background: rgba(1, 209, 255, 0.18);
        box-shadow: 0 0 8px rgba(1, 209, 255, 0.3);
    }
`

const Title = styled.div`
    font-size: 18px;
    font-weight: 700;
    color: #f0f4ff;
    overflow: hidden;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
`

const Date = styled.div`
    font-size: 11px;
    margin-left: 1px;
    font-weight: 500;
    color: rgba(142, 168, 195, 0.7);
`

const Description = styled.div`
    font-size: 14px;
    font-weight: 400;
    color: rgba(180, 200, 230, 0.8);
    overflow: hidden;
    display: -webkit-box;
    max-width: 100%;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    line-height: 1.55;
`

const Members = styled.div`
    display: flex;
    align-items: center;
    padding-left: 6px;
    margin-top: auto;
    padding-top: 8px;
`

const Avatar = styled.img`
    width: 34px;
    height: 34px;
    border-radius: 50%;
    margin-left: -8px;
    object-fit: cover;
    border: 2px solid rgba(1, 209, 255, 0.4);
    box-shadow: 0 0 8px rgba(1, 209, 255, 0.2);
    transition: box-shadow 0.25s ease;

    ${Card}:hover & {
        box-shadow: 0 0 14px rgba(1, 209, 255, 0.45);
    }
`

const ProjectCards = ({ project, setOpenModal }) => {
    return (
        <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} scale={1.02} transitionSpeed={2000} glareEnable={true} glareMaxOpacity={0.2} glarePosition="all" glareColor="#01d1ff" style={{ height: '100%' }}>
            <Card className="glass-card" onClick={() => setOpenModal({ state: true, project: project })}>
            <ImageWrap>
                <Image src={project.image} alt={project.title} />
                <ImageOverlay />
            </ImageWrap>
            <Content>
                <Tags>
                    {project.tags?.map((tag, i) => <Tag key={i}>{tag}</Tag>)}
                </Tags>
                <Title>{project.title}</Title>
                <Date>{project.date}</Date>
                <Description>{project.description}</Description>
                <Members>
                    {project.member?.map((member, i) => (
                        <Avatar key={i} src={member.img} alt="member" />
                    ))}
                </Members>
            </Content>
        </Card>
        </Tilt>
    )
}

export default ProjectCards