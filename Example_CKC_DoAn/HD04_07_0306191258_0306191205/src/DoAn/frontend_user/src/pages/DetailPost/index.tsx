import Header from "../../components/Header";
import { Link, useParams } from "react-router-dom";
import { Button, Card, CardContent, Container } from "@mui/material";
import Footer from "../../components/Footer";
import { useEffect, useState, memo } from "react";
import { Divider, Grid, Typography } from "@mui/material";
import classes from "./styles.module.scss";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import { fetchParticularPost, fetchPostActions } from "store/post/post-actions";
import Loading from "components/Backdrop";
import Slider from "react-slick";
import { Post } from "models/post";
interface Props {}
const DetailPost = memo((props: Props) => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const particularPost = useAppSelector((state) => state.post.particular_post);
  const allPosts = useAppSelector((state) => state.post.all_posts);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true)
    dispatch(fetchParticularPost(String(id)));
    dispatch(fetchPostActions(allPosts)).then(()=>{
      setIsLoading(false)
    });
  }, [id, dispatch]);

  var settings = {
    dots: true,
    infinite: particularPost?.images?.length > 3,

    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: particularPost?.images?.length > 3,
          dots: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 3,
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
  const differPost = allPosts.filter(
    (post: Post) => post._id !== particularPost?._id
  );

  return (
    <>
      <Header></Header>
      {particularPost?._id ? (
        <Container sx={{ minHeight: "63.5vh" }}>
          <Typography sx={{ textAlign: "center", marginTop: "10px" }}>
            <p className={classes.title}>{particularPost?.title}</p>
            <Slider {...settings}>
              {particularPost?.images?.map((img: any, index: number) => (
                <Card className={classes.slider}>
                  <CardContent>
                    <img
                      key={index}
                      src={img.URL}
                      alt="IMGPOST"
                      className={classes.imgPost}
                    />
                  </CardContent>
                </Card>
              ))}
            </Slider>
            <p className={classes.content}>{particularPost?.content}</p>
          </Typography>
          <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
            Các bài viết khác:
          </Typography>
          {differPost?.map((dif, index) => (
            <Link
              to={`/post/${dif?._id}`}
              key={index}
              className={classes.navLink}
            >
              <Button sx={{ marginRight: "20px" }} onClick={  ()=>window.scrollTo({top: 0, left: 0, behavior: 'smooth' })}>{dif?.title} </Button>
            </Link>
          ))}
        </Container>
      ) : (
        <Loading></Loading>
      )}
      <Footer></Footer>
    </>
  );
});
export default DetailPost;
