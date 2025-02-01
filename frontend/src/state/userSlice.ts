import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
const initialState = {
  userDetail: {},
  loading: false,
  error: false
}

export const getSession = createAsyncThunk("getSession", async(_, thunkAPI) => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/session`, {
      withCredentials: true
    });
   
    if(Object.keys(res.data.userDetail).length < 1){
      return thunkAPI.rejectWithValue("")
    }
    return res.data.userDetail;
    
  }catch(e){

    return thunkAPI.rejectWithValue("");
  }
})

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetSession: () => {
      
      return initialState
    },
    returnError: (state) => {
      state.error = true;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getSession.pending, (state) => {
      state.error = false;
      state.loading = true;
      
    })
    builder.addCase(getSession.fulfilled, (state, action) => {
      if(Object.keys(action.payload).length < 1){
        state.loading = false;
        state.error = true;
        return;
      }
      state.userDetail = action.payload 
      state.loading = false;
      state.error = false;
    })
    builder.addCase(getSession.rejected, (state) => {
      state.error = true;
      state.loading = false;
    })
    
  }
})

export default userSlice.reducer;
export const { resetSession, returnError } = userSlice.actions;