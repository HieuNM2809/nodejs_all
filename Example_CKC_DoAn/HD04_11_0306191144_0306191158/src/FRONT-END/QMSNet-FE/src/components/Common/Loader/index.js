import React from 'react'
import PropTypes from 'prop-types'
import { LoaderWrapper } from './Loader.style'

const Loader = props => {
    return (
        props.loading && <LoaderWrapper className="loader">
            <div
                className="lds-spinner"
                style={{ width: `${props.width || '50px'} `, height: `${props.height || '50px'}` }}
            >
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </LoaderWrapper>
    )
}

Loader.propTypes = {}

export default Loader