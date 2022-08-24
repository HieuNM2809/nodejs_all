import React from 'react'
import styled from 'styled-components'

const AppLoadingWrapper = styled.div`
            position: fixed;
            inset: 0;
            z-index: 99999999999999;
            background: white;
            display: flex;
            align-items: center;
            justify-content: center;
`

const AppLoading = props => {
    return (
        <AppLoadingWrapper style={{
            position: 'fixed',
            inset: '0',
            zIndex: '9999999999',
            background: 'white',
            display: 'flex',
            alignItems: "center",
            justifyContent: "center"

        }}>
            <img src="/assets/images/logo.png" alt="logo" />
        </AppLoadingWrapper>
    )
}

AppLoading.propTypes = {}

export default AppLoading