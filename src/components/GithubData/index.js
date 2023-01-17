import React from 'react'
import { Label, Row } from './styles';

export function GithubData({ avatar, owner, stars, license }) {
  return (
    <Row>
      <img src={avatar} width='50px' height='50px' alt={owner} style={{ borderRadius: '50px', marginRight: '12px'}}/>
      <Label>Dono do repo: {owner}</Label>
      <Label>Estrelas: {stars}</Label>
      <Label>Licença: {license}</Label>
    </Row>
  )
}
