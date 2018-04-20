import React, {Component} from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Title, Notification, Modal, ModalBackground, ModalCard, ModalCardBody, ModalCardHeader, ModalCardTitle, Delete } from 'bloomer'

import PaginatedTable from './PaginatedTable'

const ClickableNotification = styled(Notification)`
  cursor: pointer;
`

class Prediction extends Component {

  state = {
    isModalActive: false
  }

  render() {
    const {isModalActive}  = this.state
    const {data: contextData} = this.context
    const {title, color, data} = this.props
    
    return (
      <div>
        <ClickableNotification isColor={color} hasTextAlign="centered" onClick={() => this.setState({isModalActive: true})}>
          <Title isSize={6}>
            {title}
          </Title>
          <Title isSize={1}>{data ? data.length : 'Carregando...'}</Title>
        </ClickableNotification>
        {data && <Modal isActive={isModalActive}>
          <ModalBackground />
          <ModalCard>
            <ModalCardHeader>
              <ModalCardTitle>{title}</ModalCardTitle>
              <Delete onClick={() => this.setState({isModalActive: false})} />
            </ModalCardHeader>
            <ModalCardBody>
              <PaginatedTable
                data={data.map(idx => contextData[idx])}
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
            </ModalCardBody>
          </ModalCard>
        </Modal>}
      </div>
    )
  }

}

Prediction.contextTypes = {
  data: PropTypes.array
}

export default Prediction
