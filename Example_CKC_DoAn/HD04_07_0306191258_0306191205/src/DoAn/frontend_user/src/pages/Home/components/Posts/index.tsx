import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import classes from './styles.module.scss';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Grid } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import PostService from "services/post";
import { Post } from "models/post";
import { Major } from "models/major";
import MajorService from "services/major";
import { Link } from "react-router-dom";
const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  var allPost: any = [];
  var settings = {
    dots: true,
    infinite: posts.length>3,

    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 5000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: posts.length>3,
          dots: true
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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


  useEffect(() => {
    totalPostMajor();
  }, [])


  const totalPostMajor = async () => {
    const majors = await MajorService.getMajorOutStanding();
    const posts = await Promise.all(
      majors.map((major: any, index: number) => {
        return PostService.getPostsAdmissionsMajor(major._id);
      })
    )
    setPosts(posts.flat());
  }


  return (<Grid className={classes.componentSlider}>

    <Slider {...settings} className={classes.slider}>
   
      {
        posts?.map((pos, index) => (
          <Link to={`post/${pos?._id}`} className={classes.linkToPost}>
               <Card key={index} >
          <CardHeader className={classes.cardHeaderNews}

          
              title={pos?.title}

          />
          <CardContent
              sx={{
                height: "200px", display: "flex",
                  justifyContent: "center", alignItems: "center"
              }}
          >
              <Typography className={classes.descriptionNews}>
                  {pos?.content}
              </Typography>
          </CardContent>

      </Card>
          </Link>
     
        ))
      }


    </Slider>
  </Grid>
  )
}
export default Posts