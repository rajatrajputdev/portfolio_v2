import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleField from '../3d/ParticleField';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { SplitText } from 'gsap/SplitText';
import { getSectionData } from '../../config';

const LoadingContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: var(--darker-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  font-family: 'Fira Code', monospace;
`;

const LoadingContent = styled.div`
  text-align: left;
  color: #00ff95;
  width: 300px;
`;

const LoadingLine = styled.div`
  margin: 5px 0;
  &:before {
    content: "$ ";
  }
`;

const LoadingBar = styled.div`
  width: 300px;
  height: 2px;
  background: #1a1a1a;
  margin-top: 20px;
  position: relative;
  overflow: hidden;
  
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 40%;
    height: 100%;
    background: #00ff95;
    animation: load 1s infinite ease-in-out;
    box-shadow: 0 0 10px #00ff95;
  }

  @keyframes load {
    0% { transform: translateX(-100%) }
    100% { transform: translateX(350%) }
  }
`;

const Cursor = styled.span`
  display: inline-block;
  width: 8px;
  height: 1rem;
  background: #00ff95;
  margin-left: 2px;
  animation: blink 1s infinite;

  @keyframes blink {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
`;

const HeroContainer = styled.section`
  min-height: 100vh;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: calc(80px + 2rem) 0 40px;
  
  @media (max-width: 768px) {
    padding-top: calc(70px + 1.5rem);
  }
`;

const BackgroundWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.8;
  canvas {
    width: 100% !important;
    height: 100% !important;
  }
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 800px;
  padding: 0 20px;
  width: 100%;
  
  @media (max-width: 480px) {
    padding: 0 16px;
  }
`;

const Title = styled(motion.h1)`
  font-size: clamp(2.5rem, 8vw, 6rem);
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.1;
  opacity: 0;
  position: relative;
  
  /* Always show solid color as base - this ensures text is ALWAYS visible */
  color: #00ff95;
  text-shadow: 0 0 30px rgba(0, 255, 149, 0.4);
  
  /* Try to apply gradient as enhancement, but with multiple fallback layers */
  background: linear-gradient(45deg, #ffffff 0%, #00ff95 100%);
  background-size: 100% 100%;
  
  /* Modern browsers gradient text */
  @supports (background-clip: text) or (-webkit-background-clip: text) {
    -webkit-background-clip: text;
    background-clip: text;
    
    /* Only make text transparent if we're confident gradient will work */
    @media (min-width: 0px) {
      -webkit-text-fill-color: transparent;
      color: transparent;
      
      /* Backup color in case transparent fails */
      &::after {
        content: attr(data-text);
        position: absolute;
        top: 0;
        left: 0;
        color: #00ff95;
        background: none;
        -webkit-text-fill-color: #00ff95;
        z-index: -1;
        opacity: 0;
        transition: opacity 0.1s;
      }
      
      /* Show backup if main text becomes invisible */
      &:not([style*="color: transparent"]) {
        &::after {
          opacity: 1;
        }
      }
    }
  }
  
  /* Force solid color for older browsers and problematic cases */
  @supports not (background-clip: text) and not (-webkit-background-clip: text) {
    background: none !important;
    color: #00ff95 !important;
    -webkit-text-fill-color: #00ff95 !important;
  }
  
  /* Additional safety nets for specific browsers */
  
  /* Internet Explorer / Edge Legacy */
  @media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {
    background: none !important;
    color: #00ff95 !important;
  }
  
  /* Firefox fallback */
  @-moz-document url-prefix() {
    background: none;
    color: #00ff95;
  }
  
  /* Safari specific - more reliable detection */
  @media not all and (min-resolution:.001dpcm) {
    @supports (-webkit-appearance:none) {
      background: none !important;
      color: #00ff95 !important;
      -webkit-text-fill-color: #00ff95 !important;
    }
  }
  
  /* Mobile Safari specific */
  @supports (-webkit-touch-callout: none) and (not (translate: none)) {
    background: none !important;
    color: #00ff95 !important;
    -webkit-text-fill-color: #00ff95 !important;
  }
  
  /* Low resolution displays fallback */
  @media (max-resolution: 150dpi) {
    background: none;
    color: #00ff95;
    -webkit-text-fill-color: #00ff95;
  }

  @media (max-width: 480px) {
    font-size: 2.2rem;
    line-height: 1.2;
    
    /* Extra safety for mobile */
    background: none !important;
    color: #00ff95 !important;
    -webkit-text-fill-color: #00ff95 !important;
  }
  
  @media (max-width: 768px) {
    /* Tablet safety */
    background: none !important;
    color: #00ff95 !important;
    -webkit-text-fill-color: #00ff95 !important;
  }
`;

const Subtitle = styled(motion.p)`
  font-size: clamp(1rem, 3vw, 1.5rem);
  color: #b4ecce;
  margin-bottom: 3rem;
  text-shadow: 0 0 10px rgba(0, 255, 149, 0.2);
  opacity: 0; /* CHANGED: Use opacity instead of visibility */
`;

const TerminalWrapper = styled.div`
  background: var(--darker-bg);
  padding: 1rem;
  border-radius: 8px;
  font-family: 'Fira Code', monospace;
  text-align: left;
  margin: 0.75rem auto;
  margin-bottom: 50px;
  max-width: 600px;
  box-shadow: 0 8px 32px rgba(0, 255, 149, 0.2);
  border: 1px solid rgba(0, 255, 149, 0.1);
  user-select: none;
  -webkit-user-select: none;
  -webkit-touch-callout: none;
  opacity: 0; /* CHANGED: Use opacity instead of visibility */
`;

const Command = styled.div`
  color: #00ff95;
  &:before {
    content: "$ ";
  }
  text-shadow: 0 0 8px rgba(0, 255, 149, 0.3);
  margin-top: 1.5rem;
  
  &:first-child {
    margin-top: 0;
  }
`;

const Response = styled.div`
  color: #e6e6e6;
  margin-top: 0.75rem;
  opacity: 0.95;
  padding-left: 1rem;
  line-height: 1.6;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1.5rem;
  opacity: 0; /* CHANGED: Use opacity instead of visibility */
  
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const ActionButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  padding: 0.8rem 1.5rem;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 500;
  font-size: 1rem;
  background: ${props => props.variant === 'outlined' ? 'transparent' : '#00ff95'};
  color: ${props => props.variant === 'outlined' ? '#00ff95' : 'var(--darker-bg)'};
  border: 2px solid #00ff95;
  transition: var(--transition);
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(0, 255, 149, 0.2);

  span {
    margin-left: 0.5rem;
    transition: transform 0.2s ease;
  }

  &:hover span {
    transform: translateX(4px);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

export default function HeroSection() {
  const [loading, setLoading] = useState(true);
  const [loadingStep, setLoadingStep] = useState(0);
  const terminalRef = useRef();
  const titleRef = useRef();
  const subtitleRef = useRef();
  const containerRef = useRef();

  const personalData = getSectionData('personal');
  const skillsData = getSectionData('skills');
  const focusData = getSectionData('focus');

  useEffect(() => {
    const loadingSteps = [
      { text: "Initializing system...", delay: 500 },
      { text: "Loading dependencies...", delay: 800 },
      { text: "Compiling components...", delay: 600 },
      { text: "Optimizing render pipeline...", delay: 700 },
      { text: "Starting application...", delay: 400 }
    ];

    let currentStep = 0;
    const stepInterval = setInterval(() => {
      if (currentStep < loadingSteps.length) {
        setLoadingStep(currentStep);
        currentStep++;
      } else {
        clearInterval(stepInterval);
        setTimeout(() => setLoading(false), 500);
      }
    }, 1000);

    return () => clearInterval(stepInterval);
  }, []);

  useLayoutEffect(() => {
    let tl;

    if (!loading) {
      gsap.registerPlugin(ScrollTrigger, TextPlugin, SplitText);

      // Split text animation for title
      const titleSplit = new SplitText(titleRef.current, { type: "chars, words" });
      const subtitleSplit = new SplitText(subtitleRef.current, { type: "chars" });

      tl = gsap.timeline();

      // Initial container fade in
      tl.from(containerRef.current, {
        opacity: 0,
        duration: 0.5
      })

        // Make title and subtitle visible before animating
        .set([titleRef.current, subtitleRef.current, terminalRef.current], {
          opacity: 1
        })

        // Animate title characters
        .from(titleSplit.chars, {
          opacity: 0,
          y: 50,
          rotateX: -90,
          stagger: 0.02,
          duration: 0.8,
          ease: "back.out(1.7)"
        })

        // Animate subtitle characters
        .from(subtitleSplit.chars, {
          opacity: 0,
          x: -20,
          stagger: 0.02,
          duration: 0.4,
          ease: "power2.out"
        }, "-=0.3")

        // Terminal typing effect
        .to(terminalRef.current.querySelector(".command-1"), {
          duration: 1,
          text: "profile --summary",
          ease: "none",
        })
        .to(terminalRef.current.querySelector(".response-1"), {
          duration: 0.1,
          opacity: 1,
        })
        .to(terminalRef.current.querySelector(".command-2"), {
          duration: 1,
          text: "profile --skills",
          ease: "none",
        }, "+=1.5")
        .to(terminalRef.current.querySelector(".response-2"), {
          duration: 0.1,
          opacity: 1,
        })
        .to(terminalRef.current.querySelector(".command-3"), {
          duration: 1,
          text: "profile --focus",
          ease: "none",
        }, "+=2")
        .to(terminalRef.current.querySelector(".response-3"), {
          duration: 0.1,
          opacity: 1,
        })

        // Finally show buttons
        .to(document.querySelector('.button-container'), {
          opacity: 1,
          duration: 0.5
        });
    }

    return () => {
      if (tl) {
        tl.kill();
      }
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [loading]);

  const loadingSteps = [
    "Initializing system...",
    "Loading dependencies...",
    "Compiling components...",
    "Optimizing render pipeline...",
    "Starting application..."
  ];

  return (
    <motion.div style={{ width: '100%', height: '100%' }}>
      <AnimatePresence>
        {loading && (
          <LoadingContainer
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingContent>
              {loadingSteps.slice(0, loadingStep + 1).map((step, index) => (
                <LoadingLine key={index}>
                  {step}
                  {index === loadingStep && <Cursor />}
                </LoadingLine>
              ))}
            </LoadingContent>
            <LoadingBar />
          </LoadingContainer>
        )}
      </AnimatePresence>

      <HeroContainer ref={containerRef}>
        <BackgroundWrapper>
          <ParticleField />
        </BackgroundWrapper>

        <Content>
          <motion.div>
            <Title ref={titleRef}>Hey, I'm {personalData.name}</Title>


            <Subtitle ref={subtitleRef}>
              {personalData.title}
            </Subtitle>
          </motion.div>

          <TerminalWrapper ref={terminalRef}>
            <Command className="command-1"></Command>
            <Response className="response-1" style={{ opacity: 0 }}>
              {personalData.summary}
            </Response>
            <Command className="command-2"></Command>
            <Response className="response-2" style={{ opacity: 0 }}>
              Frontend : {skillsData.frontend.join(', ')}<br></br>
              Backend : {skillsData.backend.join(', ')}<br></br>
              DevOps : {skillsData.devops.join(', ')}<br></br>
              Architecture : {skillsData.architecture.join(', ')}<br></br>
            </Response>
            <Command className="command-3"></Command>
            <Response className="response-3" style={{ opacity: 0 }}>
              Currently focused on : {focusData.join(', ')}
            </Response>
          </TerminalWrapper>

          <ButtonContainer className="button-container">
            <ActionButton
              onClick={() => {
                const projectsSection = document.querySelector('#projects');
                projectsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: loading ? 0 : 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Projects <span>→</span>
            </ActionButton>
            <ActionButton
              variant="outlined"
              onClick={() => {
                const contactSection = document.querySelector('#contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: loading ? 0 : 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact Me <span>→</span>
            </ActionButton>
          </ButtonContainer>
        </Content>
      </HeroContainer>
    </motion.div>
  );
}