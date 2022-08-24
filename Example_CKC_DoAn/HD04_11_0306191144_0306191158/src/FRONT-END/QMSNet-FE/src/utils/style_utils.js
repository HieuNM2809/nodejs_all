import { md, xl, xxl } from '../constants';

const ContainerSize = {
    containerXL: { width: 1250, padding: `0 20px` },
    containerLG: { width: 960, padding: `0 20px` },
    containerMD: { width: 720, padding: `0 10px` },
};

const getStyle = (maxWidth, padding) =>
    `max-width: ${maxWidth}px;
     padding:${padding};
`;

export const getContainerStyle = (width) => {
    switch (width) {
        case width <= md ? width : -1:
            return getStyle(ContainerSize.containerMD.width, ContainerSize.containerMD.padding);
        case width <= xl ? width : -1:
            return getStyle(ContainerSize.containerLG.width, ContainerSize.containerLG.padding);
        case width <= xxl ? width : -1:
            return getStyle(ContainerSize.containerXL.width, ContainerSize.containerXL.padding);
        default:
            return getStyle(ContainerSize.containerXL.width, ContainerSize.containerXL.padding);
    }
};
