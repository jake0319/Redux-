const createSlice = require("@reduxjs/toolkit").createSlice;
const cakeActions = require('../cake/cakeSlice').cakeActions
const initialState = {
	numOfIcecream: 20,
};
const icecreamSlice = createSlice({
	name: "icecream", // feature이름
	initialState,
	reducers: {
		ordered: (state, action) => {
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
module.exports = { 
  default: icecreamSlice.reducer, 
  icecreamActions: icecreamSlice.actions 
};
// exports.default = icecreamSlice.reducer,
// exports.icecreamActions = icecreamSlice.actions
//새로운 슬라이스 정의 완료ㄴ
