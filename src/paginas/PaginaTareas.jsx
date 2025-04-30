import React from 'react';
import styled from 'styled-components';
import { OrdenTarjetas } from '../componentes/tareas/OrdenTarjetas';
import { tema } from '../estilos/tema';

const Contenedor = styled.div`
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 4rem);
  padding: 2rem;
`;

const Encabezado = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
`;

const Titulo = styled.h2`
  font-size: 3.2rem;
  color: ${tema.colores.primario};
  text-shadow: ${tema.sombras.neón};
`;

export const PaginaTareas = () => {
  return (
    <Contenedor>
      <Encabezado>
        <Titulo>Mis Tareas</Titulo>
      </Encabezado>
      <OrdenTarjetas />
    </Contenedor>
  );
}; 