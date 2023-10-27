import { createSlice } from '@reduxjs/toolkit'
import {cakeActions} from '../cake/cakeSlice'
const initialState = {
	numOfIcecream: 20,
};
const icecreamSlice = createSlice({
	name: "icecream", // feature이름
	initialState,
	reducers: {
		ordered: (state) => {
			state.numOfIcecream--
		},
		restocked: (state, action) => {
			state.numOfIcecream += action.payload;
		},
	},
  // cake/ordered액션이 발생시 icecream state가 변경된다.
  // extraReducers: {
  //   ['cake/ordered'] : (state,action)=>{
  //     state.numOfIcecream--
  //   }
  // }
  extraReducers: (builder)=>{builder.addCase(cakeActions.ordered,(state,action)=>{
    state.numOfIcecream -= action.payload
  })}
}); //=> action값은 cakeActions.ordered액션을 디스패치 할 때 넘긴 값을 사용

export default icecreamSlice.reducer
export const icecreamActions = icecreamSlice.actions 