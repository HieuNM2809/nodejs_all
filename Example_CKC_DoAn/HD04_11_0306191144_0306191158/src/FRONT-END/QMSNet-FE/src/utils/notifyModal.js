import { Modal } from "antd";

export function openSuccessNotifyModal({...res}){
    Modal.success({
      centered: true,
      ...res,
      
    });
  }
  export function openErrorNotifyModal({...res}){
    Modal.error({
       centered: true,
       ...res,
      
     });
}
