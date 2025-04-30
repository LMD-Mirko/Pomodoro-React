import React from 'react';
import styled from 'styled-components';
import { TarjetaTarea } from './TarjetaTarea';
import { ModalTarea } from './ModalTarea';
import { tema } from '../../estilos/tema';
import { useTareas } from '../../contexto/TareasContexto';

const ContenedorTarjetas = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(28rem, 1fr));
  gap: 2rem;
  width: 100%;
`;

const SinTareas = styled.div`
  text-align: center;
  padding: 4rem;
  color: ${tema.colores.textoSecundario};
  font-size: 1.8rem;
`;

const ContenedorPrincipal = styled.div`
  width: 100%;
`;

export const OrdenTarjetas = () => {
  const {
    tareas,
    mostrarModal,
    tareaEditando,
    cerrarModal,
    editarTarea,
    agregarTarea,
    eliminarTarea,
    toggleCompletada,
    abrirModalEdicion
  } = useTareas();

  return (
    <ContenedorPrincipal>
      <ContenedorTarjetas>
        {tareas.length === 0 ? (
          <SinTareas>No hay tareas. ¡Agrega una nueva!</SinTareas>
        ) : (
          tareas.map(tarea => (
            <TarjetaTarea
              key={tarea.id}
              tarea={tarea}
              onToggleCompletada={toggleCompletada}
              onEditar={() => abrirModalEdicion(tarea)}
              onEliminar={() => eliminarTarea(tarea.id)}
            />
          ))
        )}
      </ContenedorTarjetas>

      <ModalTarea
        mostrar={mostrarModal}
        onCerrar={cerrarModal}
        onGuardar={tareaEditando ? editarTarea : agregarTarea}
        tarea={tareaEditando}
      />
    </ContenedorPrincipal>
  );
}; 