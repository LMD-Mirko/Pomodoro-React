import React from 'react';
import { EstilosGlobales } from './estilos/EstilosGlobales';
import { RutasApp } from './rutas/RutasApp';
import { TareasProvider } from './contexto/TareasContexto';

function App() {
  return (
    <TareasProvider>
      <EstilosGlobales />
      <div className="fondo-galaxia" />
      <RutasApp />
    </TareasProvider>
  );
}

export default App;
