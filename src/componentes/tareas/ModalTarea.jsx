import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { tema } from '../../estilos/tema';

const FondoModal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(5px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background-color: ${tema.colores.fondoTarjeta};
  border-radius: ${tema.radios.grande};
  padding: 3rem;
  width: 100%;
  max-width: 50rem;
  position: relative;
  box-shadow: ${tema.sombras.neón};
`;

const Titulo = styled.h2`
  font-size: 2.4rem;
  color: ${tema.colores.primario};
  margin-bottom: 2rem;
  text-align: center;
`;

const Formulario = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Grupo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Etiqueta = styled.label`
  font-size: 1.4rem;
  color: ${tema.colores.textoSecundario};
`;

const Input = styled.input`
  padding: 1rem;
  border-radius: ${tema.radios.medio};
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid ${tema.colores.borde};
  color: ${tema.colores.texto};
  font-size: 1.6rem;

  &:focus {
    outline: none;
    border-color: ${tema.colores.primario};
    box-shadow: ${tema.sombras.neón};
  }
`;

const TextArea = styled.textarea`
  padding: 1rem;
  border-radius: ${tema.radios.medio};
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid ${tema.colores.borde};
  color: ${tema.colores.texto};
  font-size: 1.6rem;
  min-height: 10rem;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: ${tema.colores.primario};
    box-shadow: ${tema.sombras.neón};
  }
`;

const Botones = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 2rem;
`;

const Boton = styled.button`
  padding: 1rem 2rem;
  border-radius: ${tema.radios.medio};
  font-size: 1.4rem;
  transition: ${tema.transiciones.rapida};

  &:first-child {
    background-color: transparent;
    border: 1px solid ${tema.colores.borde};
    color: ${tema.colores.texto};

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }

  &:last-child {
    background-color: ${tema.colores.primario};
    color: ${tema.colores.fondo};

    &:hover {
      transform: translateY(-2px);
      box-shadow: ${tema.sombras.neón};
    }
  }
`;

export const ModalTarea = ({ mostrar, onCerrar, onGuardar, tarea }) => {
  const [formulario, setFormulario] = useState({
    titulo: '',
    descripcion: ''
  });

  useEffect(() => {
    if (tarea) {
      setFormulario({
        titulo: tarea.titulo,
        descripcion: tarea.descripcion
      });
    } else {
      setFormulario({
        titulo: '',
        descripcion: ''
      });
    }
  }, [tarea, mostrar]);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    onGuardar({
      ...formulario,
      id: tarea?.id
    });
    onCerrar();
  };

  if (!mostrar) return null;

  return (
    <FondoModal onClick={onCerrar}>
      <Modal onClick={e => e.stopPropagation()}>
        <Titulo>{tarea ? 'Editar Tarea' : 'Nueva Tarea'}</Titulo>
        <Formulario onSubmit={manejarEnvio}>
          <Grupo>
            <Etiqueta>Título</Etiqueta>
            <Input
              type="text"
              name="titulo"
              value={formulario.titulo}
              onChange={manejarCambio}
              required
            />
          </Grupo>
          <Grupo>
            <Etiqueta>Descripción</Etiqueta>
            <TextArea
              name="descripcion"
              value={formulario.descripcion}
              onChange={manejarCambio}
            />
          </Grupo>
          <Botones>
            <Boton type="button" onClick={onCerrar}>
              Cancelar
            </Boton>
            <Boton type="submit">
              {tarea ? 'Guardar Cambios' : 'Crear Tarea'}
            </Boton>
          </Botones>
        </Formulario>
      </Modal>
    </FondoModal>
  );
}; 