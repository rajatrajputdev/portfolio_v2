import { motion } from 'framer-motion';
import styled from 'styled-components';
import portfolioData from '../../config';

const ProjectsContainer = styled.section`
  min-height: 100vh;
  padding: 100px 20px;
  background: var(--darker-bg);
  position: relative;
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
`;

const ProjectCard = styled(motion.div)`
  background: var(--dark-bg);
  border-radius: 12px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  cursor: pointer;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transform-style: preserve-3d;
  perspective: 1000px;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, transparent, rgba(0, 255, 149, 0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0.5s ease;
  }

  &:hover:before {
    transform: translateX(100%);
  }

  h3 {
    color: var(--accent);
    margin-bottom: 1rem;
    font-size: 1.5rem;
    position: relative;
    display: inline-block;
    
    &:after {
      content: '';
      position: absolute;
      bottom: -4px;
      left: 0;
      width: 0;
      height: 2px;
      background: var(--accent);
      transition: width 0.3s ease;
    }
  }

  &:hover h3:after {
    width: 100%;
  }

  p {
    color: var(--text-secondary);
    font-size: 0.9rem;
    margin-bottom: 1rem;
    line-height: 1.6;
  }
`;

const TechTag = styled.span`
  display: inline-block;
  background: rgba(0, 255, 149, 0.1);
  color: var(--accent);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  margin-right: 0.5rem;
  margin-bottom: 0.5rem;
`;

const SectionTitle = styled.h2`
  font-size: clamp(2rem, 5vw, 3rem);
  color: var(--text-primary);
  text-align: center;
  margin-bottom: 3rem;
  
  &:after {
    content: '';
    display: block;
    width: 100px;
    height: 4px;
    background: var(--accent);
    margin: 1rem auto;
  }
`;

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;

  ${ProjectCard}:hover & {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ProjectLink = styled.a`
  color: var(--accent);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  transition: var(--transition);

  &:hover {
    color: var(--text-primary);
  }
`;

const ProjectImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 1rem;
  filter: grayscale(100%);
  transition: all 0.3s ease;

  ${ProjectCard}:hover & {
    filter: grayscale(0%);
    transform: scale(1.02);
  }
`;

const projects = portfolioData.projects;

export default function ProjectsSection() {
  return (
    <ProjectsContainer id="projects">
      <SectionTitle>Featured Projects</SectionTitle>
      <ProjectsGrid>
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ 
              y: -10,
              rotateX: 5,
              rotateY: 5,
              scale: 1.02
            }}
          >
            <ProjectImage src={project.image} alt={project.title} />
            <h3>{project.title}</h3>
            <p>{project.description}</p>
            <div>
              {project.tech.map((tech, i) => (
                <TechTag key={i}>{tech}</TechTag>
              ))}
            </div>
            <ProjectLinks>
              <ProjectLink href={project.demo} target="_blank" rel="noopener noreferrer">
                Live Demo <span>→</span>
              </ProjectLink>
              <ProjectLink href={project.github} target="_blank" rel="noopener noreferrer">
                View Code <span>→</span>
              </ProjectLink>
            </ProjectLinks>
          </ProjectCard>
        ))}
      </ProjectsGrid>
    </ProjectsContainer>
  );
}
