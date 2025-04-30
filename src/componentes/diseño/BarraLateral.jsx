import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faClock, 
  faCalculator, 
  faTasks,
  faPlus,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import { tema } from '../../estilos/tema';
import { ModalTarea } from '../tareas/ModalTarea';
import { useTareas } from '../../contexto/TareasContexto';
import { ResultadosBusqueda } from '../tareas/ResultadosBusqueda';

const BarraLateralEstilizada = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  width: 28rem;
  height: 100vh;
  background-color: rgba(42, 42, 61, 0.8);
  backdrop-filter: blur(10px);
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  border-right: 1px solid ${tema.colores.borde};
`;

const Logo = styled.h1`
  font-size: 2.8rem;
  color: ${tema.colores.primario};
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: ${tema.sombras.neón};
`;

const Navegacion = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Enlace = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem;
  color: ${tema.colores.textoSecundario};
  border-radius: ${tema.radios.medio};
  transition: ${tema.transiciones.rapida};
  font-size: 1.6rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
    color: ${tema.colores.texto};
  }

  &.active {
    background-color: ${tema.colores.primario};
    color: ${tema.colores.texto};
    box-shadow: ${tema.sombras.neón};
  }
`;

const Buscador = styled.div`
  position: relative;
  margin-top: 1rem;
  z-index: 1000;
`;

const InputBusqueda = styled.input`
  width: 100%;
  padding: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  border-radius: ${tema.radios.medio};
  color: ${tema.colores.texto};
  padding-left: 3rem;
  font-size: 1.6rem;

  &:focus {
    outline: none;
    box-shadow: ${tema.sombras.neónPúrpura};
  }
`;

const IconoBusqueda = styled(FontAwesomeIcon)`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: ${tema.colores.textoSecundario};
`;

const BotonNuevaTarea = styled.button`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem;
  background-color: ${tema.colores.secundario};
  color: ${tema.colores.fondo};
  border-radius: ${tema.radios.medio};
  margin-top: auto;
  transition: ${tema.transiciones.rapida};
  font-size: 1.6rem;

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${tema.sombras.neónAzul};
  }
`;

export const BarraLateral = () => {
  const { 
    mostrarModal, 
    abrirModalCreacion, 
    cerrarModal, 
    agregarTarea, 
    tareaEditando, 
    editarTarea,
    buscarTareas,
    terminoBusqueda
  } = useTareas();

  const manejarBusqueda = (e) => {
    buscarTareas(e.target.value);
  };

  return (
    <>
      <BarraLateralEstilizada>
        <Logo>Pomodoro App</Logo>
        
        <Navegacion>
          <Enlace to="/pomodoro">
            <FontAwesomeIcon icon={faClock} />
            Pomodoro
          </Enlace>
          
          <Enlace to="/calculadora">
            <FontAwesomeIcon icon={faCalculator} />
            Calculadora
          </Enlace>
          
          <Enlace to="/tareas">
            <FontAwesomeIcon icon={faTasks} />
            Tareas
          </Enlace>
        </Navegacion>

        <Buscador>
          <IconoBusqueda icon={faSearch} />
          <InputBusqueda 
            type="text" 
            placeholder="Buscar tareas..." 
            value={terminoBusqueda}
            onChange={manejarBusqueda}
          />
          <ResultadosBusqueda />
        </Buscador>

        <BotonNuevaTarea onClick={abrirModalCreacion}>
          <FontAwesomeIcon icon={faPlus} />
          Nueva Tarea
        </BotonNuevaTarea>
      </BarraLateralEstilizada>

      <ModalTarea
        mostrar={mostrarModal}
        onCerrar={cerrarModal}
        onGuardar={tareaEditando ? editarTarea : agregarTarea}
        tarea={tareaEditando}
      />
    </>
  );
}; 