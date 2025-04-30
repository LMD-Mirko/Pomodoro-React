import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Diseño } from '../componentes/diseño/Diseño';
import { PaginaPomodoro } from '../paginas/PaginaPomodoro';
import { PaginaCalculadora } from '../paginas/PaginaCalculadora';
import { PaginaTareas } from '../paginas/PaginaTareas';
import { PaginaError404 } from '../paginas/PaginaError404';

export const RutasApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Diseño />}>
          <Route index element={<PaginaPomodoro />} />
          <Route path="pomodoro" element={<PaginaPomodoro />} />
          <Route path="calculadora" element={<PaginaCalculadora />} />
          <Route path="tareas" element={<PaginaTareas />} />
          <Route path="*" element={<PaginaError404 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}; 