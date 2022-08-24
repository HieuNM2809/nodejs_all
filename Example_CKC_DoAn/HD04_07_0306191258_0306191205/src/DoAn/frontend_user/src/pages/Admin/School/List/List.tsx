import { memo, useState } from "react";
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Grid, Typography } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import SettingsIcon from '@mui/icons-material/Settings';
import classes from './styles.module.scss';
import { Add } from "@mui/icons-material";
import FormSchool from "../Form";
import CreateSchool from "../Create";
import EditSchool from "../Edit";
import { Link } from "react-router-dom";
interface Props {
    data: any
}

// function createData(
//     name: string,
//     calories: number,
//     fat: number,
//     carbs: number,
//     protein: number,
//   ) {
//     return { name, calories, fat, carbs, protein };
//   }
// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
//     createData('Gingerbread', 356, 16.0, 49, 3.9),
//   ];
const rowHeader = [
    {
        title:"Logo"
    },
    {
        title:"Tên"
    },
    {
        title:"Mô tả"
    },
    {
        title:"Link Fanpage"
    },
    {
        title:"Địa chỉ"
    },
    {
        title:"Vùng miền"
    },
    {
        title:"Cấp bậc"
    },
    {
        title:"Thao tác"
    },

]
const List = memo((props: Props) => {
    const [id,setId]=useState("");
const [isOpen,setIsOpen] = useState(false);
const [isOpenEdit,setIsOpenEdit] = useState(false);
    const handleAdd = () => {
        setIsOpen(!isOpen)
 
      }
      const handleEdit = () => {
        setIsOpenEdit(!isOpen)
      
      }
    const { data } = props;

    return (<div>
        <Grid container alignItems="center" justifyContent="space-between">
        <Grid item xs={6}>
          <Typography component="h2" variant="h6" align="left">
            Attribute
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" color="primary" startIcon={<Add />} onClick={handleAdd}>
              Create
            </Button>
          </Box>
        </Grid>
      </Grid>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        {
                            rowHeader.map((tit:any)=>(
                                <TableCell align="center"><b>{tit.title}</b></TableCell>
                            ))
                        }
                        {/* <TableCell><b>LOGO</b></TableCell>
                        <TableCell align="center"><b>Tên</b></TableCell>
                        <TableCell align="center">Mô tả</TableCell>
                        <TableCell align="center">Link Fanpage</TableCell>
                        <TableCell align="center">Địa chỉ</TableCell>
                        <TableCell align="center">Vùng miền</TableCell>
                        <TableCell align="center">Cấp bậc</TableCell>
                        <TableCell align="center">Thao tác</TableCell> */}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row: any) => (
                        <TableRow
                            key={row.name}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } ,borderBottom:"1px solid black" }}
                        >
                            <TableCell align="left" sx={{borderBottom:"none"}}>
                                <img src={row.urlLogo} alt="" className={classes.logoTable}/>
                            </TableCell>
                            <TableCell align="left" sx={{borderBottom:"none"}}>{row.name}</TableCell>
                            <TableCell align="left" sx={{borderBottom:"none"}}>{row.description}</TableCell>
                            <TableCell align="left" sx={{borderBottom:"none"}}>{row.urlFanpage}</TableCell>
                            <TableCell align="left" sx={{borderBottom:"none"}}>{row.address}</TableCell>
                            <TableCell align="left" sx={{borderBottom:"none"}}>{row?.regionId?.name}</TableCell>
                            <TableCell align="left" sx={{borderBottom:"none"}}>{row?.schoolLevelId?.name}</TableCell>
                            <TableCell align="left">
                              {/* <Link  to={`/Admin/school/${row._id}`}> */}
                              <Button onClick={()=>setId(row?._id)}>
                              <IconButton aria-label="setting" sx={{color:"green"}} onClick={handleEdit}>
                                    <SettingsIcon />
                                </IconButton>
                              </Button>
                         
                              {/* </Link> */}
                              <Button onClick={()=>setId(row?._id)}>
                                <IconButton aria-label="delete" sx={{color:"red"}}>
                                    <DeleteIcon /> 
                                </IconButton>
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
           
                </TableBody>
            </Table> 
            <CreateSchool isOpen={isOpen} setIsOpen={setIsOpen}></CreateSchool>
            <EditSchool isOpenEdit={isOpenEdit} setIsOpenEdit={setIsOpenEdit} getId={id}></EditSchool>
        </TableContainer>
        </div>)
});
export default List;