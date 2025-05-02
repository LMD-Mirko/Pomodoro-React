import React, { useState, useEffect } from 'react';
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
  font-size: ${props => props.fontSize || '3rem'};
  font-weight: 500;
  word-break: break-all;
  overflow: hidden;
  max-width: 100%;
  min-height: 3.6rem;
  line-height: 1.1;
  text-overflow: ellipsis;
  white-space: nowrap;
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
  const [ultimoOperador, setUltimoOperador] = useState('');
  const [esperandoOperando, setEsperandoOperando] = useState(false);

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

  const limpiar = () => {
    setOperacion('');
    setResultado('0');
    setUltimoOperador('');
    setEsperandoOperando(false);
  };

  const manejarNumero = (numero) => {
    if (esperandoOperando) {
      setResultado(numero);
      setEsperandoOperando(false);
    } else {
      setResultado(prev => prev === '0' ? numero : prev + numero);
    }
  };

  const manejarPunto = () => {
    if (esperandoOperando) {
      setResultado('0.');
      setEsperandoOperando(false);
    } else if (!resultado.includes('.')) {
      setResultado(prev => prev + '.');
    }
  };

  const manejarOperador = (operador) => {
    const valorActual = parseFloat(resultado);
    
    if (operacion === '') {
      setOperacion(`${resultado} ${operador}`);
      setUltimoOperador(operador);
      setEsperandoOperando(true);
      return;
    }

    if (esperandoOperando) {
      setOperacion(prev => prev.slice(0, -1) + operador);
      setUltimoOperador(operador);
      return;
    }

    const resultadoAnterior = parseFloat(operacion.split(' ')[0]);
    let nuevoResultado;

    switch (ultimoOperador) {
      case '+':
        nuevoResultado = resultadoAnterior + valorActual;
        break;
      case '-':
        nuevoResultado = resultadoAnterior - valorActual;
        break;
      case '×':
        nuevoResultado = resultadoAnterior * valorActual;
        break;
      case '÷':
        nuevoResultado = resultadoAnterior / valorActual;
        break;
      case '%':
        nuevoResultado = resultadoAnterior % valorActual;
        break;
      default:
        nuevoResultado = valorActual;
    }

    setOperacion(`${nuevoResultado} ${operador}`);
    setResultado(nuevoResultado.toString());
    setUltimoOperador(operador);
    setEsperandoOperando(true);
  };

  const manejarIgual = () => {
    if (operacion === '' || esperandoOperando) return;

    const valorActual = parseFloat(resultado);
    const resultadoAnterior = parseFloat(operacion.split(' ')[0]);
    let nuevoResultado;

    switch (ultimoOperador) {
      case '+':
        nuevoResultado = resultadoAnterior + valorActual;
        break;
      case '-':
        nuevoResultado = resultadoAnterior - valorActual;
        break;
      case '×':
        nuevoResultado = resultadoAnterior * valorActual;
        break;
      case '÷':
        nuevoResultado = resultadoAnterior / valorActual;
        break;
      case '%':
        nuevoResultado = resultadoAnterior % valorActual;
        break;
      default:
        nuevoResultado = valorActual;
    }

    setOperacion('');
    setResultado(nuevoResultado.toString());
    setUltimoOperador('');
    setEsperandoOperando(false);
  };

  const manejarSigno = () => {
    setResultado(prev => (parseFloat(prev) * -1).toString());
  };

  const manejarClick = (valor) => {
    if (valor === 'C') {
      limpiar();
    } else if (valor === '+/-') {
      manejarSigno();
    } else if (valor === '=') {
      manejarIgual();
    } else if (valor === '.') {
      manejarPunto();
    } else if (['+', '-', '×', '÷', '%'].includes(valor)) {
      manejarOperador(valor);
    } else {
      manejarNumero(valor);
    }
  };

  // Ajustar el tamaño de fuente según la longitud del resultado
  const calcularFontSize = (valor) => {
    if (valor.length > 18) return '1.3rem';
    if (valor.length > 14) return '1.7rem';
    if (valor.length > 10) return '2.2rem';
    return '3rem';
  };

  return (
    <ContenedorCalculadora>
      <Pantalla>
        <Operacion>{operacion}</Operacion>
        <Resultado fontSize={calcularFontSize(resultado)}>{resultado}</Resultado>
      </Pantalla>
      <Teclado>
        {botones.map((boton, index) => (
          <Boton
            key={index}
            operador={boton.operador}
            igual={boton.igual}
            especial={boton.especial}
            span={boton.span}
            onClick={() => manejarClick(boton.valor)}
          >
            {boton.valor}
          </Boton>
        ))}
      </Teclado>
    </ContenedorCalculadora>
  );
}; 