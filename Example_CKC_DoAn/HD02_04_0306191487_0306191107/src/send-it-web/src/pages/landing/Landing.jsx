import React from 'react';
import styled from 'styled-components';

//CSS
import './flexboxgrid.min.css';
import './index.css';

// Assets
import HeaderImage from '../../assets/goldenbags.jpg';
import QuotesIcon from '../../assets/svg/Quotes';
import Dots from '../../assets/svg/Dots';
import TopNavbar from '../../components/top_nav_bar/TopNavBar';
import FullButton from './FullButton';

const Landing = () => {
  return (
    <>
      <TopNavbar />
      <Header />
    </>
  );
};

const Header = () => {
  return (
    <Wrapper id='home' className='container flexSpaceCenter'>
      <LeftSide className='flexCenter'>
        <div>
          <h1 className='extraBold font60'>Send everything that you want.</h1>
          <HeaderP className='font13 semiBold'>
            Our apps are open source and support reproducible builds. This means
            that anyone can independently verify that our code on GitHub is the
            exact same code that was used to build the apps you download from
            App Store or Google Play.
          </HeaderP>
          <BtnWrapper>
            <FullButton title='Get Started' />
          </BtnWrapper>
        </div>
      </LeftSide>
      <RightSide>
        <ImageWrapper>
          <Img
            className='radius8'
            src={HeaderImage}
            alt='office'
            style={{ zIndex: 9 }}
          />
          <QuoteWrapper className='flexCenter radius8'>
            <QuotesWrapper>
              <QuotesIcon />
            </QuotesWrapper>
            <div>
              <p className='font15 whiteColor'>
                <em>
                  I like how it's easy to use and scale out to a team or to a
                  company. It helps a lot that it's basically free to use.
                </em>
              </p>
              <p
                className='font13 textRight'
                style={{ marginTop: '10px', color: '#fff' }}
              >
                Ralph Pros
              </p>
            </div>
          </QuoteWrapper>
          <DotsWrapper>
            <Dots />
          </DotsWrapper>
        </ImageWrapper>
        <GreyDiv className='lightBg'></GreyDiv>
      </RightSide>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding-top: 80px;
  width: 100%;
  min-height: 840px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;
const LeftSide = styled.div`
  width: 50%;
  height: 100%;
  @media (max-width: 960px) {
    width: 100%;
    order: 2;
    margin: 50px 0;
    text-align: center;
  }
  @media (max-width: 560px) {
    margin: 80px 0 50px 0;
  }
`;
const RightSide = styled.div`
  width: 50%;
  height: 100%;
  @media (max-width: 960px) {
    width: 100%;
    order: 1;
    margin-top: 30px;
  }
`;
const HeaderP = styled.div`
  max-width: 470px;
  padding: 15px 0 50px 0;
  line-height: 1.5rem;
  @media (max-width: 960px) {
    padding: 15px 0 50px 0;
    text-align: center;
    max-width: 100%;
  }
`;
const BtnWrapper = styled.div`
  max-width: 190px;
  @media (max-width: 960px) {
    margin: 0 auto;
  }
`;
const GreyDiv = styled.div`
  width: 30%;
  height: 700px;
  position: absolute;
  top: 0;
  right: 0;
  z-index: 0;
  @media (max-width: 960px) {
    display: none;
  }
`;
const ImageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  position: relative;
  z-index: 9;
  @media (max-width: 960px) {
    width: 100%;
    justify-content: center;
  }
`;
const Img = styled.img`
  width: 426px;
  height: auto;
  object-fit: contain;
  @media (max-width: 560px) {
    width: 426px;
    height: auto;
    object-fit: contain;
  }
`;
const QuoteWrapper = styled.div`
  background-color: #322e3f;
  position: absolute;
  left: 0;
  bottom: 50px;
  max-width: 330px;
  padding: 30px;
  z-index: 99;
  @media (max-width: 960px) {
    left: 20px;
  }
  @media (max-width: 560px) {
    bottom: -50px;
  }
`;
const QuotesWrapper = styled.div`
  position: absolute;
  left: -20px;
  top: -10px;
`;
const DotsWrapper = styled.div`
  position: absolute;
  right: -100px;
  bottom: 100px;
  z-index: 2;
  @media (max-width: 960px) {
    right: 100px;
  }
  @media (max-width: 560px) {
    display: none;
  }
`;

export default Landing;
