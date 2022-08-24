import React from 'react'
import PropTypes from 'prop-types'
import { ContainerWrapper } from './Container.style'

const Container = props => {
  return (
      <ContainerWrapper {...props}>
          {props.children}
      </ContainerWrapper>
  )
}

Container.propTypes = {}

export default Container