
import AppBar from './components/AppBar'

import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import {setUser} from './store/auth.js'
import React,{useState} from 'react'
import Cookies from 'js-cookie'
import {Navigate, redirect} from 'react-router-dom'

/**
 *  - this is my app.js
 * @module App
 *
 * @returns 
 */
function App() {


 
 const dispatch = useDispatch()   // used for geting functions from redux store
 
 const token = Cookies.get("token")
 const [isLoading, setisLoading] = useState(true)

 

 /**
  * @memberof App
  * @function fetchUser
  * @summary - this is a function for fetch the users
  */
 const fetchUser = async() =>{
     setisLoading(true)
  const res = await fetch('http://localhost:5000/user',{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })

    if(res.ok){
      const user  = await res.json()
      
      dispatch(setUser(user))
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
