import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Column, Container } from './styles';
import { ReactVis } from './components/ReactVis';
import { GlobalStyle } from './styles/global';
import { ConfigArea } from './components/ConfigArea';
import { Victory } from './components/Victory';
import { Recharts } from './components/Recharts';
import { ReactChartJS2 } from './components/ReactChartJS2';

function App() {
  const [selectedLib, setSelectedLib] = useState(null)
  const [height, setHeight] = useState(300);
  const [width, setWidth] = useState(300);
  const [type, setType] = useState('Linha');
  const [color, setColor] = useState('')
  const [curve, setCurve] = useState('')
  const [verticalLines, setVerticalLines] = useState(true)
  const [horizontalLines, setHorizontalLines] = useState(true)

  const getSelectedLib = () => {
    switch (selectedLib) {
      case 'React-Vis':
        return (
          <>
            <h1>React Vis</h1>

            <a 
              href='http://uber.github.io/react-vis/documentation/welcome-to-react-vis' 
              target='_blank' 
              rel="noreferrer" 
              style={{ fontWeight: 'bold', marginBottom: '30px', marginTop: '-10px'}}
            >
              Documentacao
            </a>
            
            <ReactVis 
              width={width} 
              height={height} 
              type={type}
              color={color}
              curve={curve}
              verticalLines={verticalLines}
              horizontalLines={horizontalLines}
            />
          </>
        )
      
      case 'Victory':
        return (
          <>
            <h1>Victory</h1>

            <a 
              href='https://formidable.com/open-source/victory/docs' 
              target='_blank' 
              rel="noreferrer" 
              style={{ fontWeight: 'bold', marginBottom: '30px', marginTop: '-10px'}}
            >
              Documentacao
            </a>
            
            <Victory
              width={width} 
              height={height} 
              type={type}
              color={color}
              curve={curve}
              verticalLines={verticalLines}
              horizontalLines={horizontalLines}
            />
          </>
        )

      case 'Recharts':
        return (
          <>
            <h1>Recharts</h1>

            <a 
              href='https://recharts.org/en-US/' 
              target='_blank' 
              rel="noreferrer" 
              style={{ fontWeight: 'bold', marginBottom: '30px', marginTop: '-10px'}}
            >
              Documentacao
            </a>
            
            <Recharts 
              width={width} 
              height={height} 
              type={type}
              color={color}
              curve={curve}
              verticalLines={verticalLines}
              horizontalLines={horizontalLines}
            />
          </>
        )
      
      case 'React-Chartjs-2':
        return (
          <>
            <h1>React ChartJS 2</h1>

            <a 
              href='https://react-chartjs-2.js.org/' 
              target='_blank' 
              rel="noreferrer" 
              style={{ fontWeight: 'bold', marginBottom: '30px', marginTop: '-10px'}}
            >
              Documentacao
            </a>
            
            <ReactChartJS2 
              width={width} 
              height={height} 
              type={type}
              color={color}
              curve={curve}
              verticalLines={verticalLines}
              horizontalLines={horizontalLines}
            />
          </>
        )
      default: 
        return null
    }
  }

  return (
    <Container>
      <GlobalStyle />

      <Sidebar onClick={(e) => setSelectedLib(e)}/>

      <Column>
        {getSelectedLib()}
      </Column>

      <ConfigArea 
        selectedLib={selectedLib} 
        setType={(e) => setType(e)}
        setHeight={(e) => setHeight(e)}
        setWidth={(e) => setWidth(e)}
        setColor={(e) => setColor(e)}
        setCurve={(e) => setCurve(e)}
        setVerticalLines={(e) => setVerticalLines(e)}
        setHorizontalLines={(e) => setHorizontalLines(e)}
        />
      </Container>
  );
}

export default App;
