import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Section, Title, Subtitle, Container, Columns, Heading, Column, Box } from 'bloomer'
import {BarChart, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer} from 'recharts'

const ChartContainer = styled.div`
  height: 20em;
`

const data01 = [
  {name: 'Aprovação', M: 4000, F: 2400},
  {name: 'Reprovação', M: -3000, F: 1398},
  {name: 'Evasão', M: -2000, F: -9800},
];

const data02 = [
  {name: 'Aprovação', value: 400},
  {name: 'Reprovação', value: 300},
  {name: 'Evasão', value: 278},
]

const getCountBySexo = (data, dataset) => {
  return data.reduce((count, index) => {
    if (dataset[index].sexo === 'F') {
      count.F += 1
    } else if (dataset[index].sexo === 'M') {
      count.M += 1
    }
    return count
  }, {M: 0, F: 0})
}

const ChartsSection = (props, {results, data}) => {
  const dataBar = data && results.approved && results.reproved && results.dropout ? [
    {name: 'Aprovação', ...getCountBySexo(results.approved, data)},
    {name: 'Reprovação', ...getCountBySexo(results.reproved, data)},
    {name: 'Evasão', ...getCountBySexo(results.dropout, data)}
  ] : null

  const dataPie = results.approved && results.reproved && results.dropout ? [
    {name: 'Aprovação', value: results.approved.length},
    {name: 'Reprovação', value: results.reproved.length},
    {name: 'Evasão', value: results.dropout.length}
  ] : null

  return (
    <Section>
      <Container>
        <Title isSize={4}>Gráficos</Title>
        <Subtitle isSize={6}>Veja um pouco mais com esses gráficos</Subtitle>
        <Columns>
          <Column isSize="1/2">
            <Box>
              <Heading>Situação geral por sexo</Heading>
              {dataBar === null
                ? 'Loading'
                : <ChartContainer>
                    <ResponsiveContainer>
                    <BarChart data={dataBar} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                      <XAxis dataKey="name"/>
                      <YAxis/>
                      <CartesianGrid strokeDasharray="3 3"/>
                      <Tooltip/>
                      <Legend />
                      <ReferenceLine y={0} stroke='#000'/>
                      <Bar dataKey="F" name="Feminino" fill="#8884d8" />
                      <Bar dataKey="M" name="Masculino" fill="#82ca9d" />
                    </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
              }
            </Box>
          </Column>
          <Column isSize="1/2">
            <Box>
              <Heading>Distribuição geral</Heading>
              {dataPie === null
                ? 'Loading...'
                : 
                  <ChartContainer><ResponsiveContainer> 
                    <PieChart>
                      <Pie data={dataPie} label>
                        <Cell key={`cell-0`} fill="#23d160" />
                        <Cell key={`cell-1`} fill="#ffdd57" />
                        <Cell key={`cell-2`} fill="#ff3860" />
                      </Pie>
                      <Tooltip/>
                    </PieChart>
                  </ResponsiveContainer></ChartContainer>
              }
            </Box>
          </Column>
        </Columns>
      </Container>
    </Section>
  )
}

ChartsSection.contextTypes = {
  results: PropTypes.object,
  data: PropTypes.array
}

export default ChartsSection
