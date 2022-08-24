import Header from "../../components/Header";
import { Link, useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Container,
  FormControlLabel,
  IconButton,
  Typography,
} from "@mui/material";
import Footer from "../../components/Footer";
import { useEffect, useState, memo } from "react";
import { School } from "../../models/school";
import { Divider, Grid } from "@mui/material";
import classes from "./styles.module.scss";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import Loading from "components/Backdrop";
import Slider from "react-slick";
import GridViewIcon from "@mui/icons-material/GridView";
import Rating from "@mui/material/Rating";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import SchoolService from "services/school";
import SchoolReviewService from "services/schoolReview";
import { toast } from "react-toastify";
import { SchoolReview } from "models/schoolReview";
import PersonIcon from "@mui/icons-material/Person";
import moment from "moment";
import { Post } from "models/post";
import PostService from "services/post";
import LanguageIcon from "@mui/icons-material/Language";

const schema = yup.object().shape({
  comment: yup.string().required("Vui lòng nhập bình luận"),
  rating: yup.number(),
});
interface Props {}
export interface CommentFormData {
  comment: string;
  rating: number;
}
const DetailSchool = memo((props: Props) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const [star, setStar] = useState(0);
  const [comment, setComment] = useState("");
  const [stateSchool, setStateSchool] = useState<School>();
  const [schoolReviews, setSchoolReviews] = useState<SchoolReview[]>([]);
  const [postSchool, setPostSchool] = useState<Post[]>([]);
  const [admissionsSchool, setAdmissionsSchool] = useState<Post[]>([]);
  const [statusBtn, setStatusBtn] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    watch,
  } = useForm<CommentFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  //    const schoolReviews = useAppSelector(state => state.reviewSchool.all_review_schools);
  useEffect(() => {
    // dispatch(fetchParticularSchool(String(id)))
    SchoolService.getSchool(String(id)).then((res) => {
      setStateSchool(res);
    });
    SchoolReviewService.getSchoolReviews(String(id)).then((res: any) => {
      setSchoolReviews(res);
    });
    PostService.getPostsAdmissionsSchool(String(id)).then((res) => {
      setAdmissionsSchool(res);
    });
    // dispatch(fetchReviewSchool(String(id)))
    PostService.getPostsSchool(String(id)).then((res) => {
      setPostSchool(res);
    });
  }, []);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (star < 1 || comment.length < 1) {
      return;
    }
    const data = { comment, star };
    setStatusBtn(true)
    SchoolReviewService.Review(String(id), data).then(() => {
      setComment("");
      setStar(0);
      SchoolReviewService.getSchoolReviews(String(id)).then((res: any) => {
        setSchoolReviews(res);
        setStatusBtn(false)
        toast.success(`Cảm ơn bạn đã nhận xét!`, { position: "top-right" });
      });
 
    });
  };
  var settingReview = {
    dots: true,
    infinite: schoolReviews.length > 3,
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
          infinite: schoolReviews.length > 3,
          dots: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  var settingsMajor = {
    dots: true,
    infinite: stateSchool?.majors?.length > 2,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: stateSchool?.majors?.length > 3,
          dots: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  var news = {
    dots: true,
    infinite: admissionsSchool.length > 3,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: admissionsSchool.length > 3,
          dots: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  var newsRelate = {
    dots: true,
    infinite: postSchool.length > 3,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: admissionsSchool.length > 3,
          dots: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  var settings = {
    dots: true,
    infinite: stateSchool?.images?.length > 3,
    slidesToShow: 2,
    slidesToScroll: 2,
    initialSlide: 0,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: stateSchool?.images?.length > 3,
          dots: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 0,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <Header></Header>

      {stateSchool?._id ? (
        <Container className={classes.bgFull}>
          <Grid className={classes.rowTop}>
            <Grid container>
              <Grid item xs={12} sm={6} className={classes.introName}>
                <h1 className={classes.nameSchool}>{stateSchool?.name}</h1>
                {/* <p className={classes.region}>{school?.regionId?.name}</p> */}
              </Grid>
              <Grid item xs={12} sm={6} className={classes.introContact}>
                <Grid className={classes.rowContact}>
                  <FacebookOutlinedIcon
                    className={classes.iconFb}
                  ></FacebookOutlinedIcon>
                  <span>
                    <a
                      href={stateSchool?.urlFanpage}
                      target="_blank"
                      className={classes.getSocial}
                    >
                      Go to Facebook
                    </a>
                  </span>

                  <LanguageIcon
                    sx={{ marginLeft: "20px" }}
                    className={classes.iconFb}
                  ></LanguageIcon>
                  <span>
                    <a
                      href={stateSchool?.urlHomePage}
                      target="_blank"
                      className={classes.getSocial}
                    >
                      Trang chủ
                    </a>
                  </span>
                </Grid>
              </Grid>
            </Grid>
            <img src={stateSchool?.urlLogo} className={classes.logo} />
          </Grid>
          <Grid className={classes.rowBot}>
            <Grid container className={classes.dFlexRespon}>
              <Grid item xs className={classes.colLeft}>
                <Typography sx={{ textAlign: "justify", paddingRight: "15px" }}>
                  {stateSchool?.description}
                </Typography>
              </Grid>
              <Divider
                orientation="vertical"
                flexItem
                className={classes.divider}
              >
                <AcUnitIcon></AcUnitIcon>
              </Divider>
              <Grid item xs className={classes.colRight}>
                <p>Hệ: {stateSchool?.schoolLevelId.name}</p>
                <p className={classes.region}>
                  Vùng: {stateSchool?.regionId?.name}
                </p>
                <p>Địa chỉ: {stateSchool?.address}</p>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.imgContainer}>
            <Slider {...settings}>
              {stateSchool?.images?.map((img: any, index: number) => (
                <Card className={classes.slider}>
                  <CardContent>
                    <img src={img?.URL} />
                  </CardContent>
                </Card>
              ))}
            </Slider>
          </Grid>
          <Grid>
            <p className={classes.titleRow}>Các ngành đào tạo</p>

            {stateSchool?.majors?.length < 1 ? (
              <Typography sx={{ fontSize: "20px", color: "red" }}>
                Chưa có ngành nghề nào!
              </Typography>
            ) : (
              <Slider {...settingsMajor} className={classes.sliderMajor}>
                {stateSchool?.majors?.map((maj: any, index: number) => (
                  <Card
                    key={index}
                    sx={{ border: "1px solid rgba(0,0,0,0.2)" }}
                  >
                    <CardHeader
                      className={classes.cardHeaderMajor}
                      action={
                        <IconButton aria-label="settings">
                          <Link to={`/major/${id}/${maj._id}`}>
                            <GridViewIcon sx={{ color: "white" }} />
                          </Link>
                        </IconButton>
                      }
                      title={maj?.name}
                    />
                    <CardContent
                      sx={{
                        height: "130px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        padding: "0px",
                      }}
                    >
                      <img src={maj?.image} className={classes.imageMajor} />
                    </CardContent>
                    <CardContent
                      sx={{
                        height: "180px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography className={classes.description}>
                        {maj?.description}
                      </Typography>
                    </CardContent>
                    <CardContent sx={{ paddingTop: "0px" }}>
                      <Grid
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "20px",
                            marginTop: "3px",
                            marginRight: "5px",
                          }}
                        >
                          {maj?.avgStar.toFixed(1)}
                        </Typography>
                        <Rating
                          name="read-only"
                          value={maj?.avgStar}
                          readOnly
                        />
                        <Typography sx={{  marginTop: "3px" }} className={classes.totalStar}>
                          / {maj?.totalRating} lượt đánh giá
                        </Typography>
                      </Grid>
                    </CardContent>
                  </Card>
                ))}
              </Slider>
            )}
          </Grid>
          <Grid>
            <p  className={classes.titleRow}>Tin tức tuyển sinh</p>
            {admissionsSchool?.length < 1 ? (
              <Typography sx={{ fontSize: "20px", color: "red" }}>
                Chưa có tin tức!
              </Typography>
            ) : (
              <Slider {...news}>
                {admissionsSchool?.map((pSch: any, index: number) => (
                  <Link to={`/post/${pSch?._id}`} className={classes.link}>
                    <Card key={index}>
                      <CardHeader
                        className={classes.cardHeaderNews}
                        // action={
                        //     <IconButton aria-label="settings">
                        //         <GridViewIcon />
                        //     </IconButton>
                        // }
                        title={pSch?.title}
                        // subheader={`Điểm chuẩn: ${maj?.benchMark}`}
                      />
                      <CardContent
                        sx={{
                          height: "200px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography className={classes.descriptionNews}>
                          {pSch?.content}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </Slider>
            )}
          </Grid>
          <Grid>
            <p className={classes.titleRow}>Tin tức liên quan</p>

            {postSchool?.length < 1 ? (
              <Typography sx={{ fontSize: "20px", color: "red" }}>
                Chưa có tin tức!
              </Typography>
            ) : (
              <Slider {...newsRelate}>
                {postSchool?.map((pSch: any, index: number) => (
                  <Link to={`/post/${pSch?._id}`} className={classes.link}>
                    <Card
                      key={index}
                      sx={{ border: "1px solid rgba(0,0,0,0.2)" }}
                    >
                      <CardHeader
                        className={classes.cardHeaderNews}
                        title={pSch?.title}
                      />
                      <CardContent
                        sx={{
                          height: "200px",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography className={classes.descriptionNews}>
                          {pSch?.content}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </Slider>
            )}
          </Grid>

          <Box className={classes.boxFormComment}>
            <p className={classes.titleRow}>Đánh giá và bình luận</p>
            <form
              className={classes.formComment}
              onSubmit={onSubmit}
              id="form-review"
            >
              <p className={classes.formReviewTitle}>
                Số sao của bạn
                {star < 1 ? (
                  <span className={classes.textRequired}> (bắt buộc)</span>
                ) : (
                  "  "
                )}
              </p>

              <Controller
                render={(props) => (
                  <Rating
                    name="rating"
                    value={star}
                    className={classes.iconRating}
                    onChange={(_, value: any) => {
                      setStar(value);
                    }}
                  />
                )}
                name="rating"
                control={control}
                defaultValue={star}
              />

              <p className={classes.formReviewTitle}>
                Bình luận của bạn
                {comment.length < 1 ? (
                  <span className={classes.textRequired}> (bắt buộc)</span>
                ) : (
                  "  "
                )}
              </p>

              <textarea
                className={classes.comment}
                form="form-review"
                name="comment"
                placeholder="Vui lòng nhập bình luận của bạn"
                rows={6}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />

              <Grid>
                <Button className={classes.btnReview} type="submit" disabled={statusBtn}>
                  Gửi
                </Button>
              </Grid>
            </form>
          </Box>
          <Box>
            <p className={classes.titleRow}>Các bình luận khác</p>
            <Slider {...settingReview} className={classes.sliderSchoolReviews}>
              {schoolReviews?.map((schR: any, index: number) => (
                <Card
                  key={index}
                  className={classes.cardSchoolReviews}
                  sx={{ border: "1px solid rgba(0,0,0,0.2)" }}
                >
                  <CardHeader
                    avatar={
                      <Avatar className={classes.randomBG} aria-label="recipe">
                        <PersonIcon />
                      </Avatar>
                    }
                    title="Anonymous"
                    subheader={moment(schR?.createdAt).format("DD/MM/YYYY")}
                    action={
                      <Rating
                        className={classes.ratingReview}
                        name="read-only"
                        value={schR?.star}
                        readOnly
                      />
                    }
                  />

                  <CardContent sx={{ padding: "0px 10px" }}>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      className={classes.comments}
                    >
                      {schR?.comment}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Slider>
          </Box>
        </Container>
      ) : (
        <Loading />
      )}

      {/* <p>{school?.name}</p> */}
      {/* <img src={school?.urlLogo} alt="" /> */}

      <Footer></Footer>
    </>
  );
});
export default DetailSchool;
