
import AppBar from './components/AppBar'

import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import {getUser} from './store/auth.js'
import React,{useState} from 'react'
import Cookies from 'js-cookie'
import {Navigate, redirect} from 'react-router-dom'


function App() {


 
 const dispatch = useDispatch()   // used for geting functions from redux store
 
 const token = Cookies.get("token")
 const [isLoading, setisLoading] = useState(true)

 

 const fetchUser = async() =>{
     setisLoading(true)
  const res = await fetch('http://localhost:5000/user',{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if(res.ok){
      const user  = await res.json()
      
      dispatch(getUser(user))
    }
    setisLoading(false)


    
 }

 useEffect(()=>{
    fetchUser()
 },[])

if(isLoading){
  return <p>Loading..</p>
}


  return (
    <div className="App">

      <AppBar />
      <Outlet/>
  
   

     <br />

     
    </div>
  );
}

export default App;
