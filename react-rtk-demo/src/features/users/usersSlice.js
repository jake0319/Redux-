import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
const initialState = {
  loading : false,
  users : [],
  error: ''
}

export const fetchUsers = createAsyncThunk('user/fetchUsers',()=>{
  return axios.get('https://jsonplaceholder.typicode.com/users')
  .then((res)=>res.data
  )
}) // CAT함수는 프로미스라이프 사이클에서 발생하는 각 액션을 자동으로 디스패치해준다.

const usersSlice = createSlice({
  name: 'user',
  initialState,
  extraReducers: (builder)=>{
    builder.addCase(fetchUsers.pending,(state)=>{
      state.loading = true
      state.users = []
      state.error =''
    })
    builder.addCase(fetchUsers.fulfilled,(state,action)=>{
      state.loading = false
      state.users = action.payload
      state.error =''
    })// action.payload은 프로미스 리턴값이 주입 
    builder.addCase(fetchUsers.rejected,(state,action)=>{
      state.loading = false
      state.users = []
      state.error = action.payload
    })
  }

})

export default usersSlice.reducer