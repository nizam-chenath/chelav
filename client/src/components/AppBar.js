import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Link, useNavigate} from 'react-router-dom';
import Cookies from 'js-cookie'
import {useDispatch} from 'react-redux'
import {logout} from '../store/auth'
import { useSelector } from 'react-redux';

export default function ButtonAppBar() {
         const navigate = useNavigate()
         const dispatch = useDispatch();
         const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const _logout= () =>{
      Cookies.remove('token')
      dispatch(logout())
      navigate('/login')
    }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
         
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" className="text-white">
          PocketPilot
          </Link>
          </Typography>

          <div sx={{display: "flex",flexWrap: "wrap"}}>
          <Link to='/category' className="text-white">
          <Button color="inherit">Category</Button>
          </Link>
          <Link to='/graph' className="text-white">
          <Button color="inherit">graph</Button>
          </Link>
          <Link to='/list' className="text-white">
          <Button color="inherit">Expence List</Button>
          </Link>

          {
            isAuthenticated && (

              <Button color="inherit" onClick={_logout}>Logout</Button>
            )
          }
          {
            !isAuthenticated && <>
                   
          <Link to='/login' className="text-white">
          <Button color="inherit">Login</Button>
          </Link>
          <Link to='/register' className="text-white">
          <Button color="inherit">Register</Button>
          </Link>
            </>
          }
          </div>
         
        </Toolbar>
      </AppBar>
    </Box>
  );
}