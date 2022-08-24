import styledComponents from "styled-components";

export const CommentWrapper = styledComponents.div`
    margin-top: 12px;
    .actor{
        font-size: 1.5rem;
    }
    .avatar-card{
        align-items: start!important;
    }
    .likes, .reply{
        font-weight: 700;
        opacity: .6;
    }
    svg{
        width: 12px;
        height: 12px;
        cursor: pointer;
    }

    .content{
        white-space: pre-wrap;
        
    }

   

    
    .actions{
        font-weight: 500;
        opacity:.7;
        cursor: pointer;
        margin-top:1rem;
        font-size: 1.2rem;
        &-more{
            display: none;
        }
        &:hover{
            .actions-more{
                display: block;
            }

        }
    }
    .replys{
        cursor: pointer;
        font-size: 1.3rem;
        font-weight: 600;
        opacity: .8;
        align-items: center;
        margin-top: .5rem;
        .divider{
            width: 20px;
            height: 2px;
            opacity: .8;
            background: black;
        }
    }
`;