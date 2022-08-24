import styled from "styled-components";

export const FriendWrapper = styled.div`
margin-top: 10rem;
margin-bottom: 5rem;
.section-title{
    color: black;
    opacity: 1;
    font-size: 1.8rem;
    margin-bottom: 1rem;
}

& > .ant-row + .ant-row-space-between{
    border-top: 2px solid rgba(0,0,0,0.3);
    padding-top:1rem;
    margin-top: 4rem;
    .ant-row{

    }
    
}
.ant-row{
   
    & > .q-button-outline{
        width: 100%;
        margin-top: 2rem;
        font-size: 2rem;
        color: ${props=>props.theme['fds_blue60']};
        
    }
}


`;