import styledComponents from "styled-components";

export const MessageWrapper = styledComponents.div`
    display: flex;
    gap: .5rem;
    align-items: center;
    .ant-avatar{
        flex-shrink:0;
    }
& + &{
    margin-bottom: .5rem;
}    
    justify-content:${props => props['attr-type'] === "me" ? 'right;' : 'initial;'}
    .more-icon{

        display:none;
    }
    &:hover{
        .more-icon{
            display:block;
        }
    }

   
    &.me{
      
        margin-right: 1rem;
        .ant-image{
            order: 2;
        }
    }

    .like{
        width: 50px;
        height: 50px;
    }
        

    
    .content{
        max-width: 200px;
        background: ${props => props['attr-background']};
        color: ${props => props['attr-color']};
        padding: 1rem;
        font-size: 1.5rem;
        border-radius:15px;
        word-break: break-word;


    }
    .deleted{
        opacity: .8;
        color: black;
        background: white;
        border: thin solid rgba(0,0,0,0.2);
    }

    .image{
        width: 150px;
        height:150px;
        object-fit: contain;
        border: thin solid rgba(0,0,0,0.2);
    }
`;