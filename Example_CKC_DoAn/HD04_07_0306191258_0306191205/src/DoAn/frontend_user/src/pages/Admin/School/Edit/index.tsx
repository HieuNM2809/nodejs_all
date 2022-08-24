import { Button, Dialog, DialogActions, DialogContent } from "@mui/material"
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks"
import { SchoolAdmin } from "models/Admin/school"

import { memo, useEffect, useState } from "react"
import { fetchParticularSchool } from "store/school/school-actions"
import FormSchool from "../Form"
import SchoolForm, { SchoolFormData } from "../Form"


interface Props {
isOpenEdit:boolean;
setIsOpenEdit:any;
getId?:string;
}

const EditSchool = memo((props: Props) => { 
    const {isOpenEdit, setIsOpenEdit, getId} = props;
    const [itemEdit, setItemEdit] = useState<SchoolAdmin>();
    const dispatch  = useAppDispatch();
    const particularSchool=useAppSelector(state=>state.school.particular_school);
    useEffect(() => {
        dispatch(fetchParticularSchool(String(getId)))
        setItemEdit(particularSchool)   
    }, [getId])

    const onSubmit = (data: SchoolFormData) => {
    //   console.log(data)
      }
      const handleClose = () =>{
        setIsOpenEdit(!isOpenEdit)
      }

    return (
        <>    <Dialog
        open={isOpenEdit}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
           <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
     
        </DialogActions>
        <DialogContent>
        <FormSchool
            title="EDIT"
            onSubmit={onSubmit}
            itemEdit={itemEdit}
   
          />
        </DialogContent>
   
      </Dialog>
   
        </>
      )
});
export default EditSchool;