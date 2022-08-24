import React from 'react'
import PropTypes from 'prop-types'
import { SidebarWrapper } from './Sidebar.style'

const Siderbar = props => {
  return (
      <SidebarWrapper {...props} style={props.style}>
          {props.children}
      </SidebarWrapper>
  )
}

Siderbar.propTypes = {}

export default Siderbar