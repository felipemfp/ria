import React from 'react'
import PropTypes from 'prop-types'
import ChartContainer from './ChartContainer'
import { Section, Title, Subtitle, Container, Columns, Heading, Column, Box } from 'bloomer'
import {BarChart, LineChart, Line, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer} from 'recharts'

const ChartGeneral = ({title},{results}) => {
  const data = results.approved && results.reproved && results.dropout ? [
    {name: 'Aprovação', value: results.approved.length},
    {name: 'Reprovação', value: results.reproved.length},
    {name: 'Evasão', value: results.dropout.length}
  ] : null

  return (
    <div>
      <Heading>{title}</Heading>
        {data === null
        ? 'Carregando...'
        : 
          <ChartContainer>
            <PieChart>
              <Pie data={data} label>
              <Cell key={`cell-0`} fill="#23d160" />
              <Cell key={`cell-1`} fill="#ffdd57" />
              <Cell key={`cell-2`} fill="#ff3860" />
              </Pie>
              <Tooltip/>
            </PieChart>
          </ChartContainer>
        }
    </div>
  )
}

ChartGeneral.contextTypes = {
  results: PropTypes.object,
}

export default ChartGeneral
