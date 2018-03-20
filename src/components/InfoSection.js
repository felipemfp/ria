import React, {Component} from 'react'
import { Section, Title, Subtitle, Container, Columns, Column } from 'bloomer'

import DatasetList from './DatasetList'
import DatasetDetail from './DatasetDetail'

import {datasets} from '../data'

class InfoSection extends Component {
  state = {
    selectedDataset: datasets["Geral"][0]
  }

  handleDatasetSelected = (dataset) => {
    this.setState({
      selectedDataset: dataset
    })
  }

  render() {
    const {selectedDataset} = this.state

    return (
      <Section>
        <Container>
          <Columns>
            <Column isSize='1/3'>
              <DatasetList selected={selectedDataset} data={datasets} handleSelect={this.handleDatasetSelected} />
            </Column>
            <Column isSize='2/3'>
              <DatasetDetail dataset={selectedDataset} />
            </Column>
          </Columns>
        </Container>
      </Section>
    )
  }
}

export default InfoSection
