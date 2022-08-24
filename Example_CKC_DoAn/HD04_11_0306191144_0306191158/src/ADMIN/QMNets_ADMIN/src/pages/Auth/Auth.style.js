import styledComponents from "styled-components";

export const AuthWrapper = styledComponents.div`
    text-align: center;
    height:100vh;
    position: relative;
    left: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    font-size: 1.6rem;
    align-items: center;
    transform: translateX(-50%);
    .pseudo{
        position: absolute;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: black;
        z-index: -1;
        opacity: .6;
    }

    .main__box__logo{
        img{
            width: 100px;
        }
        margin: 2rem auto;
        margin-bottom: 1rem;

    }

    video{
        left: 0;
        width: 100vw;
        height: 100vh;
        object-fit: cover;
        z-index:-2;
        position: absolute;
    }


    button{
        display: block;
        width: 100%;
        border-radius: 2px;
        font-weight: 500;
    }


    .forgot__button{
        font-size: 12px;
        margin-top: 1rem;
        a{
            color: #385185;

        }
    }


    .social__button{
        cursor: pointer;
        color: #385185;
        font-weight: 600;
    }

    .navigate{
        a{
            font-weight: 600;

        }
    }
    }

`;