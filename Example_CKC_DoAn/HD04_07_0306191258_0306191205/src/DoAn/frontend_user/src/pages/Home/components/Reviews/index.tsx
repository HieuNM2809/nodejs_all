import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import classes from './styles.module.scss';
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Grid } from "@mui/material";
import { useMemo } from "react";
const Reviews = () => {

  const posts = useMemo(() => {
    return [
      {
        avatar: "https://huongnghieptuyensinh.com/upload/slider/patriciarencknunesbrazil-1497249912_100x100.jpg",
        name: "Salys Sane",
        content: "Tôi đã tìm thấy được đại học mình mong muốn và phù hợp ở đây!",
        create_at: "20/7/2022"
      },
      {
        avatar: "https://huongnghieptuyensinh.com/upload/slider/abdulazizjonuzbekistan-1497249893_100x100.jpg",
        name: "Saka Ria",
        content: "Trước tiên, tôi đã biết về trường đại học lưu động của tôi từ trang này. Cổng thông tin này đã giúp tôi tìm được một trường đại học phù hợp. Tôi vô cùng biết ơn các bạn đã giúp tôi tìm ra và xác định mục đích tiếp theo của tôi.",
        create_at: "2/3/2019"
      },
      {
        avatar: "https://letranlaw.com/wp-content/uploads/2020/02/hannahavatar2.jpg",
        name: "ReactJS Orgin",
        content: "Tôi nghĩ các bạn develop cần phải thêm một vài chức năng để hoàn thiện thêm cho trang web và có thể giúp các bạn học sinh, sinh viên nhiều hơn",
        create_at: "1/6/2022"
      },
      {
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTPHUSjz2KhzoeHaJ-VbEr8Xceb9OKErjuojVzMdhgMu1VnW76n95biKo-0PSY74heI170&usqp=CAU",
        name: "Mark Dee Dee",
        content: "Tôi thấy trang web này được các bạn trẻ đánh giá là dễ dùng với giao diện khá là đơn giản và còn hỗ trợ các bạn học sinh, sinh viên giải đáp các thắc mắc chung về việc lựa chọn ngành học, trường học.",
        create_at: "3/6/2021"
      },
      {
        avatar: "https://i.pinimg.com/originals/7f/8d/18/7f8d18c184afeff878f0bc50f42b0ac5.png",
        name: "Joey",
        content: "Hỗ trợ hướng nghiệp là website tư vấn hướng nghiệp và review các trường đại học, cao đẳng, trung cấp, các trung tâm dạy học trên cả nước. Đây là một trang web tư vấn hướng nghiệp trực tuyến không kém phần hữu ích.",
        create_at: "19/1/2022"
      },
      {
        avatar: "https://cdn.personalitylist.com/avatars/172488.png",
        name: "ZugBi Aoe",
        content: "Website cung cấp cho học sinh, sinh viên những kiến thức về các chương trình đào tạo đại học, cao đẳng, trung cấp, các tin tức về tuyển sinh mới nhất trên toàn quốc. AUM Việt Nam cũng là một lựa chọn khá hay để bạn tham khảo về các ngành nghề khác nhau. Đặc biệt, nó rất phù hợp cho các bạn học sinh, sinh viên có ý định du học.",
        create_at: "20/7/2020"
      },
    ];
  }, [])

  var settings = {
    dots: true,
    infinite: posts.length > 3,

    slidesToShow: 5,
    slidesToScroll: 5,
    initialSlide: 0,
    autoplay: true,
    speed: 1000,
    autoplaySpeed: 7000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: posts.length > 3,
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
  
  return (<Grid className={classes.componentSlider}>

    <Slider {...settings} className={classes.slider}>
      {
        posts?.map((pos, index) => (
          <Card key={index} sx={{ height: "200px" }}>
            <CardHeader sx={{ padding: "5px 5px 5px 15px" }}
              avatar={
                <Avatar sx={{ width: "70px", height: "70px" }} aria-label="recipe">
                  <img src={pos?.avatar} />
                </Avatar>
              }
              title={pos?.name}
              subheader={pos?.create_at}
            />

            <CardContent>
              <Typography variant="body2" color="text.secondary" className={classes.content}>
                {pos?.content}
              </Typography>
            </CardContent>
          </Card>
        ))
      }


    </Slider>
  </Grid>
  )
}
export default Reviews