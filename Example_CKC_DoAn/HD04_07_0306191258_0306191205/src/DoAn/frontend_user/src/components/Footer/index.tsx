import { Container, Divider, Grid, ListItem, ListItemText, List } from '@mui/material';
import classes from './styles.module.scss';
import EditLocationIcon from '@mui/icons-material/EditLocation';
import CallIcon from '@mui/icons-material/Call';
import EmailIcon from '@mui/icons-material/Email';
import images from '../../config/images';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useMemo } from 'react';
import { routes } from '../../routers/routes';
import { NavLink } from 'react-router-dom';

 
const Footer = () => {
    const pages = useMemo(() => {
        return [
          {
            link:routes.Home,
            name:"Trang chủ"
          },
          {
            link:routes.MBTI,
            name:"Bài kiểm tra"
          },
          {
            link:routes.POST,
            name:"Bảng tin"
          }
        ];
      },[])
    return (
        <Grid className={classes.footer}>
            <Container>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <Grid container className={classes.contactInfo}>
                            <EditLocationIcon className={classes.icon} />
                            <Grid>
                                <p className={classes.title}>Địa chỉ</p>
                                <p className={classes.subTitle}>Thành phố Hồ Chí Minh, Việt Nam</p>
                            </Grid>
                        </Grid>


                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <Grid container className={classes.contactInfo}>
                            <CallIcon className={classes.icon} />
                            <Grid>
                                <p className={classes.title}>Điện thoại</p>
                                <p className={classes.subTitle}>+84054563145</p>
                            </Grid>
                        </Grid>


                    </Grid>
                    <Grid item xs={12} sm={4} >
                        <Grid container className={classes.contactInfo}>
                            <EmailIcon className={classes.icon} />
                            <Grid>
                                <p className={classes.title}>Email</p>
                                <p className={classes.subTitle}>phong&duy@contact.com</p>
                            </Grid>
                        </Grid>


                    </Grid>

                </Grid>
                <Divider className={classes.divider}>
                    <img src={images.Logo} className={classes.logo} />
                </Divider>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Grid container className={classes.contactInfo}>
                            {/* <EditLocationIcon className={classes.icon} /> */}
                            <p className={classes.subTitle}>
                             Chân thành cảm ơn bạn đã ghé thăm website của chúng tôi. Mong bạn sẽ tìm được những thông tin có ích cho bạn. Chúc bạn thành công trong mọi công việc và cuộc sống!
                            </p>
                            <Grid sx={{marginTop:'10px'}}>
                                <p className={classes.title}>Theo dõi chúng tôi</p>
                               <FacebookIcon className={classes.iconFb}></FacebookIcon>
                               <TwitterIcon className={classes.iconTw}></TwitterIcon>
                               <YouTubeIcon className={classes.iconYt}></YouTubeIcon>
                            </Grid>
                        </Grid>


                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Grid container className={classes.contactInfo}>
                      
                        <List >
                        <p className={classes.titleBorder}>Liên kết</p>
                     
                        <Grid  sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                        {pages?.map((page)=>(
                       
                                <NavLink to={page.link}  className={classes.navLink}>
                                  {({ isActive }) => (
                                 //  <p style={{ color: isActive ? "blue" : "green" }}></p>
                                 <ListItem className={isActive?classes.active:classes.notActive} >
                 
                                     <ListItemText sx={{whiteSpace:"nowrap"}}>
                                     {page.name}
                                     </ListItemText>
                                 </ListItem>
                                )}
                             </NavLink>
                        
                               
                        ))}
                            </Grid>
                        </List>
                    
                        </Grid>


                    </Grid>
                    <Grid item xs={6} sm={6}>
                        <Grid container className={classes.contactInfo}>
                      
                        {/* <List>
                        <p className={classes.titleBorder}>Subscribe</p>
                            <ListItem className={classes.listItem}>
                                <ListItemText>
                
                                </ListItemText>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <ListItemText>
                                    TEST
                                </ListItemText>
                            </ListItem>
                            <ListItem className={classes.listItem}>
                                <ListItemText>
                                    TEST
                                </ListItemText>
                            </ListItem>
                        </List> */}
                 
                        </Grid>


                    </Grid>

                </Grid>
            </Container>


        </Grid>
    )
}

export default Footer