import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { Button, Carousel as CarouselAntd } from 'antd';
import { LeftCircleFilled, RightCircleFilled } from '@ant-design/icons';
import styled from 'styled-components';

const CarouselWrapper = styled.div`
    position: relative;
    border-top: 1px solid rgba(0,0,0,0.2);
    
    .slick-track{
        display: flex !important;
        align-items:center;
    }
    
    .actions{
        position: absolute;
        top:50%;
        svg{
            width: 30px;
            height: 30px;
            
        }
        transform: translateY(-50%); 
        &.next{
            right: 10px;
        }
        &.prev{
            left: 10px;
        }
    }
`;

const Carousel = ({ media, controlColor = "black" }) => {
    const carouselRef = useRef();
    return (media?.length > 0 && <CarouselWrapper>
        <CarouselAntd ref={carouselRef}>
            {media?.map((media) => media?.url.match('/image/') ? <img key={media?.url} src={media?.url} alt={media?.url} /> : <video controls key={media?.url} >
                <source src={media?.url} type="video/mp4" />
            </video>)}
        </CarouselAntd>
        {media.length > 1 && <> <Button className="actions next" type="text" onClick={() => {
            carouselRef.current.next();
        }}><RightCircleFilled style={{
            fill: controlColor,
            color: controlColor
        }} /></Button>
            <Button className="actions prev" type="text" onClick={() => {
                carouselRef.current.prev();
            }}><LeftCircleFilled style={{
                fill: controlColor,
                color: controlColor
            }} /></Button></>}

    </CarouselWrapper>)
}

Carousel.propTypes = {}

export default Carousel