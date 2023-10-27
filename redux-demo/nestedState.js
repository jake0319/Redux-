const redux = require('redux');
const produce = require('immer').produce


// 1. 초기 상태값 정의
// 2. 액션상수, 액션객체를 리턴하는 액션생성함수 정의
// 3. 리듀서 정의
// 4. 스토어객체 생성
// 5. store.dispatch호출 (액션바인딩)
const initialState = {
  name: 'Vishwas',
  address: {
    street: '123 Main st',
    city: 'Boston',
    state: 'MA'
  }
} //중첩 스테이트

const STREET_UPDATED ='STREET_UPDATED' //액션정의 문장열상수
const updateStreet = (street)=>{ //액션생성함수
  return {
    type: STREET_UPDATED,
    payload: street,
  }
}

const reducer =(state =initialState, action)=>{
  switch(action.type){
    case STREET_UPDATED:
      // return {
      //   ...state,
      //   address: {
      //     ...state.address,
      //     street: action.payload,
      //   }
      // }
      return produce(state,(draft)=>{
        draft.address.street = action.payload
      })
    default:
      return state
  }
}
//즉 draft는 state의 프록시 객체이고, draft를 수정하면 state의 불변성을 유지하는 newState를 반환한다. 
// immer의 produce((d)=>{})를 사용하면 얕은복사의 불변성 문제를 쉽게 해결할 수 있다.
// 불변성이 지켜지는 객체처럼 손쉽게 state변경본을 리턴할 수 있음.

// 스토어생성하기
const createStore = redux.createStore
const store = createStore(reducer)
console.log('initial state', store.getState())
const unsubscribe = store.subscribe(()=>console.log('update',store.getState()))
store.dispatch(updateStreet('456 Main st'))
unsubscribe()