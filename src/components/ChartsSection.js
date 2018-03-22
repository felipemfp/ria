import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Section, Title, Subtitle, Container, Columns, Heading, Column, Box } from 'bloomer'

import ChartGeneral from './charts/ChartGeneral'
import ChartGender from './charts/ChartGender'
import ChartIncome from './charts/ChartIncome'
import ChartIncomeFrequencyGpa from './charts/ChartIncomeFrequencyGpa'

const ChartsSection = () => {
  return (
    <Section>
      <Container>
        <Title isSize={4}>Gráficos</Title>
        <Subtitle isSize={6}>Veja um pouco mais com esses gráficos</Subtitle>
        <Columns>
          <Column isSize="1/2">
            <Box>
              <ChartGeneral title="Distribuição Geral" />
            </Box>
          </Column>
          <Column isSize="1/2">
            <Box>
              <ChartGender title="Distribuição por Sexo" />
            </Box>
          </Column>
        </Columns>
        <Columns>
          <Column isSize="1/2">
            <Box>
              <ChartIncome title="Distribuição por Renda" />
            </Box>
          </Column>
          <Column isSize="1/2">
            <Box>
              <ChartIncomeFrequencyGpa title="Relação Renda x I.R.A. x Frequência" />
            </Box>
          </Column>
        </Columns>
      </Container>
    </Section>
  )
}
export default ChartsSection
