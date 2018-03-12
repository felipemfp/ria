import React from 'react'
import { Section, Title, Subtitle, Container, Columns, Column } from 'bloomer'
import Prediction from './Prediction'

const ResultsSection = () => {
  return (
    <Section>
      <Container>
        <Columns>
          <Column isSize='1/3'>
            <Prediction color="success" title="Tendem a serem aprovados" data={3251} />
          </Column>
          <Column isSize='1/3'>
            <Prediction color="warning" title="Tendem a serem reprovados" data={854} />
          </Column>
          <Column isSize='1/3'>
            <Prediction color="danger" title="Tendem a evadirem" data={199} />
          </Column>
        </Columns>
      </Container>
    </Section>
  )
}

export default ResultsSection
