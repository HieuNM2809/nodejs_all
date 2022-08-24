import styledComponents from "styled-components";

export const NavBarWrapper = styledComponents.div`
    .pseudo{
        position: fixed;
        inset: 0;
        z-index:-1;

    }
    .ant-row{
        .icon{
            position: relative;
        }
        .badge{
            z-index:1 ;
            position: absolute;
            background: red;
            color: white;
            width:20px;
            height:20px;
            border-radius: 50%;
            display:flex;
            align-items: center;
            justify-content: center;
            top: -10px;
            right: 5px;
        }
        padding: 2rem 1rem;
        padding-right: 2rem;
        cursor: pointer;
        margin-left: -2.3rem !important;
        margin-right: -2rem !important;
        color: ${(style) => style.theme.headingTextClr};
        font-weight: 600;
        opacity: .7;
        border-left: 3px solid transparent;
        &+.ant-row{
            border-top: 1px solid rgba(0,0,0,0.1);
        }
        &.active{
            opacity: 1;
            svg{
                fill: ${(style) => style.theme.blueClr};
                path{
                    color: ${(style) => style.theme.blueClr};
                    
                }
            }
            color: ${(style) => style.theme.blueClr};
            border-left: 4px solid ${(style) => style.theme.blueClr};
            background: rgba(0,0,0,0.02);
            &.popup > .navbar__item__content{
                display: block;
            }
        }
       

        .navbar__item__content{
            overflow-y:scroll;
            position: absolute;
            width: 360px;
            display:none;
            height: 100vh;
            left: 100%;
            padding: 1rem 2rem;
            background: white;
            top: -10rem;
            opacity: 1;
            cursor: auto;
            
            border: 1px solid rgba(0,0,0,0.2);

            &::-webkit-scrollbar {
                width: 8px;
              }
              
        &::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.2); 
        
          border-radius: 10px;
        }
            .title{
                font-size: 2.5rem;
                font-weight: bold;
                color: black;
                margin: 1rem 0;
            }
        }
    }

`;