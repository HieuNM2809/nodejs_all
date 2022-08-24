import styled from "styled-components";

export const NotifyModalWrapper = styled.div`
    position: fixed;
    z-index: 9999999999999;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0,0,0,0.5);

    
    .content{
        background: white;
        width: 500px;
        padding: 2rem;
        border-radius: 10px;
        user-select: none;
        -webkit-box-shadow:0px 3px 15px 5px rgba(62,66,66,0.22);
        -moz-box-shadow: 0px 3px 15px 5px rgba(62,66,66,0.22);
        box-shadow: 0px 3px 15px 5px rgba(62,66,66,0.22);
        text-align: center;
        position: relative;
        .anticon{
            position: absolute;
            right: 1rem;
            font-size: 2rem;
            cursor: pointer;
            top: 1rem;
        }

    }


.action-image{
    width: 120px;
    height: 120px;
    &.success{
        margin-bottom: 1rem;
        width: 90px;
        height: 90px;

    }


}



.title{
    font-size: 3rem;
    font-weight: bold;
}
.message{
    opacity: .6;
    font-weight: 500;
    margin-top: 1rem;
    font-size: 1.6rem;
}

.copyPass{
    font-size: 2rem;
    user-select: all;
    font-weight: 600;
    padding: 1rem;
    background: rgba(0,0,0,0.1);
    margin-top: 1rem;
}

.actions{
    button{
        display: inline-block;
    }
    margin-top: 2rem;
}
`;