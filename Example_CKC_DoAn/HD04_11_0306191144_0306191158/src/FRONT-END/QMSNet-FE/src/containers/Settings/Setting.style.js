import styled from "styled-components";

export const SettingWrapper = styled.div`
    background: white;
    border: thin solid rgba(0,0,0,0.2);
    border-radius:5px;
    .ant-tabs-ink-bar {
        height: 5px;
        background: transparent;
      }
      
      .ant-tabs-ink-bar::after {
        content: " ";
        position: absolute;
        left: 100%;
        right: 0;
        bottom: 0;
        height: 100%;
        background: black;
        width: 4px;
        transform: translateX(-50%);
      }
    .ant-tabs{

        
        .ant-tabs-tab{
            img{
                width: 30px;
                height: 30px;
                margin-right: 10px;
            }
            & + .ant-tabs-tab{
                margin-top: 0;

            } 
            padding: 15px 24px;
            &:hover{
                background: rgba(0,0,0,0.05);
                .ant-tabs-tab-btn{
                    color: initial;
                }
            }
            font-size: 1.6rem;
            &-active{
                .ant-tabs-tab-btn{
                    
                    color: black;
                }

            }
        }

        .ant-tabs-content-holder{
        }
    }
`;