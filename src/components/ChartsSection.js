import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Section, Title, Subtitle, Container, Columns, Heading, Column, Box } from 'bloomer'
import {BarChart, LineChart, Line, Bar, ReferenceLine, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer} from 'recharts'

const ChartContainer = styled.div`
  height: 20em;
`

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

const ChartsSection = (props, {results, data}) => {
  const dataSexo = data && results.approved && results.reproved && results.dropout ? [
    {name: 'Aprovação', ...getCountBySexo(results.approved, data)},
    {name: 'Reprovação', ...getCountBySexo(results.reproved, data)},
    {name: 'Evasão', ...getCountBySexo(results.dropout, data)}
  ] : null

  const dataRenda = data && results.approved && results.reproved && results.dropout ?
    getDataByRenda(data, results)
  : null

  const dataRendaRendFrequencia = data ?
    getDataRendFrequenciaByRenda(data)
  : null

  const dataGeral = results.approved && results.reproved && results.dropout ? [
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
              <Heading>Distribuição geral</Heading>
              {dataGeral === null
                ? 'Carregando...'
                : 
                  <ChartContainer><ResponsiveContainer> 
                    <PieChart>
                      <Pie data={dataGeral} label>
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
          <Column isSize="1/2">
            <Box>
              <Heading>Distribuição por sexo</Heading>
              {dataSexo === null
                ? 'Carregando...'
                : <ChartContainer>
                    <ResponsiveContainer>
                    <BarChart data={dataSexo} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                      <XAxis dataKey="name"/>
                      <YAxis/>
                      <CartesianGrid strokeDasharray="3 3"/>
                      <Tooltip/>
                      <Legend />
                      <ReferenceLine y={0} stroke='#000'/>
                      <Bar dataKey="F" name="Feminino" fill="#209cee" />
                      <Bar dataKey="M" name="Masculino" fill="#00D1B2" />
                    </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
              }
            </Box>
          </Column>
        </Columns>
        <Columns>
          <Column isSize="1/2">
            <Box>
              <Heading>Distribuição por renda</Heading>
              {dataRenda === null
                ? 'Carregando...'
                : <ChartContainer>
                    <ResponsiveContainer>
                    <BarChart data={dataRenda} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                      <XAxis dataKey="name"/>
                      <YAxis/>
                      <CartesianGrid strokeDasharray="3 3"/>
                      <Tooltip/>
                      <Legend />
                      <ReferenceLine y={0} stroke='#000'/>
                      <Bar dataKey="approved" name="Aprovação" fill="#23d160" />
                      <Bar dataKey="reproved" name="Reprovação" fill="#ffdd57" />
                      <Bar dataKey="dropout" name="Evasão" fill="#ff3860" />
                    </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
              }
            </Box>
          </Column>
          <Column isSize="1/2">
            <Box>
              <Heading>Relação Renda x I.R.A. x Frequência</Heading>
              {dataRendaRendFrequencia === null
                ? 'Carregando...'
                : <ChartContainer>
                    <ResponsiveContainer>
                    <LineChart data={dataRendaRendFrequencia} margin={{top: 5, right: 30, left: 20, bottom: 5}}>
                      <XAxis dataKey="name"/>
                      <YAxis/>
                      <CartesianGrid strokeDasharray="3 3"/>
                      <Tooltip/>
                      <Legend />
                      <Line type="monotone" dataKey="ira" name="I.R.A." stroke="#209cee"/>
                      <Line type="monotone" dataKey="frequencia" name="Frequência" stroke="#00D1B2" />
                    </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
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
