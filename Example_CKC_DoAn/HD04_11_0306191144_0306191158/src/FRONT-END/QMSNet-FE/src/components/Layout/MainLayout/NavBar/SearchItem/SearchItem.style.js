import styledComponents from "styled-components";

export const SearchItemWrapper = styledComponents.div`
display: flex;
align-items: center;
gap: 2rem;
color: black;
font-weight: 400;
.content{
    font-size: 15px;
    flex: 1;
    
}
padding: 1.2rem 1rem;
margin: 0 -1rem;
border-radius: 10px;
&:hover{
    background: rgba(0,0,0,0.1);

}
cursor: pointer;






`;