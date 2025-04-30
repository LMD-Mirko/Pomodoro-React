import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { tema } from '../../estilos/tema';
import { useTareas } from '../../contexto/TareasContexto';

const ContenedorResultados = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background-color: ${tema.colores.fondoTarjeta};
  border-radius: ${tema.radios.medio};
  margin-top: 0.5rem;
  box-shadow: ${tema.sombras.neón};
  max-height: 300px;
  overflow-y: auto;
  z-index: 1000;
`;

const ResultadoItem = styled.div`
  padding: 1rem;
  cursor: pointer;
  transition: ${tema.transiciones.rapida};
  border-bottom: 1px solid ${tema.colores.borde};

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;

const TituloResultado = styled.h4`
  font-size: 1.4rem;
  color: ${tema.colores.texto};
  margin-bottom: 0.5rem;
`;

const DescripcionResultado = styled.p`
  font-size: 1.2rem;
  color: ${tema.colores.textoSecundario};
`;

const SinResultados = styled.div`
  padding: 1.5rem;
  text-align: center;
  color: ${tema.colores.textoSecundario};
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const ResultadosBusqueda = () => {
  const { tareas, terminoBusqueda } = useTareas();
  const navigate = useNavigate();

  if (!terminoBusqueda) return null;

  const resultados = tareas.filter(tarea => 
    tarea.titulo.toLowerCase().includes(terminoBusqueda.toLowerCase()) ||
    tarea.descripcion.toLowerCase().includes(terminoBusqueda.toLowerCase())
  );

  const irATarea = () => {
    navigate('/tareas');
  };

  return (
    <ContenedorResultados>
      {resultados.length > 0 ? (
        resultados.map(tarea => (
          <ResultadoItem key={tarea.id} onClick={irATarea}>
            <TituloResultado>{tarea.titulo}</TituloResultado>
            <DescripcionResultado>
              {tarea.descripcion.length > 100
                ? `${tarea.descripcion.substring(0, 100)}...`
                : tarea.descripcion}
            </DescripcionResultado>
          </ResultadoItem>
        ))
      ) : (
        <SinResultados>
          <FontAwesomeIcon icon={faSearch} />
          No se encontraron resultados
        </SinResultados>
      )}
    </ContenedorResultados>
  );
}; 