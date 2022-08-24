import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import useResponsive from '../../../hooks/useResponsive';
import { md, xl } from '../../../constants';

const LayoutWrapper = styled.div`
width: 100%;
${useResponsive`${xl};
padding-right: 5rem;

`}
${useResponsive`${md};
padding-right: 2rem;

`}

margin-top: 10rem;
margin-bottom: 3rem;
padding-right: 10rem;
`;

const Layout = props => {
  return (
    <LayoutWrapper onScroll={props?.onScroll}>
      {props.children}
    </LayoutWrapper>
  )
}

Layout.propTypes = {}

export default Layout