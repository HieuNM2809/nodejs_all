import styledComponents from "styled-components";

export const RequestWrapper = styledComponents.div`
border: 1px solid rgba(0,0,0,0.15);
margin: 1rem 0;
padding:2rem 1rem;
    background: ${(style) => style.theme.bg};
    .request-actions{
        margin-top: 2rem;
    }
    
`;