import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Section, Container, Columns, Column } from 'bloomer'

import DatasetList from './DatasetList'
import DatasetDetail from './DatasetDetail'

class InfoSection extends Component {
  render() {
    const {selectedDataset} = this.context
    const {handleDatasetSelected, datasets, filters, filtersData, handleFilterChanged} = this.props

    return (
      <Section>
        <Container>
          <Columns>
            <Column isSize='1/4'>
              <DatasetList selected={selectedDataset} data={datasets} handleSelected={handleDatasetSelected} />
            </Column>
            <Column isSize='3/4'>
              <DatasetDetail filters={filters} filtersData={filtersData} handleFilterChanged={handleFilterChanged} />
            </Column>
          </Columns>
        </Container>
      </Section>
    )
  }
}

InfoSection.contextTypes = {
  selectedDataset: PropTypes.string,
  data: PropTypes.array
}

export default InfoSection
