import styled, { keyframes } from 'styled-components';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

export const Container = styled.div`
    background: transparent;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    z-index: 1;
    align-items: center;
    padding: 60px 16px;
`;

export const Wrapper = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: column;
    width: 100%;
    max-width: 1350px;
    padding: 10px 0px 80px 0;
    gap: 16px;
`;

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
`;

export const Desc = styled.div`
    font-size: 17px;
    text-align: center;
    max-width: 580px;
    color: rgba(142, 168, 195, 0.9);
    line-height: 1.6;

    @media (max-width: 768px) {
        margin-top: 12px;
        font-size: 15px;
    }
`;

/* ── Filter toggle group ─────────────────────────────────── */
export const ToggleButtonGroup = styled.div`
    display: flex;
    background: rgba(7, 25, 47, 0.55);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(1, 209, 255, 0.2);
    color: #01d1ff;
    font-size: 14px;
    border-radius: 14px;
    font-weight: 600;
    margin: 16px 0px;
    overflow: hidden;
    letter-spacing: 0.3px;

    @media (max-width: 768px) { font-size: 11px; }
`;

export const ToggleButton = styled.div`
    padding: 10px 20px;
    cursor: pointer;
    transition: background 0.25s ease, color 0.25s ease;
    border-radius: 0;

    ${({ active }) => active && `
        background: rgba(1, 209, 255, 0.15);
        color: #01d1ff;
        box-shadow: inset 0 0 12px rgba(1,209,255,0.12);
    `}

    &:hover {
        background: rgba(1, 209, 255, 0.1);
    }

    @media (max-width: 768px) {
        padding: 8px 10px;
    }
`;

export const Divider = styled.div`
    width: 1px;
    background: rgba(1, 209, 255, 0.2);
    align-self: stretch;
`;

export const CardContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    gap: 28px;
    flex-wrap: wrap;
    padding: 0 8px;
`;
