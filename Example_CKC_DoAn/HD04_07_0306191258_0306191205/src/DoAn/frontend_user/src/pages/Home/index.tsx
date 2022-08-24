import { Avatar, Button, Card, CardContent, CardHeader, Container, Grid, Input, Select, styled, TextField, Typography, CardMedia, Tooltip } from "@mui/material"
import Footer from "../../components/Footer"
import Header from "../../components/Header"
import classes from './styles.module.scss';
import React, { useEffect, useRef, useState } from "react";
import images from "../../config/images";
import SliderContainer from "./components/Slider";
import SchoolCards from "./components/SchoolCards";
import SchoolHexagon from "./components/SchoolHexagon";
import Posts from "./components/Posts";
import Reviews from "./components/Reviews";
import { Region } from "../../models/region";
import RegionService from "../../services/region";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from 'yup';
import { SchoolLevel } from "../../models/schoolLevel";
import SchoolLevelService from "../../services/schoolLevel";
import { OptionItem } from "../../models/general";
import SearchService from "../../services/search";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { fetchSchools } from "store/school/school-actions";
import { fetchSearch, fetchSearchKeyWordSchool } from "store/search/search-actions";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import { MajorResultSearch, SchoolResultSearch, SearchKeyWord } from "models/searchResult";
import { Link } from "react-router-dom";
import Loading from "components/Backdrop";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import GridViewIcon from '@mui/icons-material/GridView';

