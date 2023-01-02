import React from 'react'
import TransactionForm from "../components/TransactionForm";
import TransactionsList from "../components/TransactionsList";
import Container from '@mui/material/Container';
import { useEffect, useState } from "react";
import Cookies from 'js-cookie'


const Home = () => {
    const [transactions, setTransactions] = useState([])
    const [editTransaction, setEditTransaction] = useState({})

    useEffect(() => {
 
        fetchTransaction()
      }, [])

      const  fetchTransaction = async() =>{
         const token = Cookies.get('token')
        //it is for fetching transacti on datas from database. it is default GET method
      
        const res = await fetch(`http://localhost:5000/transaction`,{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        const {data} = await res.json();
       setTransactions(data)
        console.log(data)
        console.log("datas", transactions)
    
      }
  return (
    <div>
            <Container>
      
      <TransactionForm fetchTransaction={fetchTransaction} editTransaction={editTransaction}/>

      <TransactionsList transactions={transactions} fetchTransaction={fetchTransaction} setEditTransaction={setEditTransaction}/>
      </Container>
    </div>
  )
}

export default Home