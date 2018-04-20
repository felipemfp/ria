import React, { Component } from 'react'
import { Dropdown, DropdownTrigger, DropdownMenu, Button, Icon, DropdownContent, DropdownItem } from 'bloomer'


export default class Filter extends Component {

  state = {
    isActive: false
  }

  render() {
    const { title, values, value, handler } = this.props
    const { isActive } = this.state

    return (
      <Dropdown isActive={isActive} isAlign="right">
        <DropdownTrigger>
          <Button isOutlined aria-haspopup="true" aria-controls="dropdown-menu" onClick={() => this.setState({isActive: !isActive})}>
            <span>{value ? `${title}: ${value}` :  title}</span>
            <Icon icon="angle-down" isSize="small" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu>
          <DropdownContent>
            <DropdownItem href="#" isActive={value === null} onClick={() => {handler(null); this.setState({isActive: false})}} >Todos</DropdownItem>
            {values && values.sort().map((item, idx) => <DropdownItem key={idx} href="#" isActive={item === value} onClick={() => {handler(item); this.setState({isActive: false})}} >{item}</DropdownItem>)}
          </DropdownContent>
        </DropdownMenu>
      </Dropdown>
    )
  }
}
