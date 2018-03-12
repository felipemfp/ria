import React from 'react'
import { Section, Title, Subtitle, Container, Table } from 'bloomer'

const data = [
  ['Ryu Paiva', '87,2', '25', 'R$ 3000,00', '85,62', '74%'],
  ['Ken Nascimento', '64,2', '3', 'R$ 1333,00', '63,03', '91%'],
  ['Akuma Silva', '72,2', '11', 'R$ 16200,00', '61,96', '87%']
]

const DatasetDetail = () => {
  return (
    <div>
      <Title isSize={4}>Resumo</Title>
      <Subtitle isSize={6}>Este é o resumo do conjunto de dados escolhido</Subtitle>
      <div>
        <Table isStriped isNarrow style={{width: "100%"}}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Média Final</th>
              <th>Faltas</th>
              <th>Renda</th>
              <th>Coeficiente</th>
              <th>Frequência</th>
            </tr>
          </thead>
          <tbody>
            {data.map(arr => <tr>{arr.map(v => <td>{v}</td>)}</tr>)}
            {data.map(arr => <tr>{arr.map(v => <td>{v}</td>)}</tr>)}
            {data.map(arr => <tr>{arr.map(v => <td>{v}</td>)}</tr>)}
            {data.map(arr => <tr>{arr.map(v => <td>{v}</td>)}</tr>)}
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default DatasetDetail
