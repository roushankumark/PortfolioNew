import React from 'react'
import { useState } from 'react'
import { Container, Wrapper, Title, Desc, CardContainer, ToggleButtonGroup, ToggleButton, Divider } from './ProjectsStyle'
import ProjectCard from '../Cards/ProjectCards'
import { projects } from '../../data/constants'


const Projects = ({openModal,setOpenModal}) => {
  const [toggle, setToggle] = useState('all');
  return (
    <Container id="projects">
      <Wrapper>
        <Title>Projects</Title>
        <Desc>
        I have worked on a variety of projects and continue to develop new ones, constantly enhancing my skills and expanding my expertise.
        </Desc>
        <ToggleButtonGroup >
          <ToggleButton active={toggle === 'all'} onClick={() => setToggle('all')}>All</ToggleButton>
          <Divider />
          <ToggleButton active={toggle === 'web app'} onClick={() => setToggle('web app')}>WEB APPS</ToggleButton>
          <Divider />
          <ToggleButton active={toggle === 'android app'} onClick={() => setToggle('android app')}>ANDROID APPS</ToggleButton>
          <Divider />
          <ToggleButton active={toggle === 'machine learning'} onClick={() => setToggle('machine learning')}>MACHINE LEARNING</ToggleButton>
        </ToggleButtonGroup>
        <CardContainer>
          {toggle === 'all' && projects
            .map((project, index) => (
              <ProjectCard key={index} project={project} openModal={openModal} setOpenModal={setOpenModal}/>
            ))}
          {projects
            .filter((item) => item.category === toggle)
            .map((project, index) => (
              <ProjectCard key={index} project={project} openModal={openModal} setOpenModal={setOpenModal}/>
            ))}
        </CardContainer>
      </Wrapper>
    </Container>
  )
}

export default Projects