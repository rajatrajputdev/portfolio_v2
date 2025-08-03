import { useEffect, useState } from 'react';
import styled from 'styled-components';
import GlobalStyles from './styles/GlobalStyles';
import Navigation from './components/layout/Navigation';
import Portfolio from './components/Portfolio';
import portfolioData from './config/portfolio.json';

const AppContainer = styled.div`
  min-height: 100vh;
  background: var(--dark-bg);
  position: relative;
  overflow-x: hidden;
  scroll-behavior: smooth;

  html {
    scroll-behavior: smooth;
  }
`;

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Add Google Fonts
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Fira+Code&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Add Font Awesome
    const script = document.createElement('script');
    script.src = 'https://kit.fontawesome.com/your-kit-code.js';
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);

    // Ensure portfolio data is loaded
    if (portfolioData) {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div style={{ background: 'var(--dark-bg)', height: '100vh', width: '100vw' }} />;
  }

  return (
    <>
      <GlobalStyles />
      <AppContainer>
        <Navigation />
        <Portfolio data={portfolioData} />
      </AppContainer>
    </>
  );
}
