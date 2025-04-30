import React from 'react';
import styled from 'styled-components';
import { Calculadora } from '../componentes/calculadora/Calculadora';

const Contenedor = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
`;

export const PaginaCalculadora = () => {
  return (
    <Contenedor>
      <Calculadora />
    </Contenedor>
  );
}; 