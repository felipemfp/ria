import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import { Section, Title, Subtitle, Container, Table, Tag, Pagination, Page, PageLink, PageControl, PageEllipsis, PageList } from 'bloomer'

import PaginatedTable from './PaginatedTable'

class DatasetDetail extends Component {
  render() {
    const {data} = this.context

    return (
      <div>
        <Title isSize={4}>Resumo</Title>
        <Subtitle isSize={6}>
          Este é o resumo do conjunto de dados escolhido
        </Subtitle>

        <PaginatedTable 
          data={data}
          columns={[{
            label: 'Matrícula',
            value: 'matricula'
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
