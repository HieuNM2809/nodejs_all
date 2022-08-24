import styledComponents from "styled-components";

export const CommentInputWrapper = styledComponents.div`
    margin: 1.5rem 0;
    margin-bottom:0;    
    border-top: 1px solid rgba(0,0,0,0.1);

    .ant-input-affix-wrapper{
        padding: 1rem 0;
    }
    .ant-input-prefix{
        cursor: pointer;
        margin-right: 1rem;
    }

    button{
        padding-right: 0;
        font-weight: 600;
    }

    .disable-comment{
        input{
            &::placeholder{
                padding: 0 1rem;
            }
            background: rgba(0,0,0,0.06);
        }
    }
`;