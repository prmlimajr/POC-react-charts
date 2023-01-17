import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { 
  XYPlot, 
  XAxis, 
  YAxis, 
  HorizontalGridLines, 
  LineSeries, 
  VerticalBarSeries, 
  VerticalGridLines, 
  AreaSeries, 
  LineMarkSeries,
} from 'react-vis';
import { GithubData } from '../GithubData';
import { DATA } from '../../shared/data'
import { getColor } from '../../shared/getColor'

export function ReactVis({ width, height, type, color, curve, verticalLines, horizontalLines }) {
  const [stars, setStars] = useState(0)
  const [license, setLicense] = useState('')
  const [owner, setOwner] = useState('')
  const [avatar, setAvatar] = useState('')

  useEffect(() => {
    async function fetchGithubData() {
      try {
        const { data } = await axios.get('https://api.github.com/repos/uber/react-vis')

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
          <XYPlot
            width={width}
            height={height}
          >
            {horizontalLines && <HorizontalGridLines />}
            {verticalLines && <VerticalGridLines />}

            <LineSeries
              curve={curve}
              color={getColor(color)}
              data={DATA.map((d, index) => {
                return (
                  { x: index + 1, y: d.result}
                )
              })}
            />

            <XAxis title='aaaa' position='middle' tickValues={DATA.map((d) => d.releaseDate)} tickFormat={(v) => v} />
            <YAxis title='bbbbb' position='middle' tickValues={DATA.map((d) => d.result)} tickFormat={(v) => v} />
          </XYPlot>
        )

      case 'Barra': 
        return (
          <XYPlot
            width={width}
            height={height}
          >
            {horizontalLines && <HorizontalGridLines />}
            {verticalLines && <VerticalGridLines />}
            
            <VerticalBarSeries
              color={getColor(color)}
              data={DATA.map((d, index) => {
                return (
                  { x: index + 1, y: d.result}
                )
              })}
            />

            <XAxis title='aaaa' position='middle' tickValues={DATA.map((d) => d.releaseDate)} tickFormat={(v) => v} />
            <YAxis title='bbbbb' position='middle' tickValues={DATA.map((d) => d.result)} tickFormat={(v) => v} />
          </XYPlot>
        )

      case 'Area':
        return (
          <XYPlot
            width={width}
            height={height}
          >
            {horizontalLines && <HorizontalGridLines />}
            {verticalLines && <VerticalGridLines />}

            <XAxis title='aaaa' position='middle' tickValues={DATA.map((d) => d.releaseDate)} tickFormat={(v) => v} />
            <YAxis title='bbbbb' position='middle' tickValues={DATA.map((d) => d.result)} tickFormat={(v) => v} />

            <AreaSeries
              curve={curve}
              color={getColor(color)}
              data={DATA.map((d, index) => {
                return (
                  { x: index + 1, y: d.result}
                )
              })}
            />
          </XYPlot>
        )

      case 'Linha e Pontos':
        return (
          <XYPlot
            width={width}
            height={height}
          >
            {horizontalLines && <HorizontalGridLines />}
            {verticalLines && <VerticalGridLines />}

            <XAxis title='aaaa' position='middle' tickValues={DATA.map((d) => d.releaseDate)} tickFormat={(v) => v} />
            <YAxis title='bbbbb' position='middle' tickValues={DATA.map((d) => d.result)} tickFormat={(v) => v} />
            
            <LineMarkSeries
              curve={curve}
              color={getColor(color)}
              data={DATA.map((d, index) => {
                return (
                  { x: index + 1, y: d.result}
                )
              })}
            />
          </XYPlot>
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
