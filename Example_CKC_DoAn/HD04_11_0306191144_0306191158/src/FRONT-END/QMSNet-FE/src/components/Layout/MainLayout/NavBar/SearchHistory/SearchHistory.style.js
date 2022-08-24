import styledComponents from "styled-components";

export const SearchHistoryWrapper = styledComponents.div`
display: flex;
align-items: center;
gap: 2rem;
color: black;
font-weight: 400;
.content{
    flex: 1;
    
}
padding: 1.5rem 1rem;
margin: 0 -1rem;
border-radius: 10px;
&:hover{
    background: rgba(0,0,0,0.06);

}
cursor: pointer;

svg{
    color: black;
    fill: black !important;
    opacity: .6;
}

.anticon-clock-circle{
    font-size:2rem;

}


.prefix-icon,.suffix-icon{
    width: 35px;
    height: 35px;
    border-radius:50%;
    line-height: 39px;
    text-align: center;
}
.prefix-icon{
    background: rgba(0,0,0,0.08);
}

`;