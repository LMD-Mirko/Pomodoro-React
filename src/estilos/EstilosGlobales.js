import { createGlobalStyle } from 'styled-components';
import { tema } from './tema';

export const EstilosGlobales = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-family: ${tema.fuentes.principal};
    background-color: ${tema.colores.fondo};
    color: ${tema.colores.texto};
    min-height: 100vh;
    overflow-x: hidden;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
  }

  input, textarea {
    font-family: inherit;
    color: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  ul {
    list-style: none;
  }

  .fondo-galaxia {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: radial-gradient(circle at center, #1a1a2e 0%, #121212 100%);
    overflow: hidden;
  }

  .fondo-galaxia::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 200%;
    background: 
      radial-gradient(circle at 25% 25%, rgba(255, 107, 107, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 75% 75%, rgba(94, 228, 255, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 50% 50%, rgba(165, 110, 255, 0.1) 0%, transparent 50%);
    animation: rotar 60s linear infinite;
  }

  @keyframes rotar {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`; 