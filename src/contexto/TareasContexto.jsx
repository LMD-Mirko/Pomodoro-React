import React, { createContext, useState, useContext, useEffect } from 'react';

const TareasContexto = createContext();

const STORAGE_KEY = 'pomodoro_app_tareas';

export const useTareas = () => {
  const context = useContext(TareasContexto);
  if (!context) {
    throw new Error('useTareas debe ser usado dentro de un TareasProvider');
  }
  return context;
};

const obtenerTareasGuardadas = () => {
  try {
    const tareasGuardadas = localStorage.getItem(STORAGE_KEY);
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  } catch (error) {
    console.error('Error al cargar tareas:', error);
    return [];
  }
};

export const TareasProvider = ({ children }) => {
  const [tareas, setTareas] = useState(obtenerTareasGuardadas);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [tareaEditando, setTareaEditando] = useState(null);
  const [terminoBusqueda, setTerminoBusqueda] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tareas));
    } catch (error) {
      console.error('Error al guardar tareas:', error);
    }
  }, [tareas]);

  const agregarTarea = (nuevaTarea) => {
    const tareaConId = {
      ...nuevaTarea,
      id: Date.now(),
      completada: false,
      fechaCreacion: new Date().toISOString()
    };
    setTareas(tareasActuales => [...tareasActuales, tareaConId]);
  };

  const editarTarea = (tareaActualizada) => {
    setTareas(tareasActuales => 
      tareasActuales.map(t => 
        t.id === tareaActualizada.id 
          ? { ...t, ...tareaActualizada, fechaModificacion: new Date().toISOString() }
          : t
      )
    );
  };

  const eliminarTarea = (id) => {
    setTareas(tareasActuales => tareasActuales.filter(t => t.id !== id));
  };

  const toggleCompletada = (id) => {
    setTareas(tareasActuales => 
      tareasActuales.map(t => 
        t.id === id 
          ? { ...t, completada: !t.completada, fechaCompletada: !t.completada ? new Date().toISOString() : null }
          : t
      )
    );
  };

  const abrirModalCreacion = () => {
    setTareaEditando(null);
    setMostrarModal(true);
  };

  const abrirModalEdicion = (tarea) => {
    setTareaEditando(tarea);
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
    setTareaEditando(null);
  };

  const buscarTareas = (termino) => {
    setTerminoBusqueda(termino);
  };

  const tareasFiltradas = tareas.filter(tarea => {
    const terminoLower = terminoBusqueda.toLowerCase();
    return (
      tarea.titulo.toLowerCase().includes(terminoLower) ||
      tarea.descripcion.toLowerCase().includes(terminoLower)
    );
  });

  return (
    <TareasContexto.Provider value={{
      tareas: tareasFiltradas,
      mostrarModal,
      tareaEditando,
      terminoBusqueda,
      agregarTarea,
      editarTarea,
      eliminarTarea,
      toggleCompletada,
      abrirModalCreacion,
      abrirModalEdicion,
      cerrarModal,
      buscarTareas
    }}>
      {children}
    </TareasContexto.Provider>
  );
}; 