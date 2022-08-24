import styledComponents from "styled-components";
export const SearchWrapper = styledComponents.div`

    .search-history{
        padding: 2rem 0;
        color: black;
        display: flex;
        justify-content: space-between;
        align-items: center;
        &-title{
            font-size: 1.7rem;
            font-weight: 500;
        }
        .remove-search-history{
            cursor: pointer;
            font-weight: 400;
            color: ${props=>props.theme.blueClr}
        }
        
    }
    
    .search-history-list{
        
        
        
    }

   
`;