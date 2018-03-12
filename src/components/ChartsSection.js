import React from 'react'
import { Section, Title, Subtitle, Container, Columns, Heading, Column, Box } from 'bloomer'
import {BarChart, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie} from 'recharts'

const data01 = [
  {name: 'Page A', uv: 4000, pv: 2400, amt: 2400},
  {name: 'Page B', uv: -3000, pv: 1398, amt: 2210},
  {name: 'Page C', uv: -2000, pv: -9800, amt: 2290},
  {name: 'Page D', uv: 2780, pv: 3908, amt: 2000},
  {name: 'Page E', uv: -1890, pv: 4800, amt: 2181},
  {name: 'Page F', uv: 2390, pv: -3800, amt: 2500},
  {name: 'Page G', uv: 3490, pv: 4300, amt: 2100},
];

const data02 = [
  {name: 'Group A', value: 400}, {name: 'Group B', value: 300},
  {name: 'Group C', value: 300}, {name: 'Group D', value: 200},
  {name: 'Group E', value: 278}, {name: 'Group F', value: 189}
]

const ChartsSection = () => {
  return (
    <Section>
      <Container>
        <Title isSize={4}>Gráficos</Title>
        <Subtitle isSize={6}>Veja um pouco mais com esses gráficos</Subtitle>
        <Columns>
          <Column isSize="1/2">
            <Box>
              <Heading>Situação geral</Heading>
              <BarChart width={600} height={300} data={data01} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                <XAxis dataKey="name"/>
                <YAxis/>
                <CartesianGrid strokeDasharray="3 3"/>
                <Tooltip/>
                <Legend />
                <ReferenceLine y={0} stroke='#000'/>
                <Bar dataKey="pv" fill="#8884d8" />
                <Bar dataKey="uv" fill="#82ca9d" />
              </BarChart>
            </Box>
          </Column>
          <Column isSize="1/2">
            <Box>
              <Heading>Distribuição geral</Heading>
              <PieChart width={600} height={300}>
                <Pie isAnimationActive={false} data={data02} outerRadius={80} fill="#8884d8" label/>
                <Tooltip/>
              </PieChart>
            </Box>
          </Column>
        </Columns>
      </Container>
    </Section>
  )
}

export default ChartsSection
