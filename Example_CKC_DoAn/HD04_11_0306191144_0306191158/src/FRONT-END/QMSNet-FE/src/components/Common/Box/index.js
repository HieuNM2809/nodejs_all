import React from 'react'
import { BoxWrapper } from './Box.style'

const Box = ({children,style,className,width}) => {
  return (
      <BoxWrapper className={className} style={{
        width: width,
        ...style}}>
          {children}
      </BoxWrapper>
  )
}

export default Box