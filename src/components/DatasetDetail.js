import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import { Section, Title, Subtitle, Container, Table, Tag, Pagination, Page, PageLink, PageControl, PageEllipsis, PageList } from 'bloomer'

import {PER_PAGE} from '../constants'

class DatasetDetail extends Component {
  state = {
    limit: PER_PAGE,
    offset: 0
  }

  componentWillReceiveProps(nextProps, nextContext) {
    if (nextContext.data === null) {
      this.setState({limit: PER_PAGE, offset: 0})
    }
  }

  render() {
    const {offset, limit} = this.state
    const {data} = this.context

    return (
      <div>
        <Title isSize={4}>Resumo</Title>
        <Subtitle isSize={6}>
          Este é o resumo do conjunto de dados escolhido
        </Subtitle>
        <div>
          {data === null
            ? 'Loading...'
            : <Fragment>
                <Table isStriped isNarrow style={{width: "100%"}}>
                  <thead>
                    <tr>
                      <th>Matrícula</th>
                      <th>MF</th>
                      <th>I.R.A.</th>
                      <th>Frequência</th>
                      <th>TF</th>
                      <th>Renda</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.slice(offset, limit).map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.matricula}</td>
                        <td>{item.mediaFinal}</td>
                        <td>{item.coefRendimento}</td>
                        <td>{item.frequencia}</td>
                        <td>{item.faltas}</td>
                        <td>R$ {item.renda.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Pagination>
                    <PageControl disabled={offset <= 0} onClick={() => offset > 0 && this.setState({offset: offset-PER_PAGE, limit: offset})}>Anterior</PageControl>
                    <PageControl isNext onClick={() => this.setState({offset: limit, limit: limit+PER_PAGE})}>Próxima</PageControl>
                </Pagination>
              </Fragment>
          }
        </div>
      </div>
    )
  }
}

DatasetDetail.contextTypes = {
  data: PropTypes.array
}

export default DatasetDetail