export interface FormDataT {
  keyword?: string;
  schoolLevelId?: string;
  regionId?: string
}
export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
const schema = yup.object().shape({
  keyword: yup.string(),
  schoolLevelId: yup.string(),
  regionId: yup.string(),
})
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
const Home = () => {
  const [regions, setRegions] = useState<OptionItem[]>([])
  const [schoolLevels, setschoolLevels] = useState<OptionItem[]>([])
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  var searchKeyWordSchool = useAppSelector(state => state.search.search_keyword);

  const [checkInput, setCheckInput] = useState('');

  const [open, setOpen] = React.useState(false);
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm<FormDataT>({
    resolver: yupResolver(schema),
    mode: 'onChange'
  });
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {

    const fetchData = async () => {

      // dispatch(setLoading(true))

      RegionService.getRegions().then((res) => {
        setRegions(res)
      })
      SchoolLevelService.getSchoolLevels().then((res) => {
        setschoolLevels(res)
      })


    }

    fetchData()
  }, [])

  const onSubmit = (data: FormDataT) => {
    if (data.keyword === "" && data.schoolLevelId === "" && data.regionId === "") {
      return
    }

    handleClickOpen()
    setIsLoading(true)
    // dispatch(fetchSearchKeyWordSchool(data))
    dispatch(fetchSearch(data)).then(() => {
      setIsLoading(false)
    })





  }
  type Option = {
    _id: string | number | string[];
    name: string | number | string[];
  };
  type SelectProps = React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > & { options: Option[] };
  const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
    ({ options, ...props }, ref) => (
      <select defaultValue={props.title} ref={ref} onChange={props.onChange} {...props}>
        <option value="" >{props.title}</option>
        {options.map(({ _id, name }) => (
          <option key={`${_id}+"id`} value={_id}>{name}</option>
        ))}
      </select>
    )
  );
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setInputState(e.target.value)
    setCheckInput(e.target.value);

  }

  const BootstrapDialogTitle = (props: DialogTitleProps) => {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle className={classes.titleSearch} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            {/* <CloseIcon /> */}
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  return (<Grid className={classes.customContainer}>
    <Header></Header>
    <Grid className={classes.mainHome}>

      <Grid container spacing={1} className={classes.bgTestMySelf} sx={{ mb: "20px" }}>
        <Grid item xs={12} sm={4} className={classes.intro}>
          {/* <Typography sx={{fontSize:"20px", marginBottom:"10px",textAlign:"center"}}>Hãy nhập thông tin để tra cứu!</Typography> */}
          <Grid className={classes.boxImgForm}>
            <img src={images.imgForm} alt="" className={classes.imgForm} />
          </Grid>
          <small className={classes.subTitleForm}>Chúng tôi mong sẽ đưa ra kết quả gợi ý phù hợp cho bạn, bạn có thể tìm tên trường hoặc ngành nghề khi nhập
            ở ô đầu tiên hoặc chọn cấp bậc và vùng miền để chúng tôi có thể đưa ra kết quả tốt nhất!
          </small>
        </Grid>
        <Grid item xs={12} sm={8}>
          <form autoComplete="off" className={classes.formTestMySelf} onSubmit={handleSubmit(onSubmit)}>
            <input placeholder="Nhập tên trường hoặc tên ngành nghề bạn muốn tìm" className={classes.inputQues} autoComplete="true"
              {...register('keyword')} onChange={handleChangeInput} />
            <Select
              className={classes.selectForm1}
              title="Chọn cấp bậc trường"
              {...register("schoolLevelId")}
              options={
                schoolLevels
              }


              disabled={checkInput ? true : false}

            />
            <Select

              className={classes.selectForm2}
              title="Chọn vùng miền"
              {...register("regionId")}
              options={
                regions
              }
              //  onChange={ handleChangeSelect}
              disabled={checkInput ? true : false}
            />

            {/* <Grid sx={{marginBottom:"15px"}}>
               <CustomControl title="Cấp bậc" optionsProps={schoolLevels}  control={control} name="schoolLevelId"></CustomControl>
            </Grid>
            <Grid sx={{marginBottom:"15px"}}>
               <CustomControl title="Vùng" optionsProps={regions}  control={control} name="regionId"></CustomControl>
            </Grid> */}
            <button type="submit" className={classes.btnSearch}> TÌM KIẾM </button>
          </form>
          {isLoading ? <Loading /> : <BootstrapDialog
            onClose={handleClose}
            aria-labelledby="customized-dialog-title"
            open={open}
          >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
              <span className={classes.titleBoxSearch}>Kết quả tìm kiếm</span>
          
            </BootstrapDialogTitle>
            <DialogContent dividers className={classes.dialogContent}>
              {searchKeyWordSchool?.majors?.length <= 0 && searchKeyWordSchool?.schools?.length <= 0 || searchKeyWordSchool.length < 1 ?
                <Typography sx={{ textAlign: "center" }}>
                  <SentimentVeryDissatisfiedIcon className={classes.sadIcon} />
                  <p className={classes.textSorry}>Xin lỗi chúng tôi chưa có kết quả phù hợp cho bạn!</p>

                </Typography>
                : ""}
              <Grid className={classes.rowSchool}>
                {searchKeyWordSchool?.schools?.length > 0 ? <h2>Trường</h2> : ""}
                {searchKeyWordSchool?.schools?.length > 0 ? 
                <Typography sx={{color:"#9aa0a6",marginBottom:"15px",marginLeft:"5px"}}>
                  {searchKeyWordSchool?.schools?.length} kết quả phù hợp với trường</Typography> : ""}
                {searchKeyWordSchool?.schools?.map((sch: SchoolResultSearch, index: number) => (
                  <Card sx={{ maxWidth: 345 }} key={index} className={classes.cardSearch}>
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                          <img src={sch.urlLogo} alt="" className={classes.avtSChoolSearch} />
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">

                          <Link to={`/school/${sch._id}`} className={classes.link}> <Tooltip title="Xem chi tiết">
                            <Tooltip title="Xem chi tiết">

                              <GridViewIcon sx={{ color: "black" }} />

                            </Tooltip>

                          </Tooltip></Link>
                        </IconButton>
                      }
                      title={sch.name}
                    // subheader={sch?.urlFanpage}
                    />

                    <CardContent sx={{borderTop:"none"}}>
                      <Typography variant="body2" color="text.secondary" className={classes.descriptionSearch}>
                        {sch?.description}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
 
                {searchKeyWordSchool?.majors?.length > 0 ? <h2>Ngành nghề</h2> : ""}
                {searchKeyWordSchool?.majors?.length > 0 ? 
                <Typography sx={{color:"#9aa0a6",marginBottom:"15px",marginLeft:"5px"}}>
                  {searchKeyWordSchool?.majors?.length} kết quả phù hợp với ngành nghề</Typography> : ""}
                {searchKeyWordSchool?.majors?.map((maj: MajorResultSearch, index: number) => (
                  <Card sx={{ maxWidth: 345 }} key={index} className={classes.cardSearch}>
                    <CardHeader
                      //  avatar={
                      //    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      //      <img src={maj?.image} alt="" className={classes.avtSChoolSearch}/>
                      //    </Avatar>
                      //  }
                      action={
                        <IconButton aria-label="settings">

                          <Link to={`/major/${maj?._id}`} className={classes.link}> <Tooltip title="Xem chi tiết">

                            <Tooltip title="Xem chi tiết">

                              <GridViewIcon sx={{ color: "black" }} />

                            </Tooltip>

                          </Tooltip></Link>
                        </IconButton>
                      }
                      title={maj?.name}
                    // subheader={sch?.urlFanpage}
                    />
                    <CardMedia
                      component="img"
                      height="194"
                      image={maj?.image}
                      alt="Image Major"
                    />
                    <CardContent  sx={{borderTop:"none"}}>
                      <Typography variant="body2" color="text.secondary" className={classes.descriptionSearch}>
                        {maj?.description}
                      </Typography>
                    </CardContent>
                  </Card>
                ))}
                    {searchKeyWordSchool?.length > 0 ? 
                        <Typography sx={{color:"#9aa0a6",marginBottom:"15px",marginLeft:"5px"}}>
                          {searchKeyWordSchool?.length} kết quả phù hợp</Typography> : ""}
                {searchKeyWordSchool.length > 0 ? searchKeyWordSchool.map((sch: any, index: number) => (
                  <Card sx={{ maxWidth: 345 }} key={index} className={classes.cardSearch}>
                    <CardHeader
                      avatar={
                        <Avatar sx={{ backgroundColor: "cyan" }} aria-label="recipe">
                          <img src={sch?.urlLogo} alt="" className={classes.avtSChoolSearch} />
                        </Avatar>
                      }
                      action={
                        <IconButton aria-label="settings">

                          <Link to={`/school/${sch._id}`} className={classes.link}>

                            <Tooltip title="Xem chi tiết">

                              <GridViewIcon sx={{ color: "black" }} />

                            </Tooltip>
                          </Link>
                        </IconButton>
                      }
                      title={sch?.name}
                    // subheader={sch?.urlFanpage}
                    />

                    <CardContent  sx={{borderTop:"none"}}>
                      <Typography variant="body2" color="text.secondary" className={classes.descriptionSearch}>
                        {sch?.description}
                      </Typography>
                    </CardContent>
                  </Card>
                  
                )) : ""}
              </Grid>

            </DialogContent>

          </BootstrapDialog>}
        </Grid>
      </Grid>
      <h2 className={classes.homeTitle}>CÁC TRƯỜNG NỔI BẬT</h2>
      <Grid>
        <SliderContainer></SliderContainer>

        <h2 className={classes.homeTitle}>CÁC NGÀNH NỔI BẬT</h2>

        {/* <SchoolCards></SchoolCards> */}
        <SchoolHexagon></SchoolHexagon>
        <h2 className={classes.homeTitle}>TIN TỨC TUYỂN SINH</h2>
        <Posts></Posts>
        <h2 className={classes.homeTitle}>MỌI NGƯỜI NÓI GÌ VỀ CHÚNG TÔI</h2>
        <Reviews />
      </Grid>
    </Grid>

    <Footer></Footer>
  </Grid>)
}

export default Home