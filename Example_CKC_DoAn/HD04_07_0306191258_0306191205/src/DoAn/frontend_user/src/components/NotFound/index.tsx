import { Grid } from "@mui/material";

import images from "../../config/images"
import classes from './styles.module.scss';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import { Container } from '@mui/material';
const NotFound = () =>{
    return (
   <Container>
            <Grid sx={{'textAlign':'center'}}>
               {/* <img src={images.imgNotFound} alt="" /> */}
               <h1 className={classes.title}>404</h1>
              <SentimentVeryDissatisfiedIcon className={classes.iconSad}></SentimentVeryDissatisfiedIcon>
               <p className={classes.subTitle}>Xin lỗi vì sự bất tiện này! Có thể đường link chưa phù hợp</p>
            </Grid>
    </Container>
    )
}
export default NotFound;