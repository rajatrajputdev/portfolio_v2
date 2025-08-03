import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTerminal } from 'react-icons/fa';
import portfolioData from '../../config/portfolio.json'; // Adjust the import path as necessary
const NavContainer = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  padding: 1rem 2rem;
  background: rgba(10, 10, 10, 0.8);
  backdrop-filter: blur(10px);
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(motion.div)`
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--accent);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  svg {
    font-size: 1.2rem;
  }
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled(motion.a)`
  color: var(--text-primary);
  text-decoration: none;
  font-weight: 500;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -4px;
    left: 0;
    background: var(--accent);
    transition: var(--transition);
  }

  &:hover:after {
    width: 100%;
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const SocialLink = styled(motion.a)`
  color: var(--text-secondary);
  font-size: 1.2rem;
  transition: var(--transition);

  &:hover {
    color: var(--accent);
    transform: translateY(-2px);
  }
`;

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: var(--text-primary);
  font-size: 1.5rem;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: var(--dark-bg);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { name: 'Home', href: '#' },
    { name: 'Experience', href: '#experience' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <NavContainer>
      <NavContent>
        <Logo
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
        >
          <FaTerminal /> RAJAT
        </Logo>

        <NavLinks>
          {links.map((link) => (
            <NavLink
              key={link.name}
              href={link.href}
              whileHover={{ y: -2 }}
            >
              {link.name}
            </NavLink>
          ))}
        </NavLinks>

        <SocialLinks>
          <SocialLink 
            href={portfolioData.personal.github} 
            target="_blank"
            whileHover={{ scale: 1.1 }}
          >
            <FaGithub />
          </SocialLink>
          <SocialLink 
            href={portfolioData.personal.linkedin}
            target="_blank"
            whileHover={{ scale: 1.1 }}
          >
            <FaLinkedin />
          </SocialLink>
        </SocialLinks>

        <MenuButton onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          ☰
        </MenuButton>
      </NavContent>

      <AnimatePresence>
        {mobileMenuOpen && (
          <MobileMenu
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween' }}
          >
            {links.map((link) => (
              <NavLink
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </NavLink>
            ))}
          </MobileMenu>
        )}
      </AnimatePresence>
    </NavContainer>
  );
}
