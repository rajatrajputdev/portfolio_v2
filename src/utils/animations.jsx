import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(ScrollTrigger, TextPlugin);

// Name glitch effect
export const nameGlitchEffect = (element) => {
  const text = element.textContent;
  const chars = "!<>-_\\/[]{}—=+*^?#@";
  let iteration = 0;
  
  const effect = setInterval(() => {
    element.textContent = text
      .split("")
      .map((letter, index) => {
        if(index < iteration) {
          return text[index];
        }
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");
    
    if(iteration >= text.length) {
      clearInterval(effect);
    }
    iteration += 1/3;
  }, 30);

  return () => clearInterval(effect);
};

// Section reveal with glitch effect
export const glitchSectionReveal = (section) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: section,
      start: "top 75%",
    }
  });

  tl.from(section, {
    clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)",
    opacity: 0,
    duration: 0.5,
    ease: "power4.out"
  })
  .from(section, {
    skewX: 10,
    duration: 0.2,
    ease: "power1.out"
  }, "-=0.3")
  .to(section, {
    skewX: 0,
    duration: 0.1
  });

  return tl;
};

// Terminal typing effect with cursor
export const terminalTyping = (element, text, startDelay = 0) => {
  const cursor = document.createElement('span');
  cursor.innerHTML = '|';
  cursor.style.opacity = 1;
  element.appendChild(cursor);

  gsap.to(cursor, {
    opacity: 0,
    repeat: -1,
    yoyo: true,
    duration: 0.5
  });

  return gsap.to(element, {
    duration: text.length * 0.03,
    text: { value: text },
    delay: startDelay,
    ease: "none"
  });
};

// Project card reveal with tech-style grid
export const projectCardReveal = (card) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: card,
      start: "top 85%",
    }
  });

  tl.from(card, {
    opacity: 0,
    y: 50,
    duration: 0.6,
    ease: "power3.out"
  })
  .from(card, {
    backgroundImage: "linear-gradient(45deg, var(--darker-bg) 25%, transparent 25%), linear-gradient(-45deg, var(--darker-bg) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, var(--darker-bg) 75%), linear-gradient(-45deg, transparent 75%, var(--darker-bg) 75%)",
    backgroundSize: "20px 20px",
    duration: 0.8,
    ease: "power2.inOut"
  }, "-=0.3");
};

// Skill progress bar animation
export const skillProgressAnimation = (progressBar, percentage) => {
  return gsap.from(progressBar, {
    width: "0%",
    duration: 1.5,
    ease: "power2.out",
    scrollTrigger: {
      trigger: progressBar,
      start: "top 85%",
    }
  });
};

// Tech stack 3D rotation effect
export const init3DTechRotation = (element) => {
  let rotationX = 0;
  let rotationY = 0;

  element.addEventListener('mousemove', (e) => {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    rotationY = ((e.clientX - centerX) / rect.width) * 20;
    rotationX = ((e.clientY - centerY) / rect.height) * 20;

    gsap.to(element, {
      rotationY,
      rotationX,
      duration: 0.5,
      ease: "power2.out",
    });
  });

  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.5,
      ease: "power2.out",
    });
  });
};
// Simple tech tag hover shimmer/glow effect
export const initTechHover = (element) => {
  element.addEventListener('mouseenter', () => {
    gsap.fromTo(element, 
      { scale: 1, boxShadow: "0 0 0 rgba(0, 255, 149, 0)" },
      { scale: 1.05, boxShadow: "0 0 12px rgba(0, 255, 149, 0.5)", duration: 0.3, ease: "power2.out" }
    );
  });

  element.addEventListener('mouseleave', () => {
    gsap.to(element, {
      scale: 1,
      boxShadow: "0 0 0 rgba(0, 255, 149, 0)",
      duration: 0.3,
      ease: "power2.out"
    });
  });
};
// Cyberpunk-style section/card reveal
export const cyberpunkReveal = (element) => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: element,
      start: "top 80%",
    }
  });

  tl.set(element, {
    opacity: 0,
    filter: "drop-shadow(0 0 2px #00ff95) drop-shadow(0 0 10px #00ff95)",
    scale: 0.95,
  })
  .to(element, {
    opacity: 1,
    scale: 1,
    duration: 0.6,
    ease: "power3.out"
  })
  .to(element, {
    filter: "drop-shadow(0 0 0 #00ff95)",
    duration: 0.4,
    ease: "power2.out"
  }, "-=0.3");

  return tl;
};
// Staggered reveal animation for skill items
export const staggerSkillsReveal = (elements) => {
  return gsap.from(elements, {
    opacity: 0,
    y: 30,
    stagger: 0.15,
    duration: 0.8,
    ease: "power3.out",
    scrollTrigger: {
      trigger: elements[0],
      start: "top 85%",
    }
  });
};
