import React from 'react'
import { Spin } from 'antd'
import { OverlayLoadingWrapper } from './customLoading.style';

export default (props) => {
  return (
    <OverlayLoadingWrapper>
      <Spin />
    </OverlayLoadingWrapper>
  )
}

