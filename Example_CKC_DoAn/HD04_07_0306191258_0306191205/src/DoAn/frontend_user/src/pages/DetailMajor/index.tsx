import {
  Grid,
  Container,
  Card,
  CardActions,
  Collapse,
  Typography,
  CardContent,
  Button,
  CardHeader,
  Rating,
} from "@mui/material";
import Footer from "components/Footer";
import Header from "components/Header";
import { useEffect, useState } from "react";
import classes from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { Link, useParams } from "react-router-dom";
import { fetchParticularMajor } from "store/major/major-actions";
import { styled } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Loading from "components/Backdrop";
import { Box } from "@mui/system";
import PostService from "services/post";
import { Post } from "models/post";
import Slider from "react-slick";
import GridViewIcon from "@mui/icons-material/GridView";

const DetailMajor = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const particularMajor = useAppSelector(
    (state) => state.major.particular_major
  );
  const [admissionsMajor, setAdmissionsMajor] = useState<Post[]>([]);
  const [postMajor, setPostMajor] = useState<Post[]>([]);
  useEffect(() => {
    dispatch(fetchParticularMajor(String(id)));
    PostService.getPostsMajor(String(id)).then((res) => {
      setPostMajor(res);
    });
    PostService.getPostsAdmissionsMajor(String(id)).then((res) => {
      setAdmissionsMajor(res);
    });
  }, []);

  interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
  }

  const ExpandMore = styled((props: ExpandMoreProps) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  }));
  const [expandedStudy, setExpandedStudy] = useState(false);
  const [expandedCareer, setExpandedCareer] = useState(false);
  const handleExpandClickStudy = () => {
    setExpandedStudy(!expandedStudy);
  };
  const handleExpandClickCareer = () => {
    setExpandedCareer(!expandedCareer);
  };
  var settingsMajor = {
    dots: true,
    infinite: particularMajor?.schools.length > 3,

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
          infinite: particularMajor?.schools.length > 3,
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
  var settingsNewsMajor = {
    dots: true,
    infinite: postMajor?.length > 3,

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
          infinite: postMajor?.length > 3,
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
    infinite: admissionsMajor?.length > 3,

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
          infinite: admissionsMajor?.length > 3,
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
      {particularMajor?._id ? (
        <Container sx={{ marginTop: "35px" }} className={classes.bgFull}>
          <Grid container spacing={2} sx={{ paddingBottom: "15px" }}>
            <Grid item xs={12} md={12} className={classes.boxLeft}>
              <p className={classes.nameMajor}> {particularMajor?.name}</p>
            </Grid>
            <Grid item xs={12} md={12}>
              <Grid className={classes.boxRight}>
                <p className={classes.descriptionMajor}>
                  {particularMajor?.description}
                </p>
                <Grid
                  sx={{ border: "1px solid rgba(0,0,0,0.2)", padding: "10px" }}
                >
                  <Typography sx={{ fontSize: "22px" }}>
                    <b>Lộ trình nghề nghiệp</b>
                  </Typography>

                  <p className={classes.studyRoad}>Giai đoạn 1</p>
                  <Typography paragraph>
                    {particularMajor?.careerRoadMap?.period1}
                  </Typography>
                  <p className={classes.studyRoad}>Giai đoạn 2</p>
                  <Typography paragraph>
                    {particularMajor?.careerRoadMap?.period2}
                  </Typography>
                  <p className={classes.studyRoad}>Giai đoạn 3</p>
                  <Typography paragraph>
                    {particularMajor?.careerRoadMap?.period3}
                  </Typography>
                  <p className={classes.studyRoad}>Giai đoạn 4</p>
                  <Typography paragraph>
                    {particularMajor?.careerRoadMap?.period4}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Typography
            className={classes.titleRow}
            sx={{ marginBottom: "20px" }}
          >
            Các trường đào tạo
          </Typography>
          <Slider {...settingsMajor}>
            {particularMajor?.schools?.map((sch: any, index: number) => (
              <Card key={index} sx={{ border: "1px solid rgba(0,0,0,0.2)" }}>
                <CardHeader
                  className={classes.cardHeaderMajor}
                  action={
                    <IconButton aria-label="settings">
                      <Link to={`/major/${sch._id}/${particularMajor._id}`}>
                        <GridViewIcon sx={{ color: "white" }} />
                      </Link>
                    </IconButton>
                  }
                  title={sch?.name}
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
                  <img src={sch?.urlLogo} className={classes.imageSchool} />
                </CardContent>
                <CardContent
                  sx={{
                    height: "200px",
                    textAlign: "justify",
                  }}
                >
                  <Typography className={classes.description}>
                    {sch?.description}
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
                      {sch.avgStar.toFixed(1)}
                    </Typography>
                    <Rating name="read-only" value={sch?.avgStar} readOnly />
                    <Typography sx={{ marginTop: "3px" }} className={classes.totalStar}>
                      {" "}
                      / {sch.totalRating} luợt đánh giá
                    </Typography>
                  </Grid>
                </CardContent>
              </Card>
            ))}
          </Slider>
          <Grid>
            <Typography
              sx={{ margin: "40px 0px 15px 0px !important" }}
              className={classes.titleRow}
            >
              Tin tức tuyển sinh
            </Typography>
            {admissionsMajor?.length < 1 ? (
              <Typography
                sx={{ fontSize: "20px", color: "red", textAlign: "center" }}
              >
                Chưa có tin tức!
              </Typography>
            ) : (
              <Slider {...news}>
                {admissionsMajor?.map((pSch: any, index: number) => (
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
          <Typography
            sx={{ fontSize: "24px", margin: "40px 0px 15px 0px !important" }}
            className={classes.titleRow}
          >
            Tin tức liên quan
          </Typography>
          {postMajor.length<1?
          (
            <Typography
              sx={{ fontSize: "20px", color: "red", textAlign: "center" }}
            >
              Chưa có tin tức!
            </Typography>
          ):
          <Slider {...settingsNewsMajor}>
            {postMajor?.map((pSch: any, index: number) => (
              <Link to={`/post/${pSch?._id}`} className={classes.link}>
                <Card key={index} sx={{ border: "1px solid rgba(0,0,0,0.2)" }}>
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
          </Slider>}
        </Container>
      ) : (
        <Loading></Loading>
      )}
      <Footer></Footer>
    </>
  );
};
export default DetailMajor;
