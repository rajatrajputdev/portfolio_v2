import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
    --dark-bg: #0a0a0a;
    --darker-bg: #050505;
    --accent: #ffffffff;
    --text-primary: #00ff95;
    --text-secondary: #858585;
    --transition: all 0.3s ease-in-out;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Space Grotesk', sans-serif;
    user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    cursor: default;
  }
  
  button, 
  a,
  [role="button"],
  .button {
    cursor: pointer !important;
  }
  
  input, textarea {
    cursor: text;
  }

  html {
    scroll-behavior: smooth;
  }

  body {
    background: var(--dark-bg);
    color: var(--text-primary);
    overflow-x: hidden;
    line-height: 1.6;
  }

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: var(--darker-bg);
  }

  ::-webkit-scrollbar-thumb {
    background: var(--accent);
    border-radius: 4px;
  }

  ::selection {
    background: var(--accent);
    color: var(--darker-bg);
  }
`

export default GlobalStyles;
