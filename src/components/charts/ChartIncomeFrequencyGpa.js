import React from 'react'
import PropTypes from 'prop-types'
import ChartContainer from './ChartContainer'
import { Heading } from 'bloomer'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

const precisionRound = (number, precision) => {
  const factor = Math.pow(10, precision);
  return Math.round(number * factor) / factor;
}

const median = (values) => {
  const half = Math.floor(values.length / 2)

  if (values.length % 2) {
    return values[half]
  } else {
    return (values[half-1] + values[half]) / 2.0
  }
}

const getDataRendFrequenciaByRenda = (dataset) => {
  const data = {}
  const reducer = (data, item) => {
    if (!item.salarios) {
      return data
    }

    if (!data[item.salarios]) {
      data[item.salarios] = {
        frequencia: [],
        ira: [],
        name: `${item.salarios} salários`
      }
    }

    data[item.salarios].ira.push(item.coefRendimento)
    data[item.salarios].frequencia.push(item.frequencia)
    
    return data
  }

  dataset.reduce(reducer, data)

  return Object.values(data).map(item => ({
    ...item,
    ira: precisionRound(median(item.ira), 2),
    frequencia: precisionRound(median(item.frequencia), 2)
  }))
}


const ChartIncomeFrequencyGpa = ({ title }, { data: dataset }) => {
  const data = dataset ?
    getDataRendFrequenciaByRenda(dataset)
  : null

  return (
    <div>
        <Heading>{title}</Heading>
        {data === null
          ? 'Carregando...'
          : <ChartContainer>
              <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="ira" name="I.R.A." stroke="#209cee" />
                <Line type="monotone" dataKey="frequencia" name="Frequência" stroke="#00D1B2" />
              </LineChart>
          </ChartContainer>
        }
    </div>
  )
}

ChartIncomeFrequencyGpa.contextTypes = {
  data: PropTypes.array,
}

export default ChartIncomeFrequencyGpa
