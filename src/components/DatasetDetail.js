import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Title, Subtitle, Level, LevelLeft, LevelRight, LevelItem } from 'bloomer'

import PaginatedTable from './PaginatedTable'
import Filter from './Filter'

class DatasetDetail extends Component {

  renderFilter(key, title) {
    const { filters, filtersData, handleFilterChanged} = this.props
    return <Filter title={title} values={filtersData[key]} value={filters[key]} handler={(value) => handleFilterChanged(key, value)} />
  }

  render() {
    const { data } = this.context

    return (
      <div>
        <Title isSize={4}>Dados</Title>
        <Subtitle isSize={6}>
          Este é o conjunto de dados escolhido
        </Subtitle>

        <Level>
          <LevelLeft>
            <Subtitle tag="p" isSize={6}><strong>{data ? data.length : 0}</strong> registros</Subtitle>
          </LevelLeft>

          <LevelRight>
            <LevelItem>
              {this.renderFilter("anoLetivo", "Ano Letivo")}
            </LevelItem>
            <LevelItem>
              {this.renderFilter("sexo", "Sexo")}
            </LevelItem>
            <LevelItem>
              {this.renderFilter("etnia", "Etnia")}
            </LevelItem>
            <LevelItem>
              {this.renderFilter("tipoEscolaOrigem", "Tipo de Escola de Origem")}
            </LevelItem>
          </LevelRight>
        </Level>



        <PaginatedTable 
          data={data}
          columns={[{
            label: 'Matrícula',
            value: 'matricula'
          }, {
            label: 'Ano Letivo',
            value: 'anoLetivo'
          }, {
            label: 'MF',
            value: 'mediaFinal'
          }, {
            label: 'I.R.A.',
            value: 'coefRendimento'
          }, {
            label: 'Frequência',
            value: 'frequencia'
          }, {
            label: 'TF',
            value: 'faltas'
          }, {
            label: 'Renda',
            renderer: (item, key) => <td key={key}>R$ {item.renda.toFixed(2)}</td>
          }, {
            label: 'Sexo',
            value: 'sexo'
          }, {
            label: 'Etnia',
            value: 'etnia'
          }, {
            label: 'Tipo Escola de Origem',
            value: 'tipoEscolaOrigem'
          }]}
        />
      </div>
    )
  }
}

DatasetDetail.contextTypes = {
  data: PropTypes.array
}

export default DatasetDetail
