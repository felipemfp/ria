import React from 'react'
import { Hero, HeroHeader, HeroBody, Container, Title } from 'bloomer'

const Header = () => {
  return (
    <Hero isColor='info'>
      <HeroBody>
        <Container hasTextAlign='centered'>
          <Title isSize={1}>RIA</Title>
        </Container>
      </HeroBody>
    </Hero>
  )
}

export default Header
