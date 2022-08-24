import { Button, Dialog, DialogActions, DialogContent } from "@mui/material"
import { SchoolAdmin } from "models/Admin/school"
import { memo } from "react"
import FormSchool from "../Form"
import SchoolForm, { SchoolFormData } from "../Form"


interface Props {
isOpen:boolean;
setIsOpen:any;
}
const CreateSchool = memo((props: Props) => { 
    const {isOpen, setIsOpen} = props;
    const onSubmit = (data: SchoolFormData) => {
  
      }
      const handleClose = () =>{
        setIsOpen(!isOpen)
      }
    return (
        <>    <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
           <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
     
        </DialogActions>
        <DialogContent>
        <FormSchool
            title="Create Attribute"
            onSubmit={onSubmit}
          />
        </DialogContent>
   
      </Dialog>
   
        </>
      )
})
export default CreateSchool;