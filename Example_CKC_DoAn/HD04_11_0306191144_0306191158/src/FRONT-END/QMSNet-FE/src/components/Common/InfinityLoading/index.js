import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useSelector } from 'react-redux';

const InfinityLoadingWrapper = styled.div`
position: absolute;
width: 100%;
top: 7.5rem;
    font-weight: bold;
    font-family: sans-serif;
    font-size: 30px;
    padding-bottom: 8px;
    background:linear-gradient(90deg, rgba(157,193,43,1) 0%, rgba(115,121,9,1) 100%, rgba(18,198,217,1) 100%, rgba(0,212,255,1) 100%) bottom left/0% 3px no-repeat;
    animation:c2 0.5s linear infinite;
  @keyframes c2 {to{background-size: 100% 3px}}
`;
const InfinityLoading = props => {
    const { loading } = useSelector(state => state.user);
    return loading && <InfinityLoadingWrapper></InfinityLoadingWrapper>

}

InfinityLoading.propTypes = {}

export default InfinityLoading