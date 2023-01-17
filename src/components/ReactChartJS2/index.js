import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  Filler,
} from 'chart.js';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { GithubData } from '../GithubData';
import { DATA } from '../../shared/data'
import { getColor } from '../../shared/getColor'
import { Bar, Line, PolarArea } from 'react-chartjs-2';

export function ReactChartJS2({ width, height, type, color, curve, verticalLines, horizontalLines }) {
  const [stars, setStars] = useState(0)
  const [license, setLicense] = useState('')
  const [owner, setOwner] = useState('')
  const [avatar, setAvatar] = useState('')

  useEffect(() => {
    async function fetchGithubData() {
      try {
        const { data } = await axios.get('https://api.github.com/repos/reactchartjs/react-chartjs-2')

        setStars(data.stargazers_count)
        setLicense(data.license.name)
        setOwner(data.owner.login)
        setAvatar(data.owner.avatar_url)
      } catch (err) {
        throw err
      }      
    }

    fetchGithubData()
  }, []);

  ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

  const hexToRgbA = (hex) =>{
    var c;
    if(/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)){
        c= hex.substring(1).split('');
        if(c.length== 3){
            c= [c[0], c[0], c[1], c[1], c[2], c[2]];
        }
        c= '0x'+c.join('');
        return 'rgba('+[(c>>16)&255, (c>>8)&255, c&255].join(', ')+', 0.5)';
    }
    throw new Error('Bad Hex');
  }

  const normalizeData = (data) => {
    return {
      labels: data.map(d => d.releaseDate),
      datasets: [
        { 
          fill: type === 'Area',
          label: 'result', 
          data: data.map((d) => d.result),
          borderColor: hexToRgbA(getColor(color)),
          backgroundColor: hexToRgbA(getColor(color))
        }
      ]
    }
  }

  const getCharts = () => {
    switch(type) {
      case 'Linha': 
        return (
          <div style={{ width: `${width}px`, height: `${height}px` }}>
            <Line options={options} data={normalizeData(DATA)} />
          </div>
        );

      case 'Barra': 
        return (
          <div style={{ width: `${width}px`, height: `${height}px` }}>
            <Bar options={options} data={normalizeData(DATA)} />
          </div>
        );

      case 'Area':
        return (
          <div style={{ width: `${width}px`, height: `${height}px` }}>
            <Line options={options} data={normalizeData(DATA)} />
          </div>
        );

      case 'Linha e Pontos':
        return (
          <div style={{ width: `${width}px`, height: `${height}px` }}>
            <Line options={options} data={normalizeData(DATA)} />
          </div>
        );

      default:
        return null
    }
  }

  return (
    <>
      <GithubData stars={stars} license={license} owner={owner} avatar={avatar} />

      {getCharts()}
    </>
  )
}
