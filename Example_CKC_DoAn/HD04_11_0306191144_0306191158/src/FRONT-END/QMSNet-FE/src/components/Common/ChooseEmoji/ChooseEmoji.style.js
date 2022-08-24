import styledComponents from "styled-components";


export const ChooseEmojiWrapper = styledComponents.div`


position: relative;
z-index: 9;
.icons__list{
    background: white;
    padding: 1rem 2rem;
    right: -100px;
    border: thin solid rgba(0,0,0,0.2);
    border-radius: 10px;
    bottom: 35px;
    position: absolute;
    p{
        margin-bottom: .5rem;
        font-weight: 500;
    }
}



label{
    display:none;
}

.emoji:focus + label{
    display: block;
}



.emoji{
    width: 0;
    height: 0;
    outline: none;
    border: unset;

}
.reactions{

    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    row-gap: 10px;
    column-gap: 10px;
    span{
        font-size: 25px;
        cursor: pointer;
    }

}
`;