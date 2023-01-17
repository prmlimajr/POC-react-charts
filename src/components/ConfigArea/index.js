import React from 'react'
import { Container } from './styles';

export function ConfigArea({ selectedLib, setType, setHeight, setWidth, setColor, setCurve, setHorizontalLines, setVerticalLines }) {
  return (
    <Container>
        <h2>{selectedLib}</h2>
        
        <p>
          Selecione o tipo de grafico:
          <select onChange={(e) => setType(e.target.value)}>
            <option>Linha</option>
            <option>Area</option>
            <option>Barra</option>
            <option>Linha e Pontos</option>
          </select>
        </p>

        <p>
          Selecione a largura:
          <input type="number" min={0} max={1000} onChange={(e) => setWidth(e.target.value)}/>  
        </p>

        <p>
          Selecione a altura:
          <input type="number" min={0} max={1000} onChange={(e) => setHeight(e.target.value)}/>
        </p>

        <p>
          Selecone a cor:
          <select onChange={(e) => setColor(e.target.value)}>
            <option>Azul</option>
            <option>Vermelho</option>
            <option>Preto</option>
            <option>Verde</option>
          </select>
        </p>

        <p>
          Linha curvada? 
          <input type="checkbox" onChange={(e) => e.target.checked ? setCurve('curveMonotoneX') : setCurve('')}/>
        </p>

        <p>
          Linhas horizontais? 
          <input type="checkbox" onChange={(e) => setHorizontalLines(e.target.checked)}/>
        </p>

        
        <p>
          Linhas verticais? 
          <input type="checkbox" onChange={(e) => setVerticalLines(e.target.checked)}/>
        </p>
      </Container>
  )
}
