const { createGlobalStyle } = require('styled-components');

export const GlobalStyle = createGlobalStyle`

*{
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

html{
    font-size: 62.5%;
}

body{
    
    font-size: 1.4rem;
    background: rgba(240,242,245,1);
}

.color-change {
	-webkit-animation: color-change 2s linear alternate both;
	        animation: color-change 2s linear alternate both;
}

@-webkit-keyframes color-change {
    0% {
      background: rgba(0,0,0,0.2);
    }
    100% {
      background: unset;
    }
  }
  @keyframes color-change {
    0% {
      background: rgba(0,0,0,0.2);
    }
    100% {
      background: unset;
    }
  }
  

i{
    
    &.close-icon{
        background-image: url(/assets/images/image1.png);
    background-position: 0px -48px;
    background-size: 26px 158px;
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    display: inline-block;
    }
}

ul,li{
    padding:0;
    margin:0;
    box-sizing: border-box;
    list-style-type: none;
}

  
  a{
    text-decoration: none;
  }
  
  
  img{
    display: inline-block;
    max-width: 100%;
  }

  .video-preview-modal{
    position: fixed;
    inset: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999999999999999999999999999999999999999999;
    .mark{
        position: absolute;
        inset: 0;
        background: rgba(0,0,0,0.3);
        
    }
    video{
        z-index: 1;
    }
    .anticon-close{
        position: absolute;
        right: 40px;
        color: white;
        top: 30px;
        font-size: 30px;
    }

}
  
  .section-title{
    padding: 1rem 0;
    font-size: 1.6rem;
    font-weight: 600;
    opacity: .6;
    text-transform: uppercase;
}

.box-shadow{
    border: thin solid rgba(0,0,0,.15);
}


.ant-modal-wrap{
    z-index:1000000;
}


.ant-btn-primary{
    background: ${(style) => style.theme.blueClr};
    border-color: ${(style) => style.theme.blueClr};
}

.ant-btn-primary[disabled]{
    background: #1890ff8c;
    color: white;   
    &:hover{
        background: #1890ff8c;
    color: white;  
    }
}

.username{
    color: ${(style) => style.theme.headingTextClr};
    font-size: 1.6rem;
    font-weight: 600;   
}
.ant-select-dropdown{
    z-index:9999999999999999999;
}

.search-loading{
    text-align: center;
    margin: 0 auto;
    display: block;
    margin-top: 10rem;

}

.q-button{
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    svg{
        width: 20px !important;
        height: 20px !important;
    }
    font-weight: 600;
    &:focus{
        color: white;
        background: ${(style) => style.theme.blueClr};
    }
    &:hover{
        background: ${(style) => style.theme['fds_blue60']};
    }
    
    
    &.button-primary{
    }
    &-outline{
        background: ${(style) => style.theme['secondary']};
        outline: none;
        border: none;
        &:hover{
            background: ${(style) => style.theme['fds_gray20']};
            color: initial;
        }
        &:focus{
            color: initial;
            background: ${(style) => style.theme['fds_gray20']};
        }

    }
    &-success{
        background: ${(style) => style.theme['successClr']};
        outline: none;
        border: none;
        &:hover{
            background: ${(style) => style.theme['fds_green55']};
            color: white;
        }
        &:focus{
            color: white;
            background: ${(style) => style.theme['fds_green55']};
        }

    }
}


}

.ant-modal-header{
    .ant-modal-title{
        font-size: 2rem;
        font-weight: 700;

    }
    text-align: center;
}

.post-modal{
    .ant-modal-content{

        border-radius: 20px;
    }
}
.new-post-modal{
    
    
    .ant-modal-footer{
        button{
            width: 100%;
        } 
            
    }

    .ant-modal-body{
        padding:1rem 2rem;
    }
    .scope{
        
        .ant-select-selector{
            &:hover,.ant-select-focused{
                border: thin solid transparent;
                box-shadow: none;
            }
            border-radius: 5px;
            background: #E4E6EB;
            .ant-select-selection-item{
            font-weight: 500;
                font-size: 1.3rem;
            }

        }
    }

    
    
    label[for="post-content"]{
        height: 300px;
        font-size: 1.9rem;
        display:inline-block;
        width: 100%;
        margin-bottom:1rem;
        
        p{
            position: relative;
            text-align: center;
            top:50%;
            transform: translateY(-50%);
            
            &::after{
                content: "|";
                animation: myText .5s  infinite alternate; 
                visibility: hidden;
            }
            
            
        }
    }
    
    #post-content:focus + label[for="post-content"]{
        p{
            padding: 1rem;
            &::after{
                visibility: visible;
            }
        }
    }

    .content{
        width: 100%;
        font-size: 1.9rem;
        outline: none;
        border-color: transparent;
        box-shadow: none;
        &:hover{
            border-color: transparent;
            box-shadow: none;
            outline: none;

        }
    }

    .hide-input{
        margin: 0 !important;
        outline: none;
        border-color: transparent;
        box-shadow: none;
        width: 0;
        height:0;
        
    }

    .ant-radio-button-wrapper{
        padding: 0;
    }
    .ant-radio-button-wrapper + .ant-radio-button-wrapper{
        margin-left: 1rem;

    }

    svg{
        cursor: pointer;
    }
}

.ant-image-preview-mask{
    z-index: 99999999;
}
.ant-image-preview-wrap{
    z-index: 99999999;

}

.q-date-picker{
    z-index: 9999999;
}

.ant-message{
    z-index: 999999999;
}

// EDIT-PROFILE-MODAL

.edit-profile-modal{
    .edit-title{
        font-size: 1.8rem;
        font-weight: 600;
    }
    .ant-btn.ant-btn-link{
        font-size: 1.6rem;

    }

    .edit-preview{
        margin: 1rem 0;
        .ant-space{
            min-height: 35px;
            align-items: start;
            width: 100%;
            img:not(img[alt="works"]):not(img[alt="phone"]):not(img[alt="mail"]):not(img[alt="dob"]){
                opacity:.5;
            }
            svg{
                opacity:.5;
    
            }
            img,svg{
                width: 25px;
                height: 25px;
            }
        }
    }
}
.edit-detail-profile-modal{
    .edit-title{
        font-size: 1.8rem;
        font-weight: 600;
    }
    & > .ant-modal-content > .ant-modal-body{
        padding: 10px 0;
        padding-bottom: 0;
    }
}

.ant-avatar{
    border: 1px solid rgba(0,0,0,0.2);
    img{
        object-fit: cover;
    }
}


.message-action-more{
    .ant-popover-inner{
        border-radius: 10px;
        background: black;
        .ant-row{
            .ant-col{
                cursor: pointer;
                color: white;

            }
        }

    }
    .ant-popover-arrow-content{
        &::before{

            background: black;
        }
    }
}



.postActions{
    z-index: 1000000;
    font-size: 16px;
    img, svg{
        width: 20px;
        height: 20px;
    }
    .ant-popover-inner-content{
        padding: 1rem;
        border-radius:10px;
        min-width:300px;

    }
    .ant-row{
        gap: 1rem;
        align-items: center;
        padding:1rem 1rem;
        cursor: pointer;
        &:hover{
            background: rgba(0,0,0,0.08);
        }
        .ant-col{
            font-weight: 500;
            display: flex;
            align-items: center;
        }
    }
}

.follow-modal{
    .ant-modal-body{
        padding: 1rem 2.4rem;
    }
    .ant-modal-content,.ant-modal-header{
        border-radius: 20px;
    }
    .follows{
        height: 500px;
        overflow: auto;
    }
}

.text-content{
    font-size: 16px !important;
}

.text-content{
    margin: 1rem 0;
    white-space: pre-line;
    font-size: 1.6rem;
    &.collapse{
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 5;
        display: -webkit-box;
        -webkit-box-orient: vertical;
    }
    &.with-style{
        text-align: center;
        word-break: break-all;
        user-select: none;
        font-weight: 700;
        font-size: 3rem!important;
        display: flex;
        justify-content: center;
        align-items: center;
        min-height:400px;
        padding: 3rem;
    }
    

}



.ant-carousel{
    img,video{
        min-height: 400px;
        max-height: 600px;
        object-fit: contain;
    }

}

.ant-picker-date-panel {
    width: 100%;
}


// Message

.ant-message{
    top: 0;
}
.ant-message-notice{
    padding: 0;
}
.ant-message-notice-content{
    background: rgba(0,0,0,0.7);
    color: white;
    user-select: none;
    font-size: 1.6rem;
    padding: 1rem;
    width: 100%;
    svg{
        font-size: 18px;
    }
}



.header-dropdown{
    .ant-dropdown-menu-item{
        padding: .5rem 2rem;
    }
    .ant-dropdown-menu-title-content{
        font-size: 1.6rem;
    }
svg{
    width: 2rem;
    height: 2rem;
}
}





.scale-in-center {
	-webkit-animation: scale-in-center 0.1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
	        animation: scale-in-center 0.1s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}





.jello-horizontal{-webkit-animation:jello-horizontal .9s both;animation:jello-horizontal .9s both}
/* ----------------------------------------------
 * Generated by Animista on 2022-6-12 21:56:8
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

@-webkit-keyframes jello-horizontal{0%{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}30%{-webkit-transform:scale3d(1.25,.75,1);transform:scale3d(1.25,.75,1)}40%{-webkit-transform:scale3d(.75,1.25,1);transform:scale3d(.75,1.25,1)}50%{-webkit-transform:scale3d(1.15,.85,1);transform:scale3d(1.15,.85,1)}65%{-webkit-transform:scale3d(.95,1.05,1);transform:scale3d(.95,1.05,1)}75%{-webkit-transform:scale3d(1.05,.95,1);transform:scale3d(1.05,.95,1)}100%{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}}@keyframes jello-horizontal{0%{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}30%{-webkit-transform:scale3d(1.25,.75,1);transform:scale3d(1.25,.75,1)}40%{-webkit-transform:scale3d(.75,1.25,1);transform:scale3d(.75,1.25,1)}50%{-webkit-transform:scale3d(1.15,.85,1);transform:scale3d(1.15,.85,1)}65%{-webkit-transform:scale3d(.95,1.05,1);transform:scale3d(.95,1.05,1)}75%{-webkit-transform:scale3d(1.05,.95,1);transform:scale3d(1.05,.95,1)}100%{-webkit-transform:scale3d(1,1,1);transform:scale3d(1,1,1)}}



.heartbeat {
	-webkit-animation: heartbeat .5s ease-in-out  both;
	        animation: heartbeat .5s ease-in-out  both;
}
/* ----------------------------------------------
 * Generated by Animista on 2022-6-12 21:53:59
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation heartbeat
 * ----------------------------------------
 */
@-webkit-keyframes heartbeat {
  from {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: center center;
            transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  10% {
    -webkit-transform: scale(0.91);
            transform: scale(0.91);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  17% {
    -webkit-transform: scale(0.98);
            transform: scale(0.98);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  33% {
    -webkit-transform: scale(0.87);
            transform: scale(0.87);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  45% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
}
@keyframes heartbeat {
  from {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-transform-origin: center center;
            transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  10% {
    -webkit-transform: scale(0.91);
            transform: scale(0.91);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  17% {
    -webkit-transform: scale(0.98);
            transform: scale(0.98);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
  33% {
    -webkit-transform: scale(0.87);
            transform: scale(0.87);
    -webkit-animation-timing-function: ease-in;
            animation-timing-function: ease-in;
  }
  45% {
    -webkit-transform: scale(1);
            transform: scale(1);
    -webkit-animation-timing-function: ease-out;
            animation-timing-function: ease-out;
  }
}







@keyframes myText {
    from {opacity:0}
    to {opacity:1}
  }



}
.scale-up-center {
	-webkit-animation: scale-up-center 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
	        animation: scale-up-center 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both;
}
/* ----------------------------------------------
 * Generated by Animista on 2022-6-5 16:37:8
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation scale-up-center
 * ----------------------------------------
 */
@-webkit-keyframes scale-up-center {
  0% {
    -webkit-transform: scale(0.5);
            transform: scale(0.5);
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
}
@keyframes scale-up-center {
  0% {
    -webkit-transform: scale(0.5);
            transform: scale(0.5);
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
  }
}

/* ----------------------------------------------
 * Generated by Animista on 2022-6-30 11:7:58
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info. 
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

/**
 * ----------------------------------------
 * animation scale-in-center
 * ----------------------------------------
 */
@-webkit-keyframes scale-in-center {
  0% {
    -webkit-transform: scale(0);
            transform: scale(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 1;
  }
}
@keyframes scale-in-center {
  0% {
    -webkit-transform: scale(0);
            transform: scale(0);
    opacity: 1;
  }
  100% {
    -webkit-transform: scale(1);
            transform: scale(1);
    opacity: 1;
  }
}



`;
