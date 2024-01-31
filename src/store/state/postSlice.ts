import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

// Define a type for the slice state
interface postState {
  caption:string;
}

// Define the initial state using that type
const initialState: postState = {
  caption:"",
}

export const postSlice = createSlice({
  name: 'post',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setPost:(state,action:PayloadAction<{caption:string}>)=>{
        state.caption=action.payload.caption;
         }
  },
})

export const{setPost} =postSlice.actions;  

export default postSlice.reducer;