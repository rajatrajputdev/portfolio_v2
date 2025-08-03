import React from 'react';
import styled from 'styled-components';
import HeroSection from './sections/HeroSection';
import ExperienceSection from './sections/ExperienceSection';
import ProjectsSection from './sections/ProjectsSection';
import ContactSection from './sections/ContactSection';
const PortfolioContainer = styled.div`
  background-color: var(--darker-bg);
`;
const Portfolio = () => {
  return (
    <PortfolioContainer>
      <HeroSection />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </PortfolioContainer>
  );
};

export default Portfolio;