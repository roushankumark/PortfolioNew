import React, { useRef } from 'react'
import styled, { keyframes } from 'styled-components'
import Tilt from 'react-parallax-tilt'
import emailjs from '@emailjs/browser';
import { Snackbar } from '@mui/material';
import Magnetic from '../Magnetic';

const liquidReflection = keyframes`
  0% { background-position: 0% 0%; }
  50% { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
`;

const liquidBorderGlow = keyframes`
  0%, 100% { 
    border-color: rgba(1, 209, 255, 0.5);
    box-shadow: 12px 12px 30px -5px rgba(1, 209, 255, 0.5), -12px -12px 20px -5px rgba(255, 255, 255, 0.3); 
  }
  25% { 
    border-color: rgba(255, 255, 255, 0.6);
    box-shadow: -12px 12px 30px -5px rgba(1, 209, 255, 0.5), 12px -12px 20px -5px rgba(255, 255, 255, 0.3); 
  }
  50% { 
    border-color: rgba(1, 209, 255, 0.5);
    box-shadow: -12px -12px 30px -5px rgba(1, 209, 255, 0.5), 12px 12px 20px -5px rgba(255, 255, 255, 0.3); 
  }
  75% { 
    border-color: rgba(255, 255, 255, 0.6);
    box-shadow: 12px -12px 30px -5px rgba(1, 209, 255, 0.5), -12px 12px 20px -5px rgba(255, 255, 255, 0.3); 
  }
`;

/* ── Animations ─────────────────────────────────────────── */
const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const shineSweep = keyframes`
  0%   { left: -100%; }
  60%  { left: 130%; }
  100% { left: 130%; }
`;

/* ── Layout ──────────────────────────────────────────────── */
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 60px 16px 80px;
`

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1350px;
  gap: 16px;
`

const Title = styled.div`
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

const Desc = styled.div`
  font-size: 17px;
  text-align: center;
  max-width: 580px;
  color: rgba(142, 168, 195, 0.9);
  line-height: 1.6;

  @media (max-width: 768px) {
    margin-top: 12px;
    font-size: 15px;
  }
`

/* ── Glass contact form ──────────────────────────────────── */
const ContactForm = styled.form.attrs({ className: 'glass-box' })`
  width: 95%;
  maxWidth: 620px;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.03); /* iPhone glass */
  backdrop-filter: blur(25px) saturate(200%);
  -webkit-backdrop-filter: blur(25px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 36px 40px;
  border-radius: 28px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.3);
  margin-top: 28px;
  gap: 14px;
  animation: ${fadeUp} 0.7s ease 0.15s both;
  position: relative;
  transition: transform 0.5s cubic-bezier(0.2, 0.8, 0.2, 1);

  /* Outer liquid glass edge glow - separate hovering layer */
  &::before {
    content: '';
    position: absolute;
    inset: -2px; /* Outside of the border to glow purely externally */
    border-radius: 30px; /* Matching border radius perfectly */
    border: 2px solid transparent; /* Replaced on hover */
    background: transparent;
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
    z-index: 20;
  }

  /* Inner white reflection stays identically the same before/after hover */
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
  }

  &:hover {
    transform: translateY(-8px) scale(1.02);
  }

  &:hover::before {
    opacity: 1;
    animation: ${liquidBorderGlow} 5s linear infinite;
  }
`

const ContactTitle = styled.div`
  font-size: 24px;
  margin-bottom: 4px;
  font-weight: 700;
  color: #f0f4ff;
  display: flex;
  align-items: center;
  gap: 8px;
`

const ContactInput = styled.input`
  flex: 1;
  background: rgba(1, 209, 255, 0.04);
  border: 1px solid rgba(1, 209, 255, 0.18);
  outline: none;
  font-size: 16px;
  color: #f0f4ff;
  border-radius: 12px;
  padding: 13px 18px;
  font-family: inherit;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;

  &::placeholder { color: rgba(142, 168, 195, 0.55); }

  &:focus {
    border-color: rgba(1, 209, 255, 0.55);
    box-shadow: 0 0 0 3px rgba(1,209,255,0.1);
    background: rgba(1, 209, 255, 0.07);
  }
`

const ContactInputMessage = styled.textarea`
  flex: 1;
  background: rgba(1, 209, 255, 0.04);
  border: 1px solid rgba(1, 209, 255, 0.18);
  outline: none;
  font-size: 16px;
  color: #f0f4ff;
  border-radius: 12px;
  padding: 13px 18px;
  font-family: inherit;
  resize: vertical;
  min-height: 110px;
  transition: border-color 0.25s ease, box-shadow 0.25s ease;

  &::placeholder { color: rgba(142, 168, 195, 0.55); }

  &:focus {
    border-color: rgba(1, 209, 255, 0.55);
    box-shadow: 0 0 0 3px rgba(1,209,255,0.1);
    background: rgba(1, 209, 255, 0.07);
  }
`

/* ── CTA send button with shine sweep ───────────────────── */
const ContactButton = styled.input`
  width: 100%;
  text-align: center;
  background: linear-gradient(135deg, rgba(1,209,255,0.25) 0%, rgba(189,46,46,0.2) 100%);
  border: 1.5px solid rgba(1, 209, 255, 0.5);
  padding: 14px 16px;
  margin-top: 4px;
  border-radius: 12px;
  color: #f0f4ff;
  font-size: 17px;
  font-weight: 700;
  cursor: pointer;
  font-family: inherit;
  letter-spacing: 0.4px;
  position: relative;
  overflow: hidden;
  transition: transform 0.25s ease,
              box-shadow 0.25s ease,
              background 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 0 28px rgba(1,209,255,0.35),
                0 8px 24px rgba(0,0,0,0.3);
    background: linear-gradient(135deg, rgba(1,209,255,0.38) 0%, rgba(189,46,46,0.28) 100%);
  }

  &:active { transform: translateY(1px); }
`

const Contact = () => {
  const [open, setOpen] = React.useState(false);
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_9rt2a7o', 'template_x26jykm', form.current, '6NyNNu7zdq0ErMTq5')
      .then((result) => {
        setOpen(true);
        form.current.reset();
      }, (error) => {
        console.log(error.text);
      });
  }

  return (
    <Container id="contact">
      <Wrapper>
        <Title>Contact</Title>
        <Desc>Feel free to contact me with any questions or opportunities!</Desc>
        <Tilt tiltMaxAngleX={5} tiltMaxAngleY={5} scale={1.01} transitionSpeed={2000} glareEnable={true} glareMaxOpacity={0.15} glareColor="#01d1ff" style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
        <ContactForm ref={form} onSubmit={handleSubmit}>
          <ContactTitle>Email Me 🚀</ContactTitle>
          <ContactInput placeholder="Your Email" name="from_email" />
          <ContactInput placeholder="Your Name" name="from_name" />
          <ContactInput placeholder="Subject" name="subject" />
          <ContactInputMessage placeholder="Message" rows="4" name="message" />
          <Magnetic pull={0.15}>
            <ContactButton type="submit" value="Send Message" />
          </Magnetic>
        </ContactForm>
        </Tilt>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          message="Email sent successfully! ✅"
          severity="success"
        />
      </Wrapper>
    </Container>
  )
}

export default Contact