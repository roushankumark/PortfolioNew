import React from 'react'
import styled, { keyframes } from 'styled-components'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import { education } from '../../data/constants';
import EducationCard from '../Cards/EducationCard';

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
    padding: 0px 16px 80px;

    @media (max-width: 960px) {
        padding: 0px 16px;
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
    padding: 40px 0px 0px 0px;
    gap: 16px;
`;

const Title = styled.div`
    font-size: 44px;
    text-align: center;
    font-weight: 700;
    color: #f0f4ff;
    letter-spacing: -0.5px;
    text-shadow: 0 0 40px rgba(189,46,46,0.25);
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

    @media (max-width: 660px) {
        align-items: flex-end;
    }
`;

const StyledTimelineDot = styled(TimelineDot)`
    border-color: #bd2e2e !important;
    background-color: rgba(189, 46, 46, 0.1) !important;
    box-shadow: 0 0 12px rgba(189, 46, 46, 0.4);
`;

const StyledTimelineConnector = styled(TimelineConnector)`
    background: linear-gradient(180deg, #bd2e2e 0%, rgba(189,46,46,0.1) 100%) !important;
`;

const Education = () => {
    return (
        <Container id="education">
            <Wrapper>
                <Title>Education</Title>
                <Desc>
                    My education has been a journey of learning, helping me find new interests and build important skills. Here’s a quick look at my academic background.
                </Desc>
                <TimelineSection>
                    <Timeline>
                        {education.map((edu, index) => (
                            <TimelineItem key={index}>
                                <TimelineContent sx={{ py: '14px', px: 2 }}>
                                    <EducationCard education={edu} />
                                </TimelineContent>
                                <TimelineSeparator>
                                    <StyledTimelineDot variant="outlined" />
                                    {index !== education.length - 1 && <StyledTimelineConnector />}
                                </TimelineSeparator>
                            </TimelineItem>
                        ))}
                    </Timeline>
                </TimelineSection>
            </Wrapper>
        </Container>
    )
}

export default Education