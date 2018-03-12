import React from 'react'
import { Section, Title, Subtitle, Container, Columns, Column } from 'bloomer'

import DatasetList from './DatasetList'
import DatasetDetail from './DatasetDetail'

const InfoSection = () => {
  return (
    <Section>
      <Container>
        <Columns>
          <Column isSize='1/3'>
            <DatasetList />
          </Column>
          <Column isSize='2/3'>
            <DatasetDetail />
          </Column>
        </Columns>
      </Container>
    </Section>
  )
}

export default InfoSection
