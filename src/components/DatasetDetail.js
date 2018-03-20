import React, {Component, Fragment} from 'react'
import * as d3 from 'd3'
import { Section, Title, Subtitle, Container, Table, Tag, Pagination, Page, PageLink, PageControl, PageEllipsis, PageList } from 'bloomer'


import {PER_PAGE} from '../constants'


class DatasetDetail extends Component {
  state = {
    isLoading: true,
    data: null,
    limit: PER_PAGE,
    offset: 0
  }

  loadData = ({dataset}) => {
    if (!dataset) return

    this.setState({isLoading: true})

    d3.text(dataset.url, (err, raw) => {
      const dsv = d3.dsvFormat(';')
      this.setState({data: dsv.parse(raw), isLoading: false})
    })
  }

  componentDidMount() {
    this.loadData(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.loadData(nextProps)
  }

  render() {
    const {data, isLoading, offset, limit} = this.state
    const {dataset} = this.props

    return (
      <div>
        <Title isSize={4}>Resumo</Title>
        <Subtitle isSize={6}>
          Este é o resumo do conjunto de dados escolhido
          {dataset && <Tag>{dataset.name}</Tag>}
        </Subtitle>
        <div>
          {isLoading
            ? 'Loading...'
            : <Fragment>
                <Table isStriped isNarrow style={{width: "100%"}}>
                  <thead>
                    <tr>
                      {data.columns.slice(0, 5).map(column => <th>{column}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {data.slice(offset, limit).map(item => (
                      <tr>
                        {data.columns.slice(0, 5).map(column => <td>{item[column]}</td>)}
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

export default DatasetDetail
