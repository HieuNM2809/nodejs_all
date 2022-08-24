import styledComponents from "styled-components";

export const ConversationItemWrapper = styledComponents.div`

    border: thin solid rgba(0,0,0,0.2);
    width: 340px;
    border-radius: 10px;
    height: 450px;
    background: white;
    display: flex;
    flex-direction: column;
    .header-new{
        svg{
            color: ${(style)=>style.theme.blueClr};
        }
        .search{
            margin 1rem 0;    
            input{
                outline: none;
                border: none;
                box-shadow: none;
            }
        }
        padding: 1rem;
        
        align-items: center;
        -webkit-box-shadow:0px 2px 4px 0px rgba(62,66,66,0.2);
        -moz-box-shadow: 0px 2px 4px 0px rgba(62,66,66,0.2);
        box-shadow: 0px 2px 4px 0px rgba(62,66,66,0.2);
    }
    .header{
        padding: .5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        -webkit-box-shadow:0px 2px 4px 0px rgba(62,66,66,0.2);
        -moz-box-shadow: 0px 2px 4px 0px rgba(62,66,66,0.2);
        box-shadow: 0px 2px 4px 0px rgba(62,66,66,0.2);
        &-left{
            gap: .5rem;
            align-items: center;
            display: flex;
            .activity-status{
                font-size: 1.2rem;
                opacity: .8;
            }

        }
        &-right{
            span+span{
                margin-left: 1rem;

            }
            svg{
                width: 18px;
                height: 18px;
                opacity: .7;
                cursor: pointer;
            }
        }
    }

    .body{
        padding: .5rem;
        flex: 1;
        overflow-y: auto;
        display: flex;
         flex-direction: column-reverse;
        
    }

    .media-loading{
        width: 25px;
        height: 25px;
    }

    .footer{
        padding: 1rem .5rem;
        display: flex;
        align-items: center;
        gap:1rem;

        .send-icon{
            svg{

                width: 20px;
                height: 20px;
            }

        }
        svg{
            width: 25px;
            height: 25px;
            cursor: pointer;
        }

        .ant-input-affix-wrapper{
            border-radius:10px;
            background: rgba(0,0,0,0.04);
            border: unset;
            &:hover, &:focus, &:focus-within{
                box-shadow: unset;
                
                border: unset;
            }
            input{
                background: initial;
            }
        }
        
        .ant-input-suffix{
            svg{
                width: 20px;
                height: 20px;
                transform: translateY(2px);

            }
        }

        -webkit-box-shadow:0px -1px 4px 0px rgba(62,66,66,0.2);
-moz-box-shadow: 0px -1px 4px 0px rgba(62,66,66,0.2);
box-shadow: 0px -1px 4px 0px rgba(62,66,66,0.2);

    }
`;