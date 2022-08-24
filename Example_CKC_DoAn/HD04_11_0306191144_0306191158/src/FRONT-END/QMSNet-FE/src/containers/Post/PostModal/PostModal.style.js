import { Row } from "antd";
import styled from "styled-components";

export const PostModalWrapper = styled(Row)`
    height: 90vh;
    padding-top: 0;
    padding-bottom: 0;

    & > .left{
        .ant-skeleton-avatar{
            width: 100%;
            height: 90vh;
        }
        display: flex;
        background: black;
        flex-direction: column;
        justify-content: center;
        img,video{
            max-height: 90vh;
            object-fit: contain;
        }
        .content-with-style{
            height: 90vh;
            display: flex;
            align-items:center;
            justify-content: center;
            font-size: 3rem;
            white-space: pre-line;
            text-align: center;
            word-break: break-all;
            padding: 2rem;
}
        }
    }
    & > .right{
        max-height: 90vh;
        display: flex;
        flex-direction: column;
        .avatar-card{
            align-items: center;
            .ant-avatar{
                border-radius: 50%;
                border: thin solid rgba(0,0,0,0.1)
                object-fit: contain;
                width: 35px;
                height: 35px;
                margin-right: .5rem;
            }
        }
        .post-detail-header{
            border-bottom: thin solid rgba(0,0,0,0.2)
        }

        .comments{
            &::-webkit-scrollbar {
                display: none;
            }
            flex: 1;
            overflow: auto;
        }
    }
`;