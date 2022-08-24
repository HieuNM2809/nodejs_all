import { Avatar, Box, Button, Card, CardContent, CardHeader, Container, Grid, Rating, Typography } from "@mui/material"
import Loading from "components/Backdrop";
import Footer from "components/Footer";
import Header from "components/Header";
import { MajorSchool, MajorSchoolReview } from "models/major";
import { memo, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import MajorService from "services/major";
import classes from './styles.module.scss';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import MajorReviewService from "services/majorReview";
import { toast } from 'react-toastify';
import Slider from "react-slick";
import moment from "moment";
import PersonIcon from '@mui/icons-material/Person';

const schema = yup.object().shape({
    comment: yup.string().required('Vui lòng nhập bình luận'),
    rating: yup.number()
})
export interface CommentFormData {

    comment: string;
    rating: number;


}
const DetailMajorSchool = memo(() =>{
    
    const { schoolId, majorId } = useParams<{ schoolId: string, majorId:string }>();
    const [majorSchool,setMajorSchool] = useState<MajorSchool>();
    const [comment, setComment] = useState("");
    const [majorSchoolReviews,setMajorSchoolReviews] = useState<MajorSchoolReview[]>([]);
    const [statusBtn,setStatusBtn]= useState(false);
    const { register, handleSubmit, formState: { errors }, reset, control, watch } = useForm<CommentFormData>({
        resolver: yupResolver(schema),
        mode: 'onChange'
    });
    const [star, setStar] = useState(0);
    useEffect(()=>{
            MajorService.getMajorSchool(String(schoolId),String(majorId)).then((res)=>{
                setMajorSchool(res)
            })
            MajorReviewService.getMajorSchoolReviews(String(schoolId),String(majorId)).then((res)=>{
                setMajorSchoolReviews(res)
            })
    },[])
    const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
       
        event.preventDefault();
        if (star < 1 || comment.length < 1) {
            return;
        }
        const data = { comment, star };
        setStatusBtn(true)
        MajorReviewService.Review(String(schoolId),String(majorId),data).then(()=>{
            setComment("");
            setStar(0);
         
            MajorReviewService.getMajorSchoolReviews(String(schoolId),String(majorId)).then((res)=>{
                setMajorSchoolReviews(res)
                setStatusBtn(false)
            })
            toast.success(`Cảm ơn bạn đã nhận xét!`, { position: "top-right" });
        })
        // SchoolReviewService.Review(String(id), data).then(() => {
        //     setComment("");
        //     setStar(0);
        //     toast.success(`Cảm ơn bạn đã nhận xét!`, { position: "top-right" });
        //     dispatch(fetchReviewSchool(String(id)))
        // })
    }


    var settingReview = {
        dots: true,
        infinite: majorSchoolReviews?.length > 3,
       
        slidesToShow: 3,
        slidesToScroll: 3,
        initialSlide: 0,
        autoplay: true,
        speed: 1000,
        autoplaySpeed: 7000,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              infinite: majorSchoolReviews?.length > 3,
              dots: true
            }
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            }
        }
    
        ]
      };

    return ( <>
        <Header/>
        {majorSchool?._id?
    <Container className={classes.container}>
        <Typography variant="h4" sx={{color:"rgb(41, 109, 109)"}}>{majorSchool?.majorId?.name}</Typography>
        <Typography variant="h5" sx={{color:"rgb(41, 109, 109)",marginTop:"10px"}}>{majorSchool?.schoolId?.name}</Typography>
                <h3>Điểm chuẩn: {majorSchool?.benchMark}</h3>
          <Grid className={classes.careerRoadMap}>
          <Typography sx={{ fontSize: "22px" }}><b>Quy trình đào tạo</b></Typography>
          <p className={classes.road}>Năm thứ nhất:</p>
          <Typography paragraph>{majorSchool?.freshman}</Typography>
                <p  className={classes.road}>Năm thứ hai: </p>
                <Typography paragraph>{majorSchool?.sophomore}</Typography>
                <p className={classes.road}>Năm thứ ba: </p>
                <Typography paragraph>{majorSchool?.junior}</Typography>
                <p className={classes.road}>Năm thứ tư: </p>
                <Typography paragraph>{majorSchool?.senior}</Typography>
          </Grid>
          <Typography className={classes.titleRow}>Tiêu chuẩn đầu ra:</Typography>
                <Typography sx={{textAlign:"left"}}> {majorSchool?.outputStandard}</Typography>
                <Typography className={classes.titleRow}>Đề cương chi tiết:</Typography>
                <Typography sx={{textAlign:"left"}}> {majorSchool?.detailedOutline}</Typography>
            
                <Box className={classes.boxFormComment}>
                    <p className={classes.titleRow}>Đánh giá và bình luận</p>
                    <form className={classes.formComment} onSubmit={onSubmit} id="form-review">
                        <p className={classes.formReviewTitle}>Số sao của bạn
                            {star < 1 ? <span className={classes.textRequired}> (bắt buộc)</span> : "  "}</p>


                        <Controller
                            render={(props) => 
                            <Rating name="rating" value={star} className={classes.iconRating}
                                onChange={(_, value: any) => {
                                    setStar(value)

                                }}
                            />}
                            name="rating"
                            control={control}
                            defaultValue={star}


                        />


                        <p className={classes.formReviewTitle}>Bình luận của bạn
                            {comment.length < 1 ? <span className={classes.textRequired}> (bắt buộc)</span> : "  "}
                        </p>
                 
                        <textarea
                            className={classes.comment}
                            form="form-review"
                            name="comment"
                            placeholder="Vui lòng nhập bình luận của bạn"
                            rows={8}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        />
                        <Grid >
                            <Button className={classes.btnReview} type="submit" disabled={statusBtn}>Gửi</Button>
                        </Grid>
                    </form>
                </Box>

                <Slider {...settingReview}  className={classes.sliderMajorSchoolReviews}>
                {
                    majorSchoolReviews?.map((schR:any,index:number)=>(
                        <Card key={index} className={classes.cardMajorSchoolReviews}>
                        <CardHeader 
                          avatar={
                            <Avatar className={classes.randomBG} aria-label="recipe">
                              <PersonIcon/>
                            </Avatar>
                          }
                          title='Anonymous'
                          subheader={moment(schR?.createdAt).format('DD/MM/YYYY')}
                          action={
                               <Rating name="read-only" value={schR?.star} className={classes.ratingReview} readOnly/> 
                           
                          }
                        />
                    
                        <CardContent sx={{padding:"0px 10px"}}>
                          <Typography variant="body2" color="text.secondary" className={classes.comments}>
                      {schR?.comment}
                          </Typography>
                        </CardContent>
                      </Card>
             
                    ))
                }
            
                
                </Slider>
    </Container>
    :<Loading/>  
    }
    <Footer/>
        </>
    )
});
export default DetailMajorSchool;