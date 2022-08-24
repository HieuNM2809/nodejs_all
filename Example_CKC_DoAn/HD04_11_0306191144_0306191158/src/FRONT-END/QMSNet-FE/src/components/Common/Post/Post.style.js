import styledComponents from "styled-components";

export const PostWrapper = styledComponents.div`



& + &{
    margin-top: 2rem;
}
.post__container{

    padding-bottom: 0;
}
    

    


    .post__comment{
        &__stats{
            font-weight: 500;
            opacity: .7;
            cursor: pointer;
            margin: .5rem 0;
        }
    }

   
   
  
`;