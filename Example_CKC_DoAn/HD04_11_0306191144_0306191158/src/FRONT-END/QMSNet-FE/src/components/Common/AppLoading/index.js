import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'


const AppLoadingWrapper = styled.div`
            position: fixed;
            inset: 0;
            z-index: 99999999999999;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
            img{
                width: 200px;
            }
`

const AppLoading = props => {
    return (
        <AppLoadingWrapper >
            <img src="/assets/images/logo.png" alt="logo" />
        </AppLoadingWrapper>
    )
}

AppLoading.propTypes = {}



export default AppLoading