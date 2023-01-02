import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',        //call store using this name
    initialState:{
        isAuthenticated:false,
        user:{}
    },
    reducers: {
                     // using this functions we can update the state
        setUser: (state,{payload}) => {
            
          state.user = payload.user;
          state.isAuthenticated = true;
        },
        logout: (state) =>{
            state.user = {};
            state.isAuthenticated = false;
        }
       
      },
})

export const {setUser, logout} = authSlice.actions

export default authSlice.reducer