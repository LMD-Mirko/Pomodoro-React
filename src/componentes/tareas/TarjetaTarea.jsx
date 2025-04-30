import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { tema } from '../../estilos/tema';

const Tarjeta = styled.div`
  background-color: ${tema.colores.fondoTarjeta};
  border-radius: ${tema.radios.medio};
  padding: 2rem;
  position: relative;
  transition: ${tema.transiciones.rapida};
  border-left: 4px solid ${tema.colores.primario};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${tema.sombras.neón};
  }
`;

const Titulo = styled.h3`
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: ${props => props.completada ? tema.colores.textoSecundario : tema.colores.texto};
  text-decoration: ${props => props.completada ? 'line-through' : 'none'};
`;

const Descripcion = styled.p`
  font-size: 1.4rem;
  color: ${props => props.completada ? tema.colores.textoSecundario : tema.colores.texto};
  margin-bottom: 2rem;
  text-decoration: ${props => props.completada ? 'line-through' : 'none'};
`;

const Controles = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Checkbox = styled.input`
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;

const Botones = styled.div`
  display: flex;
  gap: 1rem;
`;

const Boton = styled.button`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.tipo === 'editar' ? tema.colores.secundario : tema.colores.terciario};
  color: ${tema.colores.fondo};
  transition: ${tema.transiciones.rapida};

  &:hover {
    transform: scale(1.1);
    box-shadow: ${props => props.tipo === 'editar' ? tema.sombras.neónAzul : tema.sombras.neónPúrpura};
  }
`;

export const TarjetaTarea = ({ tarea, onToggleCompletada, onEditar, onEliminar }) => {
  return (
    <Tarjeta>
      <Titulo completada={tarea.completada}>{tarea.titulo}</Titulo>
      <Descripcion completada={tarea.completada}>{tarea.descripcion}</Descripcion>
      <Controles>
        <Checkbox
          type="checkbox"
          checked={tarea.completada}
          onChange={() => onToggleCompletada(tarea.id)}
        />
        <Botones>
          <Boton tipo="editar" onClick={() => onEditar(tarea)}>
            <FontAwesomeIcon icon={faEdit} />
          </Boton>
          <Boton tipo="eliminar" onClick={() => onEliminar(tarea.id)}>
            <FontAwesomeIcon icon={faTrash} />
          </Boton>
        </Botones>
      </Controles>
    </Tarjeta>
  );
}; 