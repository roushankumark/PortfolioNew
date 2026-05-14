import { ThemeProvider } from "styled-components";
import { useState } from "react";
import { darkTheme } from './utils/Themes.js'
import Navbar from "./components/Navbar";
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import HeroSection from "./components/HeroSection";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Experience from "./components/Experience";
import Education from "./components/Education";
import ProjectDetails from "./components/ProjectDetails";
import ParallaxAtmosphere from "./components/ParallaxAtmosphere";
import CustomCursor from "./components/CustomCursor";
import styled from "styled-components";

/* ── Page wrapper — sits above the fixed Vanta canvas ───── */
const PageWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  overflow-x: hidden;
  background: transparent;
`;

/* ── Section divider with slight colour accent ────────────── */
const SectionDivider = styled.div`
  width: 100%;
  background: linear-gradient(
    38.73deg,
    rgba(189, 46, 46, 0.08) 0%,
    rgba(1, 209, 255, 0.00) 50%
  ),
  linear-gradient(
    141.27deg,
    rgba(1, 209, 255, 0.00) 50%,
    rgba(1, 209, 255, 0.08) 100%
  );
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`;

function App() {
  const [openModal, setOpenModal] = useState({ state: false, project: null });

  return (
    <ThemeProvider theme={darkTheme}>
      <Router>
        <CustomCursor />
        {/* Fixed full-page deep immersive environment */}
        <ParallaxAtmosphere />

        {/* Sticky navbar */}
        <Navbar />

        {/* Scrollable content above the background */}
        <PageWrapper>
          <HeroSection />
          <SectionDivider>
            <Skills />
            <Experience />
          </SectionDivider>
          <Projects openModal={openModal} setOpenModal={setOpenModal} />
          <SectionDivider>
            <Education />
            <Contact />
          </SectionDivider>
          <Footer />
          {openModal.state && (
            <ProjectDetails openModal={openModal} setOpenModal={setOpenModal} />
          )}
        </PageWrapper>
      </Router>
    </ThemeProvider>
  );
}

export default App;
