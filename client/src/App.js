import { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import AppBar from './components/AppBar'
import TransactionForm from "./components/TransactionForm";
import TransactionsList from "./components/TransactionsList";

function App() {



  const [transactions, setTransactions] = useState([])

  useEffect(() => {
 
    fetchTransaction()
  }, [])

  const  fetchTransaction = async() =>{

    //it is for fetching transacti on datas from database. it is default GET method
  
    const res = await fetch("http://localhost:4000/transaction")
    const {data} = await res.json();
   setTransactions(data)
    console.log(data)
    console.log("datas", transactions)

  }
  



  return (
    <div className="App">

      <AppBar />
      
      <TransactionForm fetchTransaction={fetchTransaction} />

      <TransactionsList transactions={transactions}/>
   

     <br />

     
    </div>
  );
}

export default App;
