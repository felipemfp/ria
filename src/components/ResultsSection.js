import React from 'react'
import { Section, Title, Subtitle, Container, Columns, Column } from 'bloomer'
import Prediction from './Prediction'

const ResultsSection = () => {
  return (
    <Section>
      <Container>
        <Columns>
          <Column isSize='1/3'>
            <Prediction title="Tendem a serem aprovados" />
          </Column>
          <Column isSize='1/3'>
            <Prediction title="Tendem a serem reprovados" />
          </Column>
          <Column isSize='1/3'>
            <Prediction title="Tendem a evadirem" />
          </Column>
        </Columns>
      </Container>
    </Section>
  )
}

export default ResultsSection
