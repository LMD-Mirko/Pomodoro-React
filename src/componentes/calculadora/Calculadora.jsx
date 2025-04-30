import React, { useState } from 'react';
import styled from 'styled-components';
import { tema } from '../../estilos/tema';

const ContenedorCalculadora = styled.div`
  background-color: ${tema.colores.fondoTarjeta};
  border-radius: ${tema.radios.grande};
  padding: 2rem;
  width: 320px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
`;

const Pantalla = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: ${tema.radios.medio};
  padding: 2rem;
  margin-bottom: 2rem;
  text-align: right;
  min-height: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Operacion = styled.div`
  color: ${tema.colores.textoSecundario};
  font-size: 1.4rem;
  min-height: 1.4rem;
  opacity: 0.7;
`;

const Resultado = styled.div`
  color: ${tema.colores.texto};
  font-size: 3rem;
  font-weight: 500;
`;

const Teclado = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.8rem;
`;

const Boton = styled.button`
  aspect-ratio: 1;
  font-size: 1.8rem;
  border-radius: ${tema.radios.pequeño};
  background-color: ${props => {
    if (props.especial) return 'rgba(255, 107, 107, 0.2)';
    if (props.operador) return 'rgba(255, 107, 107, 0.2)';
    if (props.igual) return tema.colores.primario;
    return 'rgba(255, 255, 255, 0.1)';
  }};
  color: ${props => {
    if (props.especial || props.operador) return tema.colores.primario;
    return tema.colores.texto;
  }};
  transition: ${tema.transiciones.rapida};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${props => {
      if (props.especial || props.operador) return 'rgba(255, 107, 107, 0.3)';
      if (props.igual) return tema.colores.primario;
      return 'rgba(255, 255, 255, 0.2)';
    }};
  }

  &:active {
    transform: scale(0.95);
  }

  ${props => props.span && `
    grid-column: span ${props.span};
    aspect-ratio: auto;
  `}
`;

export const Calculadora = () => {
  const [operacion, setOperacion] = useState('');
  const [resultado, setResultado] = useState('0');

  const manejarClick = (valor) => {
    if (valor === '=') {
      try {
        setResultado(eval(operacion).toString());
        setOperacion('');
      } catch (error) {
        setResultado('Error');
      }
    } else if (valor === 'C') {
      setOperacion('');
      setResultado('0');
    } else if (valor === '←') {
      setOperacion(prev => prev.slice(0, -1));
    } else {
      setOperacion(prev => prev + valor);
    }
  };

  const botones = [
    { valor: 'C', especial: true },
    { valor: '+/-', operador: true },
    { valor: '%', operador: true },
    { valor: '÷', operador: true },
    { valor: '7' },
    { valor: '8' },
    { valor: '9' },
    { valor: '×', operador: true },
    { valor: '4' },
    { valor: '5' },
    { valor: '6' },
    { valor: '-', operador: true },
    { valor: '1' },
    { valor: '2' },
    { valor: '3' },
    { valor: '+', operador: true },
    { valor: '0', span: 2 },
    { valor: '.' },
    { valor: '=', igual: true },
  ];

  return (
    <ContenedorCalculadora>
      <Pantalla>
        <Operacion>{operacion}</Operacion>
        <Resultado>{resultado}</Resultado>
      </Pantalla>
      <Teclado>
        {botones.map((boton, index) => (
          <Boton
            key={index}
            onClick={() => manejarClick(boton.valor)}
            operador={boton.operador}
            igual={boton.igual}
            especial={boton.especial}
            span={boton.span}
          >
            {boton.valor}
          </Boton>
        ))}
      </Teclado>
    </ContenedorCalculadora>
  );
}; 