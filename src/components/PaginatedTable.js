import React, {Component, Fragment} from 'react'
import PropTypes from 'prop-types'
import { Section, Title, Subtitle, Container, Table, Tag, Pagination, Page, PageLink, PageControl, PageEllipsis, PageList } from 'bloomer'

import {PER_PAGE} from '../constants'

class PaginatedTable extends Component {
  state = {
    limit: PER_PAGE,
    offset: 0
  }

  componentWillReceiveProps({data}) {
    if (data === null) {
      this.setState({limit: PER_PAGE, offset: 0})
    }
  }

  render() {
    const {offset, limit} = this.state
    const {data, columns} = this.props

    return (
      <div>
        {data === null
          ? 'Carregando...'
          : <Fragment>
              <Table isStriped isNarrow style={{width: '100%'}}>
                <thead>
                  <tr>
                    {columns.map((c, key) => <th key={key}>{c.label}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {data.slice(offset, limit).map((item, idx) => (
                    <tr key={idx}>
                      {columns.map((c, key) => {
                        if (c.renderer) {
                          return c.renderer(item, key)
                        }

                        return <td key={key}>{item[c.value]}</td>
                      })}
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
    )
  }
}

export default PaginatedTable
