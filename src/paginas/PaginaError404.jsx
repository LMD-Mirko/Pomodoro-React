import React from 'react';
import styled, { keyframes } from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { tema } from '../estilos/tema';

const flotar = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-20px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const brillar = keyframes`
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
`;

const Contenedor = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  text-align: center;
`;

const Capibara = styled.div`
  font-size: 15rem;
  animation: ${flotar} 3s ease-in-out infinite;
  margin-bottom: 2rem;
  position: relative;

  &::after {
    content: '🦫';
  }
`;

const Estrellas = styled.div`
  position: absolute;
  font-size: 2rem;
  animation: ${brillar} 2s ease-in-out infinite;
  
  &:nth-child(1) {
    top: -20px;
    left: -20px;
    &::after { content: '✨'; }
  }
  
  &:nth-child(2) {
    top: 20px;
    right: -20px;
    animation-delay: 0.5s;
    &::after { content: '⭐'; }
  }
  
  &:nth-child(3) {
    bottom: -10px;
    left: 10px;
    animation-delay: 1s;
    &::after { content: '🌟'; }
  }
`;

const Titulo = styled.h1`
  font-size: 4.8rem;
  color: ${tema.colores.primario};
  margin-bottom: 1rem;
  text-shadow: ${tema.sombras.neón};
`;

const Subtitulo = styled.p`
  font-size: 2rem;
  color: ${tema.colores.textoSecundario};
  margin-bottom: 3rem;
  max-width: 60rem;
`;

const Boton = styled.button`
  padding: 1.5rem 3rem;
  font-size: 1.6rem;
  background-color: ${tema.colores.primario};
  color: ${tema.colores.fondo};
  border-radius: ${tema.radios.medio};
  transition: ${tema.transiciones.rapida};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${tema.sombras.neón};
  }
`;

export const PaginaError404 = () => {
  const navigate = useNavigate();

  return (
    <Contenedor>
      <Capibara>
        <Estrellas />
        <Estrellas />
        <Estrellas />
      </Capibara>
      <Titulo>¡Ups, tenemos un problema!</Titulo>
      <Subtitulo>
        Da la vuelta oeeee.
      </Subtitulo>
      <Boton onClick={() => navigate('/')}>
        Volver al inicio
      </Boton>
    </Contenedor>
  );
}; 