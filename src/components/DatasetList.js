import React from 'react'
import { Title, Subtitle, Menu, MenuLabel, MenuList, MenuLink } from 'bloomer'

import {DATASET_GROUPS} from '../constants'


const LinkList = ({data, datasets, selected, handleSelected}) => {
  return (
    <MenuList>
    {data.map(datasetId => (
      <li key={datasetId}>
        <MenuLink
          isActive={selected === datasetId}
          onClick={() => handleSelected(datasetId)}>
          {datasets[datasetId].name}
        </MenuLink>
      </li>
    ))}
    </MenuList>
  )
}

const DatasetList = ({data, ...props}) => {
  return (
    <div>
      <Title isSize={4}>Datasets</Title>
      <Subtitle isSize={6}>Escolha um dos conjuntos de dados abaixo</Subtitle>

      <div>
      <Menu>
        <MenuLabel>Geral</MenuLabel>
        <LinkList data={DATASET_GROUPS.GERAL} datasets={data} {...props} />
        <MenuLabel>Específicos</MenuLabel>
        <LinkList data={DATASET_GROUPS.ESPECIFICOS} datasets={data} {...props} />
      </Menu>
      </div>
    </div>
  )
}

export default DatasetList
