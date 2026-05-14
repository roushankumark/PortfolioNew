import React from 'react'
import HeroBgAnimation from '../HeroBgAnimation'
import Magnetic from '../Magnetic'
import { HeroContainer, HeroBg, HeroLeftContainer, Img, HeroRightContainer, HeroInnerContainer, TextLoop, Title, Span, SubTitle,SocialMediaIcons,SocialMediaIcon, ResumeButton, ProfileOrbWrapper, SpinShineRing, CrystalHalo, OuterEnergyRing, OrbitPathRing, RippleCircle, OrbiterContainer, OrbitingCrystal, OrbitingComet } from './HeroStyle'
import HeroImg from '../../images/HeroImage.png'
import Typewriter from 'typewriter-effect';
import { Bio } from '../../data/constants';
import { motion } from 'framer-motion';

const HeroSection = () => {
    return (
        <div id="about">
            <HeroContainer>
                <HeroBg>
                    <HeroBgAnimation />
                </HeroBg>
                <HeroInnerContainer >
                    <HeroLeftContainer id="Left">
                        <Title>Hi, I am <br /> {Bio.name}</Title>
                        <TextLoop>
                            I am a
                            <Span>
                                <Typewriter
                                    options={{
                                        strings: Bio.roles,
                                        autoStart: true,
                                        loop: true,
                                    }}
                                />
                            </Span>
                        </TextLoop>
                        <SubTitle>{Bio.description}</SubTitle>
                        <Magnetic>
                            <ResumeButton href={Bio.resume} target='display'>Check Resume</ResumeButton>
                        </Magnetic>
                    </HeroLeftContainer>

                    <HeroRightContainer id="Right">
                        <ProfileOrbWrapper>
                            <SpinShineRing
                                animate={{ rotate: 360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            />
                            <CrystalHalo />
                            <OuterEnergyRing />
                            <OrbitPathRing />
                            <RippleCircle />
                            
                            <OrbiterContainer duration="12s">
                                <OrbitingComet />
                            </OrbiterContainer>
                            <OrbiterContainer duration="8s" reverse>
                                <OrbitingCrystal size="6px" />
                            </OrbiterContainer>
                            <OrbiterContainer duration="16s" style={{ transform: 'rotate(45deg)' }}>
                                <OrbitingCrystal size="10px" />
                            </OrbiterContainer>
                            <OrbiterContainer duration="20s" reverse style={{ transform: 'rotate(-30deg)' }}>
                                <OrbitingCrystal size="4px" />
                            </OrbiterContainer>
                            
                            <Img src={HeroImg} alt="hero-image" />
                        </ProfileOrbWrapper>
                    </HeroRightContainer>
                </HeroInnerContainer>

            </HeroContainer>
        </div>
    )
}

export default HeroSection