import { yupResolver } from "@hookform/resolvers/yup";
import { ArrowBackOutlined } from "@mui/icons-material";
import { OptionItem } from "models/general";
import Inputs from "pages/Admin/components/Inputs";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { memo, useEffect } from "react";
import { SchoolAdmin } from "models/Admin/school";
import { Box, Button, Typography } from "@mui/material";

const schema = yup.object().shape({
  // urlLogo: yup.string().required('Start is required.'),
  // name: yup.string().required('Tên trường is required.'),
  description: yup.string().required('Description is required.'),
  // urlFanpage: yup.string().required('Url Fanpage is required.'),
  // address: yup.string().required('Address is required.'),
  // regionId: yup.object().shape({
  //   _id: yup.number().required('Solution is required.'),
  //   name: yup.string().required()
  // }).required(),
  // schoolLevelId: yup.object().shape({
  //   _id: yup.number().required('Solution is required.'),
  //   name: yup.string().required()
  // }).required(),
})
export interface SchoolFormData {
  urlLogo: string | File;
  name: string;
  description: string;
  urlFanpage: string;
  address: string;
  regionId: OptionItem;
  schoolLevelId: OptionItem;
}
interface Props {
  title: string;
  itemEdit?: SchoolAdmin;

  onSubmit: (data: SchoolFormData) => void
}


const FormSchool = memo(({ title, itemEdit, onSubmit}: Props) => {

  const { register, handleSubmit, formState: { errors }, reset, control, watch } = useForm<SchoolFormData>({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });
  const _onSubmit = (data: SchoolFormData) => {
    onSubmit(data)

  }
  useEffect(() => {
    if (itemEdit) {
      reset({

        name: itemEdit.name,

      })
    }
  }, [reset, itemEdit])

  return (<>

    <Box display="flex" justifyContent="space-between" alignContent="center" mb={4}>
      <Typography component="h2" variant="h6" align="left">
        {title}
      </Typography>
      {/* <Button
          variant="contained"
          color="primary"
        //   onClick={handleBack}
          startIcon={<ArrowBackOutlined />}
        >
          Back
        </Button> */}
    </Box>
    <form autoComplete="off" noValidate onSubmit={handleSubmit(_onSubmit)}>
      <Inputs
        title="Ten truong"

        name="description"
        type="text"
        placeholder="description"

        inputRef={register('description')}
        errorMessage={errors.description?.message}
      />
      <Button type={"submit"}>Oke</Button>
    </form>
  </>

  )
});
export default FormSchool;