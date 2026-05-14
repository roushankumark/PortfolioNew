import { Link as LinkR } from 'react-router-dom';
import styled from 'styled-components';

/* ── Glassmorphism Sticky Navbar ─────────────────────────── */
export const Nav = styled.div`
    background: rgba(255, 255, 255, 0.05); /* iPhone style glass */
    backdrop-filter: blur(30px) saturate(180%);
    -webkit-backdrop-filter: blur(30px) saturate(180%);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    height: 72px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    position: sticky;
    top: 0;
    z-index: 100;
    transition: background 0.5s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.08);
    }
`;

export const NavbarContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    z-index: 1;
    width: 100%;
    padding: 0 28px;
    max-width: 1200px;
`;

export const NavLogo = styled(LinkR)`
    width: 80%;
    padding: 0 6px;
    display: flex;
    justify-content: start;
    align-items: center;
    text-decoration: none;
    @media (max-width: 640px) {
        padding: 0;
    }
`;

export const Span = styled.div`
    padding: 0 6px;
    font-weight: 700;
    font-size: 19px;
    color: #f0f4ff;
    letter-spacing: 0.3px;
`;

export const NavItems = styled.ul`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 36px;
    padding: 0 6px;
    list-style: none;

    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const NavLink = styled.a`
    color: rgba(240, 244, 255, 0.78);
    font-weight: 500;
    font-size: 15px;
    cursor: pointer;
    transition: color 0.2s ease;
    text-decoration: none;
    letter-spacing: 0.2px;
    position: relative;

    &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 0;
        height: 2px;
        background: ${({ theme }) => theme.primary};
        transition: width 0.25s ease;
        border-radius: 2px;
    }

    &:hover {
        color: ${({ theme }) => theme.primary};
        &::after { width: 100%; }
    }
`;

export const GitHubButton = styled.a`
    border: 1px solid rgba(255, 255, 255, 0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 38px;
    border-radius: 50px; /* Pill shape */
    color: #fff;
    cursor: pointer;
    padding: 0 20px;
    font-weight: 600;
    text-decoration: none;
    font-size: 14px;
    letter-spacing: 0.3px;
    background: rgba(255, 255, 255, 0.12);
    backdrop-filter: blur(20px) saturate(180%);
    -webkit-backdrop-filter: blur(20px) saturate(180%);
    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.3);
    transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1), background 0.5s ease, box-shadow 0.5s ease;

    &:hover {
        background: rgba(255, 255, 255, 0.22);
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15), inset 0 1px 2px rgba(255, 255, 255, 0.5);
        transform: translateY(-2px) scale(1.02);
    }

    &:active {
        transform: translateY(1px) scale(0.96); /* Liquid press */
        background: rgba(255, 255, 255, 0.15);
    }
`;

export const ButtonContainer = styled.div`
    width: 80%;
    height: 100%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 6px;
    @media screen and (max-width: 768px) {
        display: none;
    }
`;

export const MobileIcon = styled.div`
    display: none;
    @media screen and (max-width: 768px) {
        display: block;
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(-100%, 60%);
        font-size: 1.5rem;
        cursor: pointer;
        color: ${({ theme }) => theme.text_primary};
    }
`;

export const MobileMenu = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 16px;
    position: absolute;
    top: 72px;
    right: 0;
    width: 100%;
    padding: 16px 40px 28px 40px;
    background: rgba(30, 41, 59, 0.85); /* Apple dark menu style */
    backdrop-filter: blur(30px) saturate(180%);
    -webkit-backdrop-filter: blur(30px) saturate(180%);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);
    transform: ${({ isOpen }) => (isOpen ? 'translateY(0)' : 'translateY(-110%)')};
    border-radius: 0 0 32px 32px;
    box-shadow: 0 16px 40px rgba(0, 0, 0, 0.25);
    opacity: ${({ isOpen }) => (isOpen ? '1' : '0')};
    z-index: ${({ isOpen }) => (isOpen ? '200' : '-1')};
`;

export const MobileMenuItems = styled.ul`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;
    list-style: none;
    width: 100%;
    height: 100%;
`;

export const MobileLink = styled.a`
    color: rgba(240, 244, 255, 0.85);
    font-weight: 500;
    cursor: pointer;
    transition: color 0.2s ease;
    text-decoration: none;
    font-size: 15px;
    &:hover {
        color: ${({ theme }) => theme.primary};
    }
`;

export const MobileNavLogo = styled(LinkR)`
    width: 80%;
    padding: 0 6px;
    display: flex;
    justify-content: start;
    align-items: center;
    text-decoration: none;
    @media (max-width: 640px) {
        padding: 0;
    }
`;

export const MobileMenuLink = styled(LinkR)`
    color: ${({ theme }) => theme.text_primary};
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    text-decoration: none;
    &:hover {
        color: ${({ theme }) => theme.primary};
    }
`;