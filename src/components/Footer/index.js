import styled from 'styled-components';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import { Bio } from '../../data/constants';

const FooterContainer = styled.div`
  width: 100%;
  padding: 3rem 0;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 10;
  
  /* Glass footer backdrop */
  background: rgba(7, 25, 47, 0.45);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
  border-top: 1px solid rgba(1, 209, 255, 0.12);
  margin-top: 40px;
`;


const FooterWrapper = styled.footer`
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: center;
  padding: 1rem;
  color: #f0f4ff;
`;

const Logo = styled.h1`
  font-weight: 700;
  font-size: 24px;
  color: #01d1ff;
  letter-spacing: 0.5px;
  text-shadow: 0 0 16px rgba(1, 209, 255, 0.35);
`;

const Nav = styled.nav`
  width: 100%;
  max-width: 800px;
  margin-top: 0.5rem;
  display: flex;
  flex-direction: row;
  gap: 2.5rem;
  justify-content: center;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    gap: 1.5rem;
    text-align: center;
    font-size: 13px;
  }
`;

const NavLink = styled.a`
  color: rgba(240, 244, 255, 0.85);
  text-decoration: none;
  font-size: 1.15rem;
  font-weight: 500;
  transition: color 0.3s ease, text-shadow 0.3s ease;
  
  &:hover {
    color: #01d1ff;
    text-shadow: 0 0 8px rgba(1, 209, 255, 0.4);
  }
  @media (max-width: 768px) {
    font-size: 1.05rem;
  }
`;

const SocialMediaIcons = styled.div`
  display: flex;
  margin-top: 1.5rem;
  gap: 24px;
`;

const SocialMediaIcon = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  font-size: 1.5rem;
  color: #f0f4ff;
  background: rgba(1, 209, 255, 0.05);
  border: 1px solid rgba(1, 209, 255, 0.15);
  transition: all 0.3s ease;
  
  &:hover {
    color: #01d1ff;
    background: rgba(1, 209, 255, 0.15);
    border-color: #01d1ff;
    box-shadow: 0 0 16px rgba(1, 209, 255, 0.3);
    transform: translateY(-4px);
  }
`;

const Copyright = styled.p`
  margin-top: 2rem;
  font-size: 0.9rem;
  color: rgba(142, 168, 195, 0.7);
  text-align: center;
  font-weight: 500;
`;

function Footer() {
  return (
    <FooterContainer>
      <FooterWrapper>
        <Logo>Roushan Kumar</Logo>
        <Nav>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#skills">Skills</NavLink>
          <NavLink href="#experience">Experience</NavLink>
          <NavLink href="#projects">Projects</NavLink>
          <NavLink href="#education">Education</NavLink>
        </Nav>
        <SocialMediaIcons>
          <SocialMediaIcon href={Bio.facebook} target="display" aria-label="Facebook"><FacebookIcon /></SocialMediaIcon>
          <SocialMediaIcon href={Bio.twitter} target="display" aria-label="Twitter"><TwitterIcon /></SocialMediaIcon>
          <SocialMediaIcon href={Bio.linkedin} target="display" aria-label="LinkedIn"><LinkedInIcon /></SocialMediaIcon>
          <SocialMediaIcon href={Bio.insta} target="display" aria-label="Instagram"><InstagramIcon /></SocialMediaIcon>
        </SocialMediaIcons>
        <Copyright>
          &copy; {new Date().getFullYear()} Roushan Kumar. All rights reserved.
        </Copyright>
      </FooterWrapper>
    </FooterContainer>
  );
}

export default Footer;