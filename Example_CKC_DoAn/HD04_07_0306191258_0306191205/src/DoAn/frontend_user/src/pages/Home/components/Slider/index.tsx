import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import classes from './styles.module.scss';
import images from "../../../../config/images";
import { Button, Grid, Typography } from "@mui/material";
import SchoolService from "../../../../services/school";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks/redux-hooks";
import {  fetchSchoolsOutStanding } from "store/school/school-actions";
import Loading from "components/Backdrop";
import Rating from "@mui/material/Rating";

const SliderContainer = () => {

  const dispatch = useAppDispatch();

  const allSchoolsOutStanding = useAppSelector(state => state.school.all_schools_outstanding);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {

    setIsLoading(true)

    dispatch(fetchSchoolsOutStanding(allSchoolsOutStanding)).then(() => {
      setIsLoading(false)
    })
  }, [])

  var settings = {
    dots: true,
    infinite: allSchoolsOutStanding.length > 3,

    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 8000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: allSchoolsOutStanding.length > 3,
          dots: true
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2
        }
      }
    ]
  };

  return (<>
    {isLoading ? <Loading /> : <Grid className={classes.componentSlider}>
      <Slider {...settings} className={classes.slider}>
        {allSchoolsOutStanding.map((sch, index) => (
          <Grid className={classes.card} key={index}>
            <div className={classes.cardSmall}>
              <div className={classes.cardTop}>
                <img src={sch.urlLogo} alt="" className={classes.imgSlider} />

              </div>
              <Link to={`/school/${sch._id}`} className={classes.link}>
                <Grid className={classes.cardBot}>
                  <p className={classes.title}>{sch.name}</p>
                  <p className={classes.description}>{sch.description}</p>
                  {/* <p>ajsajasunu</p> */}
                  {/* <button className={classes.btnDetail}>
      
       </button> */}
                  <Grid sx={{ display: "flex", justifyContent: "center", alignItems: "center", margin: "15px 0px 0px 0px" }}>
                    <Typography sx={{ fontSize: "20px", marginTop: "3px", color: "black" }}>{sch?.avgStar?.toFixed(1)}</Typography>
                    <Rating name="avgRating" value={sch?.avgStar} precision={0.1} readOnly sx={{ margin: "0px 5px" }} />

                  </Grid>
                  <Typography sx={{ color: "black", marginTop: "0px", fontSize: "14px" }}>{sch?.totalRating} lượt đánh giá</Typography>
                </Grid>
              </Link>


            </div>
          </Grid>
        )

        )}
      </Slider></Grid>}
  </>
  )
}
export default SliderContainer