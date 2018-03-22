import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Section, Title, Button, Icon, Subtitle, Container, Heading, Notification, Modal, ModalBackground, ModalContent, ModalCard, ModalCardBody, ModalCardHeader, ModalCardTitle, Delete } from 'bloomer'

import PaginatedTable from './PaginatedTable'

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
        <Notification isColor={color} hasTextAlign="centered" onClick={() => this.setState({isModalActive: true})}>
          <Title isSize={6}>
            {title}
          </Title>
          <Title isSize={1}>{data ? data.length : 'Loading...'}</Title>
        </Notification>
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
