import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import { BarraLateral } from './BarraLateral';

const Contenedor = styled.div`
  display: flex;
  min-height: 100vh;
`;

const Contenido = styled.main`
  flex: 1;
  padding: 2rem;
  margin-left: 28rem;
  overflow-y: auto;
`;

export const Diseño = () => {
  return (
    <Contenedor>
      <BarraLateral />
      <Contenido>
        <Outlet />
      </Contenido>
    </Contenedor>
  );
}; 