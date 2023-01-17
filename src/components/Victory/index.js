import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { GithubData } from '../GithubData';
import { DATA } from '../../shared/data'
import { VictoryChart, VictoryAxis, VictoryBar, VictoryArea, VictoryLine } from 'victory';
import { getColor } from '../../shared/getColor';

export function Victory({ type, color, width, height }) {
  const [stars, setStars] = useState(0)
  const [license, setLicense] = useState('')
  const [owner, setOwner] = useState('')
  const [avatar, setAvatar] = useState('')

  useEffect(() => {
    async function fetchGithubData() {
      try {
        const { data } = await axios.get('https://api.github.com/repos/formidablelabs/victory')

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
          <VictoryChart domainPadding={20} width={width} height={height}>
            <VictoryAxis
              dependentAxis
              tickValues={DATA.map(d => d.result)}
              tickFormat={(x) => x}
            />

            <VictoryAxis
              tickValues={DATA.map(d => d.releaseDate)}
              tickFormat={(x) => x}
            />
            <VictoryLine
              style={{
                data: { stroke: "#c43a31" },
                parent: { border: "1px solid #ccc"}
              }}
              data={DATA}
            />
          </VictoryChart>
        )

      case 'Barra': 
        return (  
          <VictoryChart domainPadding={20} width={width} height={height}>
            <VictoryAxis
              dependentAxis
              tickValues={DATA.map(d => d.result)}
              tickFormat={(x) => x}
            />

            <VictoryAxis
              tickValues={DATA.map(d => d.releaseDate)}
              tickFormat={(x) => x}
            />
            <VictoryBar
              data={DATA}
              style={{ data: { fill: getColor(color) } }}
              alignment="middle"
              x="releaseDate"
              y="result"
              width={width}
              height={height}
            />                                                                                                                                                  
          </VictoryChart>
        )

      case 'Area':
        return (
          <VictoryChart domainPadding={20} width={width} height={height}>
            <VictoryAxis
              dependentAxis
              tickValues={DATA.map(d => d.result)}
              tickFormat={(x) => x}
            />

            <VictoryAxis
              tickValues={DATA.map(d => d.releaseDate)}
              tickFormat={(x) => x}
            />
            <VictoryArea
              data={DATA}
              style={{ data: { fill: getColor(color) } }}
              alignment="middle"
              x="releaseDate"
              y="result"
              width={width}
              height={height}
            />                                                                                                                                                  
          </VictoryChart>
        )

      case 'Linha e Pontos':
        return (
          null
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
