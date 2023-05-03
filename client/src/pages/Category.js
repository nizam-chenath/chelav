import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs'
import Cookies from 'js-cookie';
import {useSelector} from 'react-redux'
import {setUser} from '../store/auth.js'
import { useDispatch } from 'react-redux';
import CategoryForm from '../components/CategoryForm.js';
import { useState } from 'react';




export default function Category() {
      
    const token = Cookies.get('token')
     const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch();
    const [editCategory, setEditCategory] = useState({})

    const setEdit = (category) =>{
          setEditCategory(category)
    }
  

  async function remove(id) {
      const res =await fetch(`https://chelav-backend2.onrender.com/category/${id}`,{
          method: "DELETE",
          headers:{
              Authorization: `Bearer ${token}`
          }
      })
      if(res.ok){
          const _user = {...user,
       categories: user.categories.filter((cat) => cat._id!==id)}
          dispatch(setUser({user:_user})) 
      }
  }

  return (
  <Container>
    <CategoryForm editCategory={editCategory} />
    <Typography sx={{marginTop: 10}} variant="h6">List of Categories</Typography>
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" >Label</TableCell>
            <TableCell align="center">Icon</TableCell>
            <TableCell align="center">Action</TableCell>
            
           
          </TableRow>
        </TableHead>
        <TableBody>
          {user.categories.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row" align="center">
                {row.label}
              </TableCell>
              <TableCell align="center">{row.icon}</TableCell>
              
              <TableCell align="center">

        

<IconButton color="primary" 
onClick={() => setEdit(row)}
>
                <EditIcon />
  
                
</IconButton>
<IconButton color="warning"
onClick={() => remove(row._id)} 
>
  
                <DeleteIcon />
</IconButton>
              </TableCell>
 
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
   </Container>
  );
}