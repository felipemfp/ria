import React from 'react'
import styled from 'styled-components'
import {ResponsiveContainer} from 'recharts'

const Container = styled.div`
    height: 20em;
`

const ChartContainer = ({children}) => {
  return (
    <Container>
      <ResponsiveContainer>{children}</ResponsiveContainer>
    </Container>
  )
}

export default ChartContainer
