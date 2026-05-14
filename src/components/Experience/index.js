import React from 'react'
import styled, { keyframes } from 'styled-components'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import ExperienceCard from '../Cards/ExperienceCard';
import { experiences } from '../../data/constants';

/* ── Animations ─────────────────────────────────────────── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    padding: 60px 16px 80px;

    @media (max-width: 960px) {
        padding: 40px 16px;
    }
`;

const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1350px;
    gap: 16px;
`;

const Title = styled.div`
    font-size: 44px;
    text-align: center;
    font-weight: 700;
    color: #f0f4ff;
    letter-spacing: -0.5px;
    text-shadow: 0 0 40px rgba(1,209,255,0.25);
    animation: ${fadeUp} 0.7s ease both;

    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 32px;
    }
`;

const Desc = styled.div`
    font-size: 17px;
    text-align: center;
    max-width: 580px;
    color: rgba(142, 168, 195, 0.9);
    line-height: 1.6;
    animation: ${fadeUp} 0.7s ease 0.1s both;

    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 15px;
    }
`;

const TimelineSection = styled.div`
    width: 100%;
    max-width: 1000px;
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;

    /* Animation delay for timeline loading */
    animation: ${fadeUp} 0.8s ease 0.2s both;
`;

const StyledTimelineDot = styled(TimelineDot)`
    border-color: #01d1ff !important;
    background-color: rgba(1, 209, 255, 0.1) !important;
    box-shadow: 0 0 12px rgba(1, 209, 255, 0.4);
`;

const StyledTimelineConnector = styled(TimelineConnector)`
    background: linear-gradient(180deg, #01d1ff 0%, rgba(1,209,255,0.1) 100%) !important;
`;

const Experience = () => {
    return (
        <Container id="experience">
            <Wrapper>
                <Title>Experience & Certifications</Title>
                <Desc>
                    I have successfully completed multiple courses and earned certifications, continuously enhancing my skills to build a strong foundation for my career development.
                </Desc>
                <TimelineSection>
                    <Timeline>
                        {experiences.map((experience, index) => (
                            <TimelineItem key={index}>
                                <TimelineSeparator>
                                    <StyledTimelineDot variant="outlined" />
                                    {index !== experiences.length - 1 && <StyledTimelineConnector />}
                                </TimelineSeparator>
                                <TimelineContent sx={{ py: '14px', px: 2 }}>
                                    <ExperienceCard experience={experience} />
                                </TimelineContent>
                            </TimelineItem>
                        ))}
                    </Timeline>
                </TimelineSection>
            </Wrapper>
        </Container>
    )
}

export default Experience