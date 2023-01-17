import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Label, Legend, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import { GithubData } from '../GithubData';
import { DATA } from '../../shared/data'
import { getColor } from '../../shared/getColor'

export function Recharts({ width, height, type, color, curve, verticalLines, horizontalLines }) {
  const [stars, setStars] = useState(0)
  const [license, setLicense] = useState('')
  const [owner, setOwner] = useState('')
  const [avatar, setAvatar] = useState('')

  useEffect(() => {
    async function fetchGithubData() {
      try {
        const { data } = await axios.get('https://api.github.com/repos/recharts/recharts')

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

  const getCharts = () => {
    switch(type) {
      case 'Linha': 
        return (
          <LineChart width={Number(width)} height={Number(height)} data={DATA}>
            <Line type={curve ? "monotone" : ''} dataKey="result" stroke={getColor(color)} />
            {verticalLines && horizontalLines && <CartesianGrid stroke="#ccc" />}
            <XAxis dataKey="releaseDate">
              <Label value="releaseDate" offset={0} position="insideBottom" />
            </XAxis>
            <YAxis label={{ value: 'result', angle: -90, position: 'insideLeft', textAnchor: 'middle' }} />
            <Tooltip />
            <Legend />
          </LineChart>
        )

      case 'Barra': 
       return (
        <BarChart width={Number(width)} height={Number(height)} data={DATA}>
          {horizontalLines && verticalLines && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis dataKey="releaseDate" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="result" fill={getColor(color)} />
        </BarChart>
       )

      case 'Area':
        return (
          <AreaChart width={Number(width)} height={Number(height)} data={DATA}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={getColor(color)} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={getColor(color)} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="releaseDate" />
          <YAxis />
          {horizontalLines && verticalLines && <CartesianGrid strokeDasharray="3 3" />}
          <Tooltip />
          <Legend />
          <Area type={curve ? "monotone" : ''} dataKey="result" stroke={getColor(color)} fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>
        )
       

      case 'Linha e Pontos':
        return (
          <LineChart width={Number(width)} height={Number(height)} data={DATA}>
            <Line type={curve ? "monotone" : ''} dataKey="result" stroke={getColor(color)} />
            {verticalLines && horizontalLines && <CartesianGrid stroke="#ccc" />}
            <XAxis dataKey="releaseDate">
              <Label value="releaseDate" offset={0} position="insideBottom" />
            </XAxis>
            <YAxis label={{ value: 'result', angle: -90, position: 'insideLeft', textAnchor: 'middle' }} />
            <Tooltip />
            <Legend />
          </LineChart>
        )

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
