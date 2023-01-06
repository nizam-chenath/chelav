import * as React from 'react';
import Card from '@mui/material/Card';
import Autocomplete from '@mui/material/Autocomplete';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import  Box  from '@mui/material/Box';
import {useSelector,useDispatch} from 'react-redux'
import {setUser} from '../store/auth.js'


const initialForm = {
    label: '',
    icon: '',
  }

  const icons = ['User']
export default function CategoryForm({ editCategory}) {
    
    const user = useSelector((state) => state.auth.user)
    const dispatch = useDispatch()
    const token = Cookies.get('token')
    const [form, setForm] = useState(initialForm);

    

    useEffect(()=>{
      if(editCategory._id !== undefined){

        setForm(editCategory)
      }
    },[editCategory])


    const handleChange = (e) =>{
        console.log('====================================');
        console.log(e.target.value);
        console.log('====================================');
    
        setForm({...form,[e.target.name] :e.target.value})
    }
    
    const handleDate = (newValue) =>{
          setForm({ ...form,date: newValue})
    }

  const handleSubmit = async ( e ) =>{

    e.preventDefault()
     editCategory._id === undefined ? create() : update()

    console.log("working");
  
  }
  const reload = (res,_user) =>{
    if(res.ok){
      
           dispatch(setUser({user:_user})) 
              setForm(initialForm)
    }
  }

  const create = async() =>{
          // it is for createing a category data

  const res = await  fetch(`http://localhost:5000/category`,{
    method: "POST",
    body: JSON.stringify(form),
    headers: {
     "content-type":"application/json", //for passing json
     Authorization : `Bearer ${token}`,
    },
  });
  const _user = {
      ...user,categories:[...user.categories,{...form}]
  }
  reload(res,_user);
  }

  const update = async() =>{
    // it is for createing a transaction data

const res = await  fetch(`http://localhost:5000/category/${editCategory._id}`,{
method: "PATCH",
body: JSON.stringify(form),
headers: {
"content-type":"application/json", //for passing json
Authorization : `Bearer ${token}`,
},
});
const _user = {
    ...user,
    categories: user.categories.map((cat) => cat._id == editCategory._id? form : cat)
}
reload(res,_user);
}

const getCategoryNameById = () =>{
  return user.categories.find((category) => category.id === form.category_id)?? ""
}

  return (
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
        <Typography variant="h6">
          Add new category :)
        </Typography>
        <Box component='form' onSubmit={handleSubmit} sx={{display: "flex"}}>
       


        <TextField size="small" type="text" name="label" value={form.label} onChange={handleChange} sx={{marginRight: 5}} id="outlined-basic" label="Label" variant="outlined" />
       
            <Autocomplete
        value={getCategoryNameById()}
        onChange={(event, newValue) => {
          setForm({...form, icon: newValue})
        }}
      
        id="icons"
        options={icons}
        sx={{ width: 200 , marginRight:5}}
        renderInput={(params) => <TextField {...params} label="Icon" />}
      />
            {
              editCategory._id !== undefined ?
              <Button type="submit" variant="contained">update</Button>
                  :

            <Button type="submit" variant="contained">Submit</Button>
            }
       </Box>
      </CardContent>
     
    </Card>
  );
}