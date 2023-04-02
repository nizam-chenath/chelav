import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import App from './App';
import Chart from "./pages/Chart"
import { createBrowserRouter, } from 'react-router-dom'
import Category from './pages/Category'
import CheckAuth from './utils/CheckAuth';
import Guest from './utils/Guest';
import ListExpences from './pages/ListExpences';
import Hero from './pages/Hero';
import Admin from './pages/Admin';




export default createBrowserRouter([
    {
    
      element: <App />,
      children:[ 
        {
        path: "/addexpence",
        element: <CheckAuth>
            <Home/>
        </CheckAuth>
       
      },
      {
        path: "/login",
        element:<Guest>
            
            <Login />
        </Guest>
      },
      {
        path: "/register",
        element:<Guest>
                 <Register/>
        </Guest> 
      },
      {
        path: "/category",
        element:<CheckAuth>
                 <Category/>
        </CheckAuth> 
      },
      {
        path: "/graph",
        element: <CheckAuth>
              <Chart/>

        </CheckAuth>
      },
      {
        path: "/list",
        element: <ListExpences>
              <Chart/>

        </ListExpences>
      },
      {
        path: "/",
        element: <Hero>
              

        </Hero>
      },
      {
        path: "/admin",
        element: <Admin></Admin>


      }
    ]
    },
  ]);