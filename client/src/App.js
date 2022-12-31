import { useState } from "react";


function App() {

  const [form, setForm] = useState({
    amount:0,
    description: "",
    date: "",
  })

  const handleSubmit = async ( e ) =>{
    e.preventDefault()
    console.log("working");
  const res = await  fetch("http://localhost:4000/transaction",{
    method: "POST",
    body: form,
  });
  console.log(res)
  }
  const handleInput = (e) =>{
    console.log('====================================');
    console.log(e.target.value);
    console.log('====================================');

    setForm({...form,[e.target.name] :e.target.value})
 

  }
  return (
    <div className="App">
     <form action="" onSubmit={handleSubmit}>
       <input name="amount" type="number" value={form.amount} onChange={handleInput} placeholder="Enter transaction amount" />
       <input name="description" type="text" value={form.description} onChange={handleInput} placeholder="Enter transaction detail" />
       <input name="date" onChange={handleInput} type="date"  value={form.date}/>
       <button type="submit" >submit</button>
     </form>
    </div>
  );
}

export default App;
