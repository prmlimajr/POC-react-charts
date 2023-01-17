import React from 'react'
import { Container, LibName } from './styles';

export function Sidebar({ onClick }) {
  const LIBRARIES = [
    {
      id: 1,
      name: 'React-Vis'
    },
    {
      id: 2,
      name: 'Victory'
    },
    {
      id: 3,
      name: 'Recharts'
    },
    {
      id: 4,
      name: 'React-Chartjs-2'
    },
    {
      id: 5,
      name: 'React-Charts'
    }
  ];

  return (
    <Container>
      <h1>POC Graficos</h1>

      <ul>
        {LIBRARIES.map((lib) => {
          return (
            <li key={lib.id} style={{ marginBottom: '10px'}}>
              <LibName onClick={() => onClick(lib.name)}>{lib.name}</LibName>
            </li>
          )
        })}
      </ul>
    </Container>
  )
}
