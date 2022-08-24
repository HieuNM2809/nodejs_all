import styledComponents from "styled-components";

export const ConversationPopupWrapper = styledComponents.div`
    position: fixed;
    right: 2rem;
    bottom: 2rem;
    .conversation-hidden{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-bottom: 1rem;
        cursor: pointer;
        img{
            width: 50px;
            height: 50px;
            border-radius:50%;
            border: thin solid rgba(0,0,0,0.2);
        }

    }
    .create-conversation-btn{
        width: 50px;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border: thin solid rgba(0,0,0,0.1);
        box-shadow: 2px 4px 10px rgba(0,0,0,0.5);
        border-radius:50%;
        background: white;

    }

    .conversation-list{
        position: absolute;
        right:8rem;
        bottom: -1rem;
        display: flex;
        gap: 1rem;
    }

    
`;