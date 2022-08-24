import styledComponents from 'styled-components';
import { lg, md } from '../../constants/breakPoint';
import useResponsive from '../../hooks/useResponsive';

export const HomeWrapper = styledComponents.div`
.new-post-notify-popup{
    position: fixed;
    z-index:99;
    left: 50%;
    transform: translateX(-50%);
    border: thin solid rgba(0,0,0,0.15);
    cursor: pointer;
    width: 150px;
    border-radius: 30px;
    -webkit-box-shadow:0px 0px 15px 0px rgba(62,66,66,0.22);
-moz-box-shadow: 0px 0px 15px 0px rgba(62,66,66,0.22);
box-shadow: 0px 0px 15px 0px rgba(62,66,66,0.22);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
    top: 9rem;
    color: black;
    height: 50px;
    background: white;
}
    .main__content{
        height: 100rem;
    }
    .container{

        .left-bar{
            left: 2px;
            z-index: 1000;
        }
        

        & > .ant-col:nth-child(3){
            padding: 0!important;
            
        }
        & .ant-col:nth-child(1){

            .left-bar{
                
                position: fixed;
                .navbar-item{
                    .ant-col{
                        padding-left: 16px !important;
                       }
                   }
               }
            
            ${useResponsive`${lg};
            .box-shadow{
                .ant-row{
                    & > .ant-col:nth-child(2){
                        display:none;
                    }
                }
            }

         
                        
                    }
                        `}
                        
                        
                    }

     
    .right-bar{
        padding: 0 .8rem;
        top:10rem;
        width: 100%;
        &::-webkit-scrollbar {
            width: 8px;
          }
          
    &::-webkit-scrollbar-thumb {
      background: rgba(0,0,0,0.2); 
    
      border-radius: 10px;
    }
}
`;

export const MainContentWrapper = styledComponents.div`
margin-top: 5rem;
.new-post{
    &__content{
        input{
           border: unset;
           &:focus{
               border: unset;
               box-shadow: unset;
               outline: none;
           }
        } 
    }
}

.posts{
    margin-bottom: 3rem;
    &__content{
        padding: 2rem;
    }
    .text-content{
        margin: 1rem 0;
    }
    .media-content{
        img{
            height: 60rem;
            object-fit: cover;
            width: 100%;
            border-radius: 20px;
        }
    }
}
    
`;