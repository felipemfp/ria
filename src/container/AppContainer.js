import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import * as d3 from 'd3'

import ChartsSection from '../components/ChartsSection'
import InfoSection from '../components/InfoSection'
import ResultsSection from '../components/ResultsSection'

import {DATASETS} from '../constants'
import {datasets} from '../data'


const initialState = {
  selectedDataset: DATASETS.GERAL,
  data: null,
  approved: null,
  reproved: null,
  dropout: null,
}


class AppContainer extends Component {

  state = {
    ...initialState
  }

  getChildContext() {
    return {
      selectedDataset: this.state.selectedDataset,
      data: this.state.data,
      results: {
        approved: this.state.approved,
        reproved: this.state.reproved,
        dropout: this.state.dropout
      }
    }
  }

  componentWillMount() {
    this.loadData();
  }

  handleDatasetSelected = (datasetId) => {
    this.setState({
      ...initialState,
      selectedDataset: datasetId,
    }, this.loadData.bind(this))
  }

  loadData = () => {
    const {selectedDataset} = this.state
    
    d3.text(datasets[selectedDataset].url, (err, raw) => {
      const dsv = d3.dsvFormat(';')
      this.setState({data: dsv.parse(raw)}, this.analyzeData.bind(this))
    })
  }

  analyzeData = () => {
    const {data} = this.state

    // magic goes here
  }

  render() {
    return (
      <Fragment>
        <InfoSection datasets={datasets} handleDatasetSelected={this.handleDatasetSelected.bind(this)} />
        <ResultsSection />
        <ChartsSection />
      </Fragment>
    )
  }
}

AppContainer.childContextTypes = {
  selectedDataset: PropTypes.string,
  data: PropTypes.array,
  results: PropTypes.object
};

export default AppContainer