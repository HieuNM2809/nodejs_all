import React from 'react'
import PropTypes from 'prop-types'
import { AvatarCardWrapper } from './AvatarCard.style'
import { Avatar, Badge, Col } from 'antd'

const AvatarCard = props => {
    return (
        <>
            <AvatarCardWrapper className={`avatar-card ${props?.className}`} wrap={false} style={props.style} align="top" gutter={[12, 12]} onClick={props?.onClick}>
                {!props.avatarHidden && <Col>

                    <Badge status="success" dot={props?.showDot} offset={[-9, 30]}>
                        <Avatar src={props.src}>
                        </Avatar>
                    </Badge>

                </Col>}


                <Col flex={1}>
                    {props.content}
                </Col>
            </AvatarCardWrapper>
            {props.children}
        </>
    )
}

AvatarCard.propTypes = {
    src: PropTypes.string,
    avararHidden: PropTypes.bool,
}

AvatarCard.defaultProps = {
    src: '',
    avararHidden: false
}

export default AvatarCard