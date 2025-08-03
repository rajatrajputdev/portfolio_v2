import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaLinkedin, FaEnvelope } from 'react-icons/fa';
import portfolioData from '../../config/portfolio.json'; // Adjust the import path as necessary
const ContactContainer = styled.section`
  min-height: 50vh;
  padding: 100px 20px;
  background: var(--darker-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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

const ContactLinksContainer = styled.div`
  display: flex;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ContactLink = styled(motion.a)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 2rem;
  background: var(--dark-bg);
  border-radius: 8px;
  text-decoration: none;
  color: var(--text-primary);
  border: 1px solid rgba(0, 255, 149, 0.1);
  transition: var(--transition);

  svg {
    font-size: 1.5rem;
    color: var(--accent);
  }

  &:hover {
    border-color: var(--accent);
    transform: translateY(-2px);
  }
`;

const SubTitle = styled.p`
  color: var(--text-secondary);
  text-align: center;
  max-width: 600px;
  margin: 0 auto 2rem;
  font-size: 1.1rem;
  line-height: 1.6;
`;
const MadeWithLove = styled.p`
  margin-top: 3rem;
  font-size: 0.95rem;
  color: var(--text-secondary);
  text-align: center;

  span {
    color: var(--accent);
    font-size: 1.2rem;
  }
`;

export default function ContactSection() {
return (
  <ContactContainer id="contact">
    <SectionTitle>Get In Touch</SectionTitle>
    <SubTitle>
      Feel free to reach out for collaborations or just a friendly hello
    </SubTitle>
    <ContactLinksContainer>
      <ContactLink 
        href={portfolioData.personal.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaLinkedin />
        LinkedIn
      </ContactLink>
      <ContactLink 
        href={`mailto:${portfolioData.personal.email}`}
        whileHover={{ y: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaEnvelope />
        Email Me
      </ContactLink>
    </ContactLinksContainer>
    <MadeWithLove>
      Made with <span>❤️</span> by Rajat Rajput
    </MadeWithLove>
  </ContactContainer>
);

}
