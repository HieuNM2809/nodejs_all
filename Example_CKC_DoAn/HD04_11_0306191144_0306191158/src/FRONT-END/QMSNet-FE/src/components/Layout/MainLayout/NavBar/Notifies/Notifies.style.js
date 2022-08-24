import styledComponents from "styled-components";

export const NotifiesWrapper = styledComponents.div`
.notify-history{
    color: black;
    display: flex;
    justify-content: space-between;
    align-items: center;
    &-title{
        font-size: 1.7rem;
        font-weight: 500;
    }
    &-remove{
        cursor: pointer;
        font-weight: 400;
        color: ${props=>props.theme.blueClr}
    }

}

.notify-type{
    display: flex;
    align-items: center;
    gap: 2rem;
    margin: 1rem 0;
    color: black;
    .type{
        
        cursor: pointer;
        padding: .5rem 1rem;
    }
    .type.active{
        border-radius: 20px;
        background: #DBE7F2;
        color: ${props=>props.theme.blueClr}
    }
}

.notify-list{
    margin 1rem 0;
}

`;