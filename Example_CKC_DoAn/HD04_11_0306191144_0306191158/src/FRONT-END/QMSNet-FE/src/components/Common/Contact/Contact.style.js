import styledComponents from "styled-components";

export const ContactWrapper = styledComponents.div`
border-radius: 10px;
padding: 5px 10px;
position: relative;
margin: 0 -10px;

sup{
    width: 10px;
    height: 10px;
    
}
&:hover{
    .pseudo{
        display: flex;
    }
}
cursor: pointer;
.pseudo{
    &::before{
        position: absolute;
        content: "";
        background: black;
        width: 20px;
        height: 100%;
        top: 0;
        background: transparent;
        right: -20px;
        display: block;
    }
    sup{
        width: 20px;
        height: 20px;
        
    }
    span{
        font-weight: 600;
    }
    display: none;
    z-index: 1;
    left: -360px;
    transform: translateY(-50%);
    background: white;
    border: thin solid rgba(0,0,0,0.2);
    position: absolute;
    width: 350px;
    padding: 2rem;
    flex-wrap: nowrap;
    gap: 2rem;
    .stats,.email{
        img{
            margin-right: 10px;
            width: 15px;
            height: 15px;
        }
    }
   
    .username{
        font-size: 2.5rem;
        line-height: 1;
        .name{
            &:hover{
                text-decoration: underline;
            }
        }
        .fullname{
            font-weight: 500;
            font-size: 1.6rem;
    
        }

    }
   
    img{
        border: thin solid rgba(0,0,0,0.15);
        width: 100%;
        border-radius: 50%;
    }
    
}


&:hover{
    background: rgba(0,0,0,0.1);

}

`;