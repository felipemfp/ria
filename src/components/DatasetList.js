import React from 'react'
import { Section, Title, Subtitle, Container, Menu, MenuLabel, MenuList, MenuLink } from 'bloomer'

const DatasetList = () => {
  return (
    <div>
      <Title isSize={4}>Datasets</Title>
      <Subtitle isSize={6}>Escolha um dos conjuntos de dados abaixo</Subtitle>

      <div>
      <Menu>
        <MenuLabel>Geral</MenuLabel>
        <MenuList>
          <li><MenuLink isActive>IFRN 2015.1</MenuLink></li>
          <li><MenuLink>IFRN 2015.2</MenuLink></li>
        </MenuList>
        <MenuLabel>Diretorias</MenuLabel>
        <MenuList>
          <li><MenuLink>DIATINF 2015.1</MenuLink></li>
          <li><MenuLink>DIATINF 2015.2</MenuLink></li>
          <li><MenuLink>DIAREN 2015.1</MenuLink></li>
          <li><MenuLink>DIAC 2015.1</MenuLink></li>
        </MenuList>
        <MenuLabel>Cursos</MenuLabel>
        <MenuList>
          <li><MenuLink>Análise e Desenvolvimento de Sistemas 2015.1</MenuLink></li>
          <li><MenuLink>Análise e Desenvolvimento de Sistemas 2015.2</MenuLink></li>
          <li><MenuLink>Gestão Pública 2015.1</MenuLink></li>
        </MenuList>
      </Menu>
      </div>
    </div>
  )
}

export default DatasetList
