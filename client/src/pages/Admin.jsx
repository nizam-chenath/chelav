import React from 'react'
import { useState, useEffect } from 'react'
import "./admin.css"

const Admin = () => {

  const [usersData, setUsersData] = useState([])
  const getusers = async(e) =>{
    
    const res = await fetch("http://localhost:5000/admin",{
      method: "GET",
      headers: {
        "Content-Type" : "application/json",
      },
     
    })
    const usersdata = await res.json()
    console.log(usersdata)

    if(res.status === 422 || !usersdata){
     
      console.log("err")
    }else{
      setUsersData(usersdata)
      console.log("usersdata succesfully received")
    }
  }
  useEffect(() =>{
    getusers()
  },[])
  return (
    <div className='adminPage'>
       <h1>Admin panel</h1>
       <h2>Total number of users : {usersData.length} </h2>

       list of users:
       <table>
  <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Date of creation</th>
  </tr>
  {usersData.map((item) =>{
    return(

      <tr>
        <td>{item.firstName}</td>
        <td>{item.email}</td>
        <td>{item.createdAt}</td>
      </tr>
    )
  })}
 
 
</table>
        
    </div>
  )
}

export default Admin