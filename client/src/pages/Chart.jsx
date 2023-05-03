import React,{useState,useEffect} from 'react'

import TransactionChart from '../components/TransactionChart';
import Cookies from 'js-cookie'
import Container from '@mui/material/Container';

const Chart = () => {
    const [transactions, setTransactions] = useState([])

    useEffect(() => {
 
        fetchTransaction()
      }, [])

      const  fetchTransaction = async() =>{
         const token = Cookies.get('token')
        //it is for fetching transacti on datas from database. it is default GET method
      
        const res = await fetch(`https://chelav-backend2.onrender.com/transaction`,{
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
    
    <TransactionChart data={transactions}/>
    
    </Container>
    </div>
  )
}

export default Chart