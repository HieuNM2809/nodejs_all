import { Row } from "antd";
import styledComponents from "styled-components";

export const AvatarCardWrapper = styledComponents(Row)`


.ant-avatar{
    
    width: 40px;
    height: 40px;
    img{
        border-radius:50%;
        object-fit:cover;

    }
}
.username{
    cursor: default;
    &:hover{
        text-decoration:underline;

    }
}
.actor{
    margin-right: .5rem;
    font-weight: 500;

}
`;