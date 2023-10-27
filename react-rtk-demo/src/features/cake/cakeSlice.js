import {createSlice} from'@reduxjs/toolkit'

const initialState = {
  numOfCakes: 10
}

//slice? : state,action,reducer의 추상화 구현체 
const cakeSlice = createSlice({
  name: 'cake', //key
  initialState, //initState
  reducers: {
    ordered:(state)=>{ //immer자동적용
      state.numOfCakes-- //state객체를 직접 조작하는 것처럼 작성 
    },
    restocked:(state,action)=>{
      state.numOfCakes += action.payload
    }
  }
})

//슬라이스가 내부적으로 담고있는 프로퍼티 reducer,actions를 참조해서 내보냄 
// module.exports = {
//   default: cakeSlice.reducer,
//   cakeActions: cakeSlice.actions
// }
export default cakeSlice.reducer
export const cakeActions = cakeSlice.actions