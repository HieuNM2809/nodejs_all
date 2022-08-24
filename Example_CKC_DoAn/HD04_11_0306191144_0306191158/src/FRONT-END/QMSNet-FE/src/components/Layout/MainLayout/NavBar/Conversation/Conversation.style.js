import styledComponents from "styled-components";

export const ConversationWrapper = styledComponents.div`
    color: black;
    .unRead{
        .conversation__content{

            flex: 1;
        }
        
        .username{
            font-weight: 600 !important;
            
        }
        .message{
            color: ${(style) => style.theme['fds_blue60']} ;
            font-weight: 500;
            span{
                
                font-weight: 400;
                color: initial;
            }
        }
        .dot{
            display: block !important;
            width: 10px;
            height: 10px;
            background: ${(style) => style.theme['fds_blue60']} ;
            border-radius: 50%;
        }
    }
    .header{
        display:flex;
        justify-content:space-between;
        align-items:center;
        
        .create-icon{
            color: black;
            cursor: pointer;
            path{
                color: black !important;
            }
         
            fill: black!important;
            width: 20px;
            height: 20px;
        }

    }
    .ant-input-affix-wrapper{
        margin-bottom: 1rem;
    }
    .body{  
        

        .conversation{
            sup{
                width: 10px;
                height: 10px;
            }
        padding: 1rem;
        margin 0 -1rem;
        cursor: pointer;
        display: flex;
        gap: 1rem;
        align-items: center;
        .dot{
            display: none;
        }
        &:hover{
            background: rgba(0,0,0,0.08);
        }
        .username{
            font-weight: 400;


        }
        border-radius:1rem;

        font-weight: 400;

        }

        
        .ant-avatar{
            width: 50px;
            height: 50px;
            border-radius:50%;
        }
        .message{
            font-size: 1.3rem;
            opacity:.8;
            display: flex;

            &-left{

                -webkit-line-clamp: 1;
                word-break: break-all;
                -webkit-box-orient: vertical;
                overflow: hidden;
                display: -webkit-box;
            }
            span{
                flex-shrink:0;
            }
        }
    }

`;