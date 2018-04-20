import React from 'react'
import PropTypes from 'prop-types'
import { Section, Container, Columns, Column } from 'bloomer'
import Prediction from './Prediction'

const ResultsSection = (props, {results}) => {

  return (
    <Section>
      <Container>
        <Columns>
          <Column isSize="1/3">
            <Prediction color="success" title="Tendem a serem aprovados" data={results && results.approved} />
          </Column>
          <Column isSize="1/3">
            <Prediction color="warning" title="Tendem a serem reprovados" data={results && results.reproved} />
          </Column>
          <Column isSize="1/3">
            <Prediction color="danger" title="Tendem a evadirem" data={results && results.dropout} />
          </Column>
        </Columns>
      </Container>
    </Section>
  )
}

ResultsSection.contextTypes = {
  results: PropTypes.object
}

export default ResultsSection
