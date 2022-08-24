import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import classes from './styles.module.scss';
import images from '../../config/images';
import { Grid } from '@mui/material';
import { routes } from '../../routers/routes';
import { Link, matchRoutes, NavLink } from 'react-router-dom';
import { memo, useMemo } from 'react';
import clsx from 'clsx';

// const pages = ['Trang chủ', 'MBTI', 'Blog'];


const Header  = memo(() => {

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const pages = useMemo(() => {
    return [
      {
        link:routes.Home,
        name:"Trang chủ"
      },
      {
        link:routes.POST,
        name:"Bảng tin"
      },
      {
        link:routes.MBTI,
        name:"Bài kiểm tra"
      }
     
    ];
  },[]) 

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed" className={classes.header}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img src={images.Logo} alt="" className={classes.logo}/>
          <Box sx={{ flexGrow: 0, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
              className={classes.menu}
            >
          
              {pages.map((page) => (
                
                <MenuItem key={page.link} onClick={handleCloseNavMenu}>
                 <NavLink to={page.link}  className={classes.navLink}>
                 {({ isActive }) => (
                //  <p style={{ color: isActive ? "blue" : "green" }}></p>
                <p className={isActive?classes.active:classes.notActive}>{page.name}</p>
               )}
            </NavLink>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Grid sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' }}}>
          <img src={images.Logo} alt="" className={classes.logoMobile}/>
          </Grid>
          {/* <AdbIcon  /> */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
               <NavLink to={page.link}      onClick={handleCloseNavMenu} className={classes.navLink}>
               {({ isActive }) => (
                //  <p style={{ color: isActive ? "blue" : "green" }}></p>
                <p className={isActive?classes.active:classes.notActive}>{page.name}</p>
               )}
             </NavLink>
         
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
});
export default Header;
