import React, {Fragment} from 'react'
import { Section, Title, Subtitle, Container, Menu, MenuLabel, MenuList, MenuLink } from 'bloomer'

const DatasetList = ({selected, data, handleSelect}) => {
  return (
    <div>
      <Title isSize={4}>Datasets</Title>
      <Subtitle isSize={6}>Escolha um dos conjuntos de dados abaixo</Subtitle>

      <div>
      <Menu>
        {Object.keys(data).map(label => {
          return (
            <Fragment>
              <MenuLabel>{label}</MenuLabel>
              <MenuList>
                {data[label].map(dataset => {
                  return <li><MenuLink isActive={selected && dataset.id === selected.id} onClick={() => handleSelect(dataset)}>{dataset.name}</MenuLink></li>
                })}
              </MenuList>
            </Fragment>
          )
        })}
      </Menu>
      </div>
    </div>
  )
}

export default DatasetList
