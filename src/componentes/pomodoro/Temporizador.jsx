import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { tema } from '../../estilos/tema';

const ContenedorTemporizador = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Circulo = styled.div`
  width: 30rem;
  height: 30rem;
  border-radius: 50%;
  background: ${tema.colores.fondoTarjeta};
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  box-shadow: ${tema.sombras.neón};
`;

const Tiempo = styled.div`
  font-size: 6rem;
  font-weight: bold;
  color: ${tema.colores.texto};
`;

const Modos = styled.div`
  display: flex;
  gap: 1rem;
`;

const BotonModo = styled.button`
  padding: 1rem 2rem;
  border-radius: ${tema.radios.medio};
  background-color: ${props => props.activo ? tema.colores.primario : 'transparent'};
  color: ${props => props.activo ? tema.colores.texto : tema.colores.textoSecundario};
  border: 1px solid ${props => props.activo ? tema.colores.primario : tema.colores.borde};
  transition: ${tema.transiciones.rapida};

  &:hover {
    background-color: ${props => props.activo ? tema.colores.primario : 'rgba(255, 255, 255, 0.1)'};
  }
`;

const Controles = styled.div`
  display: flex;
  gap: 1rem;
`;

const BotonControl = styled.button`
  padding: 1rem 2rem;
  border-radius: ${tema.radios.medio};
  background-color: ${tema.colores.secundario};
  color: ${tema.colores.fondo};
  transition: ${tema.transiciones.rapida};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${tema.sombras.neónAzul};
  }
`;

const modos = {
  pomodoro: 25 * 60,
  descansoCorto: 5 * 60,
  descansoLargo: 15 * 60
};

export const Temporizador = () => {
  const [tiempo, setTiempo] = useState(modos.pomodoro);
  const [modoActivo, setModoActivo] = useState('pomodoro');
  const [activo, setActivo] = useState(false);

  useEffect(() => {
    let intervalo;
    if (activo && tiempo > 0) {
      intervalo = setInterval(() => {
        setTiempo(t => t - 1);
      }, 1000);
    } else if (tiempo === 0) {
      setActivo(false);
    }
    return () => clearInterval(intervalo);
  }, [activo, tiempo]);

  const formatearTiempo = (segundos) => {
    const minutos = Math.floor(segundos / 60);
    const segundosRestantes = segundos % 60;
    return `${minutos.toString().padStart(2, '0')}:${segundosRestantes.toString().padStart(2, '0')}`;
  };

  const cambiarModo = (modo) => {
    setModoActivo(modo);
    setTiempo(modos[modo]);
    setActivo(false);
  };

  const reiniciar = () => {
    setTiempo(modos[modoActivo]);
    setActivo(false);
  };

  return (
    <ContenedorTemporizador>
      <Modos>
        <BotonModo 
          activo={modoActivo === 'pomodoro'}
          onClick={() => cambiarModo('pomodoro')}
        >
          Pomodoro
        </BotonModo>
        <BotonModo 
          activo={modoActivo === 'descansoCorto'}
          onClick={() => cambiarModo('descansoCorto')}
        >
          Descanso Corto
        </BotonModo>
        <BotonModo 
          activo={modoActivo === 'descansoLargo'}
          onClick={() => cambiarModo('descansoLargo')}
        >
          Descanso Largo
        </BotonModo>
      </Modos>

      <Circulo>
        <Tiempo>{formatearTiempo(tiempo)}</Tiempo>
      </Circulo>

      <Controles>
        <BotonControl onClick={() => setActivo(!activo)}>
          {activo ? 'Pausar' : 'Iniciar'}
        </BotonControl>
        <BotonControl onClick={reiniciar}>
          Reiniciar
        </BotonControl>
      </Controles>
    </ContenedorTemporizador>
  );
}; 