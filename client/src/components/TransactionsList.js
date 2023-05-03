import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs'
import Cookies from 'js-cookie';
import {useSelector} from 'react-redux'




export default function TransactionsList({data,fetchTransaction,setEditTransaction}) {

     const user = useSelector((state) => state.auth.user)

     const categoryName = (id) =>{
              const category = user.categories?.find((category) => category._id === id)
               return category ? category.label : "NA"
            }

  const remove = async(_id) =>{
    const token = Cookies.get('token')
    if(!window.confirm("Are you sure")) return;
    const res = await fetch(`https://chelav-backend2.onrender.com/transaction/${_id}`,{
      method: "DELETE",
      headers:{
        Authorization: `Bearer ${token}`
      }
    });
    if(res.ok){
      fetchTransaction();
      window.alert("Deleted Successfully")
    }
  }
   
  // this fuction for formating date
  const formatDate = ( date ) =>{
    return dayjs(date).format("DD-MMM-YYYY")
  }

  return (
  <>
    <Typography sx={{marginTop: 10}} variant="h6">List of Transactions</Typography>
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center" >Amount</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Category</TableCell>
            <TableCell align="center">Date</TableCell>
            <TableCell align="center">Action</TableCell>
           
          </TableRow>
        </TableHead>
        <TableBody>
          {
            data.map((month) => (
              month.transactions.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    {row.amount}
                  </TableCell>
                  <TableCell align="center">{row.description}</TableCell>
                  <TableCell align="center">{categoryName(row.category_id)}</TableCell>
                  <TableCell align="center">{formatDate(row.date)}</TableCell>
                  <TableCell align="center">
    
            
    
    <IconButton color="primary" onClick={() => setEditTransaction(row)} >
                    <EditIcon />
      
                    
    </IconButton>
    <IconButton color="warning" onClick={() => remove(row._id)} >
      
                    <DeleteIcon />
    </IconButton>
                  </TableCell>
     
                </TableRow>
              ))
            ))
          }
       
        </TableBody>
      </Table>
    </TableContainer>
   </>
  );
}