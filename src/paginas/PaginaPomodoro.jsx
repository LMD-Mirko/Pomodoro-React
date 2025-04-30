import React from 'react';
import styled from 'styled-components';
import { Temporizador } from '../componentes/pomodoro/Temporizador';

const Contenedor = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
`;

export const PaginaPomodoro = () => {
  return (
    <Contenedor>
      <Temporizador />
    </Contenedor>
  );
}; 