import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import * as d3 from 'd3'

import ChartsSection from '../components/ChartsSection'
import InfoSection from '../components/InfoSection'
import ResultsSection from '../components/ResultsSection'

import {DATASETS, CLASSIFICATION, MINIMUM_WAGE} from '../constants'
import {datasets} from '../data'
import {classifier} from '../data/classifier'


const initialState = {
  selectedDataset: DATASETS.GERAL,
  data: null,
  filters: {
    anoLetivo: null,
    sexo: null,
    tipoEscolaOrigem: null,
    etnia: null 
  },
  filtersData: {
    anoLetivo: null,
    sexo: null,
    tipoEscolaOrigem: null,
    etnia: null 
  },
  approved: null,
  reproved: null,
  dropout: null,
}


const filter = (data, key, value) => {
  if (!value) return data

  console.log("filter", key, value)

  return data.filter(item => item[key] === value)
}


class AppContainer extends Component {

  state = {
    ...initialState
  }

  getFilteredData() {
    const { filters } = this.state
    let { data } = this.state

    console.log(filters)

    data = filter(data, "anoLetivo", filters.anoLetivo)
    data = filter(data, "sexo", filters.sexo)
    data = filter(data, "etnia", filters.etnia)
    data = filter(data, "tipoEscolaOrigem", filters.tipoEscolaOrigem)
    
    console.log(data)

    return data
  }

  getChildContext() {
    return {
      selectedDataset: this.state.selectedDataset,
      data: this.getFilteredData(),
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
      this.setState({data: dsv.parse(raw, d => {
        return {
          matricula: d.Matricula,
          mediaFinal: +d.Media_Final,
          faltas: +d.Faltas,
          renda: +d.Renda,
          salarios: Math.floor(+d.Renda/MINIMUM_WAGE),
          coefRendimento: +d.CoefRendimento,
          frequencia: +d.Frequencia,
          sexo: d.Sexo ? d.Sexo.toUpperCase() : '',
          etnia: d.Etnia,
          tipoEscolaOrigem: d.Tipo_Escola_Origem,
          anoLetivo: d.AnoLetivo || d['Ano Letivo'],
        }
      })}, () => {
        this.collectFiltersData()
        this.analyzeData()
      })
    })
  }

  collectFiltersData = () => {
    const { data } = this.state

    const values = data.reduce((obj, item) => {
      obj.anoLetivo.push(item.anoLetivo)
      obj.sexo.push(item.sexo)
      obj.tipoEscolaOrigem.push(item.tipoEscolaOrigem)
      obj.etnia.push(item.etnia)
      return obj
    }, {
      anoLetivo: [],
      sexo: [],
      tipoEscolaOrigem: [],
      etnia: [] 
    })

    this.setState({
      filtersData: {
        anoLetivo: Array.from(new Set(values.anoLetivo)),
        sexo: Array.from(new Set(values.sexo)),
        tipoEscolaOrigem: Array.from(new Set(values.tipoEscolaOrigem)),
        etnia: Array.from(new Set(values.etnia))
      }
    })
  }

  analyzeData = () => {
    const data = this.getFilteredData()

    const results = data.reduce((results, item, idx) => {
      const classification = classifier(item)

      if (classification === CLASSIFICATION.DROPOUT) {
        results.dropout.push(idx)
      } else if (classification === CLASSIFICATION.REPROVED) {
        results.reproved.push(idx)
      } else {
        results.approved.push(idx)
      }

      return results
    }, {
      approved: [],
      reproved: [],
      dropout: []
    })

    this.setState({...results});
  }

  handleFilterChanged = (key, value) => {
    const {filters} = this.state

    this.setState({
      filters: {
        ...filters,
        [key]: value
      },
      approved: [],
      reproved: [],
      dropout: []
    }, this.analyzeData.bind(this))
  }

  render() {
    const { filters, filtersData } = this.state

    return (
      <Fragment>
        <InfoSection
          datasets={datasets}
          filters={filters}
          filtersData={filtersData}
          handleFilterChanged={this.handleFilterChanged.bind(this)}
          handleDatasetSelected={this.handleDatasetSelected.bind(this)}
        />
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