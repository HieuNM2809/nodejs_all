import styledComponents from "styled-components";
import { sm } from "../../../../constants";
import useResponsive from "../../../../hooks/useResponsive";

export const HeaderWrapper = styledComponents.div`
    padding: 2rem 4rem;
    box-shadow: 0.1rem 0.1rem 0.1rem 0.1rem rgb(0 0 0 / 10%);
position: fixed;
left: 0;
right: 0;
z-index: 999;
background: ${(themes) => themes.theme.bg};
top: 0;


    .header__content{
        &__logo{
            img{
                width: 15rem;
                object-fit: cover;
            }
        }
        &__func{
            &__search{
                width: 30rem;
                & > span{
                    border-radius:8px;
                    background: rgba(0,0,0,0.03);
                    pointer-event: none;
                    
                    svg{
                        background: transparent;

                        opacity: .5;
                    }
                    input{
                        background: initial;
                    }
                }
            }
            &__create-post{
                button{
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    gap: .5rem;
                    border-radius: 8px;
                    font-weight: 500;
                    span{
                            ${useResponsive`${sm};
                            display: none;
                            `}
                        }

                }
                svg{
                    width: 2rem;
                    height: 2rem;
                }
            }
        }
    }


`;