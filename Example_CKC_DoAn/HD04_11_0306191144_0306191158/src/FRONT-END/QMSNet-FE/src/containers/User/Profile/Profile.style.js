import styledComponents from "styled-components";

export const ProfileWrapper = styledComponents.div`


.header-profile{
    .ant-avatar{
        width: 130px;
        height: 130px;
        border-radius:50%;
        margin-right: .8rem;

    }
    user-select: none;
    .username{
        font-size: 3rem;
        text-decoration: none;
        font-weight: 700;
        letter-spacing: .2rem;
    }
    .fullname{
        opacity: .6;
        font-weight: 500;
        font-size: 1.8rem;
    }
    svg{
        width: 25px;
        height: 25px;
    }

    &__right{
        button{
            height: 100%;
        }

        .q-button{
            padding: 1rem 2rem;
            min-width: 150px;
        }
    }
}

.about{
    position: sticky;
    .story{
        p{
            font-size: 1.6rem;
            margin: 1rem 0;
            margin-bottom: 2rem;
            text-align: center;
        }
    }
    
    .ant-space{
        min-height: 35px;
        align-items: start;
        width: 100%;
        img:not(img[alt="works"]):not(img[alt="phone"]):not(img[alt="mail"]):not(img[alt="dob"]){
            opacity:.5;
        }
        svg{
            opacity:.5;

        }
        img,svg{
            width: 25px;
            height: 25px;
        }
    }
}
`;