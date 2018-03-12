import React from 'react'
import { Footer as BFooter, Container, Content, Columns, Column, Icon } from 'bloomer'

const Footer = () => {
  return (
    <BFooter id='footer'>
      <Container>
        <Content>
          <Columns>
            <Column isSize='full'>
              <p>
                Feito com <Icon hasTextColor="danger" className="fa fa-heart"></Icon> 
                por <a>Felipe Pontes</a>
              </p>
            </Column>
          </Columns>
          <Content isSize='small'>
            <p>Este projeto é licenciado sob <a target="_blank">MIT</a>.</p>
          </Content>
        </Content>
      </Container>
    </BFooter>
  )
}

export default Footer
