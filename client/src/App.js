import { useEffect, useState } from "react";
import AppBar from './components/AppBar'

import { Outlet } from "react-router-dom";


function App() {




  return (
    <div className="App">

      <AppBar />
      <Outlet/>
  
   

     <br />

     
    </div>
  );
}

export default App;
