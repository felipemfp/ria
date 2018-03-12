import React from 'react'
import { Section, Title, Subtitle, Container, Heading, Notification } from 'bloomer'

const Prediction = ({title, color, data}) => {
  return (
    <Notification isColor={color} hasTextAlign='centered'>
      <Title isSize={6}>{title}</Title>
      <Title isSize={1}>{data}</Title>
    </Notification>
  )
}

export default Prediction
