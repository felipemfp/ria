import React from 'react'
import PropTypes from 'prop-types'
import ChartContainer from './ChartContainer'
import { Section, Title, Subtitle, Container, Columns, Heading, Column, Box } from 'bloomer'
import {BarChart, LineChart, Line, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer} from 'recharts'

const getCountByGender = (data, dataset) => {
  return data.reduce((count, index) => {
    if (dataset[index].sexo === 'F') {
      count.F += 1
    } else if (dataset[index].sexo === 'M') {
      count.M += 1
    }
    return count
  }, {M: 0, F: 0})
}

const ChartGender = ({title},{results, data: dataset}) => {
  const data = dataset && results.approved && results.reproved && results.dropout ? [
    {name: 'Aprovação', ...getCountByGender(results.approved, dataset)},
    {name: 'Reprovação', ...getCountByGender(results.reproved, dataset)},
    {name: 'Evasão', ...getCountByGender(results.dropout, dataset)}
  ] : null

  return (
    <div>
      <Heading>{title}</Heading>
      {data === null
        ? 'Carregando...'
        : <ChartContainer>
            <BarChart data={data} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
              <XAxis dataKey="name"/>
              <YAxis/>
              <CartesianGrid strokeDasharray="3 3"/>
              <Tooltip/>
              <Legend />
              <ReferenceLine y={0} stroke='#000'/>
              <Bar dataKey="F" name="Feminino" fill="#209cee" />
              <Bar dataKey="M" name="Masculino" fill="#00D1B2" />
            </BarChart>
          </ChartContainer>
      }
    </div>
  )
}

ChartGender.contextTypes = {
  results: PropTypes.object,
  data: PropTypes.array
}

export default ChartGender
