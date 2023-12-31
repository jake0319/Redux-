import { createSlice } from '@reduxjs/toolkit'
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
  extraReducers: (builder)=>{builder.addCase('cake/ordered',(state,action)=>{
    state.numOfIcecream -= action.payload
  })}
}); //=> action값은 cakeActions.ordered액션을 디스패치 할 때 넘긴 값을 사용

export default icecreamSlice.reducer
export const {ordered, restocked} = icecreamSlice.actions 