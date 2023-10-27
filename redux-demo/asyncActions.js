const redux = require('redux')
const thunkMiddleware = require('redux-thunk').default
const axios = require('axios')
const createStore = redux.createStore

//1. 우선 state를 정의합니다.
const initialState = {
  loading: true, //로딩스피너를 출력할 용도
  data: [],  // fetch해올 데이터
  error: '' // 에러발생시 표기 문구
  }
  //2. 3가지 액션(&액션생성함수)를 정의합니다.
  const FETCH_USERS_REQUESTED = 'FETCH_USERS_REQUESTED' //데이터를 요청하는 액션
  const FETCH_USERS_SUCCEEDED = 'FETCH_USERS_SUCCEEDED' // 1)의 액션에 따라 성공적으로 동작시 수행할 액션
  const FETCH_USERS_FAILED = 'FETCH_USERS_FAILED' //1)의 액션에 따라 실패할 시 수행할 액션
  const fetchUsersRequest = () => {
    return {
      type : FETCH_USERS_REQUESTED
    }
  }
  
  const fetchUsersSucesss = (users) => {
    return {
      type : FETCH_USERS_SUCCEEDED,
      payload: users, // thunk 미들웨어로부터 fetch해온데이터를 받음
    }
  }
  const fetchUsersFailure = (error)=>{
    return {
      type: FETCH_USERS_FAILED,
      payload: error, // thunk 미들웨어로부터 에러를 받음
    }
  }

  //3. 리듀서를 정의합니다.
function reducer (state = initialState,action){
    switch(action.type){
      case FETCH_USERS_REQUESTED:
        return{ ...state, loading: true }
      case FETCH_USERS_SUCCEEDED:
        return { loading: false, users: action.payload, error:'' } //(from API)
      case FETCH_USERS_FAILED:
        return { loading: false, users:[], error: action.payload } //(from API)
    }
  }
  const store = createStore(reducer,redux.applyMiddleware(thunkMiddleware))

//4. 비동기액션 생성 함수를 정의 (일반 액션생성자함수와 다른 생성함수 선언 필요)
//썽크미들웨어: 비동기액션생성 함수가 액션객체가 아닌 함수를 반환하는 것을 가능케함
//이 내부 함수는 순수할 필요가 없음, 따라서 내부에서 비동기작업같은 사이드이펙트 작업이 가능함
// 그리고 이 내부 함수는 action을 dispatch할 수 있음.(인자로 dispatch함수를 받기 때문!)
const fetchUsers = ()=>{
  return async function(dispatch){
    dispatch(fetchUsersRequest())
    try{
    const res = await axios.get('https://jsonplaceholder.typicode.com/users')
    const users = res.data.map(users=>users.id)
    dispatch(fetchUsersSucesss(users)) //action.payload로 전달되서 state를 수정
    }
    catch(error){
      dispatch(fetchUsersFailure(error.message))//action.payload로 전달되서 state를 수정
    }
  }
} 
store.subscribe(()=>console.log(store.getState()))
store.dispatch(fetchUsers()) //비동기액션생성함수를 dispatch해주는 과정도 필요하다.
//unsubscribe호출은  비동기작업이 끝나기전에 호출되어 해당 비동기액션을 취소할 수 있으므로 작성하지 않음.
