import styled from "styled-components";

export const RequestCardWrapper = styled.div`
    border: thin solid rgba(0,0,0,0.2);
    border-radius:4px;
    width: 100%;
    img{
        width: 100%;
        object-fit:contain;
    }
    .actions{
        padding: 1rem;
        .name{
            font-size: 1.8rem;
            margin-bottom: 2rem;
            font-weight: 600;
        }
        button{
            width: 100%;
            &+button{
                margin-top: 1rem;
            }
        }
    }
    .name:hover{
        cursor: default;
        text-decoration: underline;
    }

`;
