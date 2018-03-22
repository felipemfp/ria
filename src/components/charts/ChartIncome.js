import React from 'react'
import PropTypes from 'prop-types'
import ChartContainer from './ChartContainer'
import { Section, Title, Subtitle, Container, Columns, Heading, Column, Box } from 'bloomer'
import {BarChart, LineChart, Line, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer} from 'recharts'

const getDataByRenda = (dataset, results) => {
  const data = {}
  const reducer = key => (data, index) => {
    const item = dataset[index]

    if (!item.salarios) {
      return data
    }

    if (!data[item.salarios]) {
      data[item.salarios] = {
        approved: 0,
        reproved: 0,
        dropout: 0,
        name: `${item.salarios} salários`
      }
    }

    data[item.salarios][key] += 1
    
    return data
  }
  
  results.approved.reduce(reducer('approved'), data)
  results.reproved.reduce(reducer('reproved'), data)
  results.dropout.reduce(reducer('dropout'), data)

  return Object.values(data)
}

const ChartIncome = ({title}, {data: dataset, results}) => {
  const data = dataset && results.approved && results.reproved && results.dropout ? getDataByRenda(dataset, results) : null

  return (
    <div>
      <Heading>{title}</Heading>
      {data === null
        ? 'Carregando...'
        : <ChartContainer>
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Legend />
              <ReferenceLine y={0} stroke='#000' />
              <Bar dataKey="approved" name="Aprovação" fill="#23d160" />
              <Bar dataKey="reproved" name="Reprovação" fill="#ffdd57" />
              <Bar dataKey="dropout" name="Evasão" fill="#ff3860" />
            </BarChart>
          </ChartContainer>
      }
    </div>
  )
}

ChartIncome.contextTypes = {
  data: PropTypes.array,
  results: PropTypes.object,
}

export default ChartIncome