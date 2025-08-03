import { motion } from 'framer-motion';
import styled from 'styled-components';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const ExperienceContainer = styled.section`
  min-height: 100vh;
  padding: 100px 20px;
  background: var(--dark-bg);
  position: relative;
`;

const TimelineContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const TimelineItem = styled(motion.div)`
  display: flex;
  gap: 2rem;
  position: relative;
  padding: 1rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const TimelineMeta = styled.div`
  flex: 1;
  text-align: right;
  padding: 1.5rem;
  position: relative;
  
  @media (max-width: 768px) {
    text-align: left;
    padding: 0;
  }
`;

const TimelineContent = styled(motion.div)`
  flex: 2;
  background: var(--darker-bg);
  padding: 2rem;
  border-radius: 16px;
  position: relative;
  border: 1px solid rgba(0, 255, 149, 0.1);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transform-style: preserve-3d;
  perspective: 1000px;

  &:before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 16px;
    padding: 2px;
    background: linear-gradient(45deg, transparent, rgba(0, 255, 149, 0.1), transparent);
    mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }

  @media (max-width: 768px) {
    flex: 1;
  }
`;

const TimelineYear = styled(motion.span)`
  font-size: 3rem;
  font-weight: bold;
  color: var(--accent);
  opacity: 0.5;
  line-height: 1;
  font-family: 'Space Grotesk', sans-serif;
  display: block;
  margin-bottom: 0.5rem;
  
  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const TimelineDuration = styled.span`
  color: var(--text-secondary);
  font-size: 0.9rem;
  display: block;
  font-family: 'Fira Code', monospace;
`;

const HighlightsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 1rem 0 0 0;
`;

const HighlightItem = styled(motion.li)`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin: 0.5rem 0;
  padding-left: 1.5rem;
  position: relative;

  &:before {
    content: '→';
    position: absolute;
    left: 0;
    color: var(--accent);
  }
`;

const TimelineTitle = styled.h3`
  color: var(--accent);
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;

const TimelineRole = styled.h4`
  color: var(--text-primary);
  font-size: 1rem;
  margin-bottom: 1rem;
`;

const TimelineDate = styled.span`
  color: var(--text-secondary);
  font-size: 0.9rem;
  margin-bottom: 1rem;
  display: block;
`;

const TimelineDescription = styled.p`
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.6;
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

const experiences = [
  {
    year: "2024",
    company: "Tech Innovations Inc.",
    role: "Senior Full Stack Developer",
    duration: "Jan 2024 - Present",
    description: "Led development of cloud-native applications using microservices architecture. Implemented CI/CD pipelines and mentored junior developers.",
    highlights: [
      "Architected and deployed microservices using Docker and Kubernetes",
      "Improved system performance by 40% through optimization",
      "Mentored team of 5 junior developers"
    ]
  },
  {
    year: "2023",
    company: "DataViz Solutions",
    role: "Software Engineer",
    duration: "Mar 2023 - Dec 2023",
    description: "Developed data visualization tools and real-time analytics dashboards. Optimized database queries and implemented caching solutions.",
    highlights: [
      "Built real-time data visualization dashboard",
      "Reduced query response time by 60%",
      "Implemented Redis caching layer"
    ]
  },
  {
    year: "2022",
    company: "StartupX",
    role: "Frontend Developer",
    duration: "Jun 2022 - Feb 2023",
    description: "Built responsive web applications using React and Next.js. Implemented state management solutions and optimized application performance.",
    highlights: [
      "Developed responsive UI components library",
      "Improved load time by 50%",
      "Implemented CI/CD pipeline"
    ]
  }
];

export default function ExperienceSection() {
  const containerRef = useRef(null);

  return (
    <ExperienceContainer id="experience" ref={containerRef}>
      <SectionTitle>Experience</SectionTitle>
      <TimelineContainer>
        {experiences.map((exp, index) => (
          <TimelineItem
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-50px" }}
          >
            <TimelineMeta>
              <TimelineYear>
                {exp.year}
              </TimelineYear>
              <TimelineDuration>{exp.duration}</TimelineDuration>
            </TimelineMeta>
            <TimelineContent
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true }}
            >
              <TimelineTitle>{exp.company}</TimelineTitle>
              <TimelineRole>{exp.role}</TimelineRole>
              <TimelineDescription>{exp.description}</TimelineDescription>
              <HighlightsList>
                {exp.highlights.map((highlight, i) => (
                  <HighlightItem
                    key={i}
                  >
                    {highlight}
                  </HighlightItem>
                ))}
              </HighlightsList>
            </TimelineContent>
          </TimelineItem>
        ))}
      </TimelineContainer>
    </ExperienceContainer>
  );
}
