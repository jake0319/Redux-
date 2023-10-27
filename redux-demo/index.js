const reduxLogger = require('redux-logger')

const redux = require('redux');
//type은 state를 변경하는 행위의 종류를 문자열상수로 정의한다.
const CAKE_ORDERED = 'CAKE_ORDERED'; //문자열 상수로 type변수 정의
const RESTOCK_CAKE = 'RESTOCK_CAKE';
const ICECREAM_ORDERED = 'ICECREAM_ORDERED';
const RESTOCK_ICECREAM = 'RESTOCK_ICECREAM';

// [미들웨어 적용하기(로거,어플라이미들웨어)]
const logger = reduxLogger.createLogger() //로거 미들웨어가 생성되었습니다.
// but how? 리덕스에 적용하는가?
const applyMiddleware = redux.applyMiddleware



const createStore = redux.createStore;
const combineReducers = redux.combineReducers
const bindActionCreators = redux.bindActionCreators; // 바인드액션생성자함수 선언(호출형태가 아니라 참조형태임)
//액션생성자함수
function orderCake(){
	return {
			type: CAKE_ORDERED,
			payload: 1 //action에 담아보내는 payload라고 생각하기
	}
}
function restockCake(qty=1){
  return {
    type: RESTOCK_CAKE,
    payload: qty,
  }
}
function orderIceCream(){
  return {
    type: 'ICECREAM_ORDERED',
    payload:1,
  }
}
function restockIceCream(qty=1){
  return { 
    type: 'RESTOCK_ICECREAM',
    payload: qty,
  }
}

const cakeInitialState = { // initial state, 반드시 객체 형태
  numOfCakes : 10,
  anotherProperty: 0,
}
const iceInitialState = {
  numOfIceCream : 20,
  anotherProperty: 0,
}

//reducer: action에 따라 state전환이 어떻게 이뤄질지 정의하는 함수
const cakeReducer = (state = cakeInitialState , action) =>{
	switch (action.type){
		case CAKE_ORDERED: //해당 타입의 액션일 경우
			return {
			  ...state, //spread operator로 관심속성 외의 다른 속성도 복사해주어야함 (불변성유지)
			  numOfCakes: state.numOfCakes - 1 //파라미터로 받아온 기존 prevState로부터 값을 참조하므로
			}
    case RESTOCK_CAKE:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload
      }
    default:
      return state
    }
  }

  const iceReducer = (state = iceInitialState , action) =>{
    switch (action.type){
      case ICECREAM_ORDERED: //해당 타입의 액션일 경우
        return {
          ...state, //spread operator로 관심속성 외의 다른 속성도 복사해주어야함 (불변성유지)
          numOfIceCream: state.numOfIceCream - 1 //파라미터로 받아온 기존 prevState로부터 값을 참조하므로
        }
      case RESTOCK_ICECREAM:
        return {
          ...state,
          numOfIceCream: state.numOfIceCream + action.payload
        }
      default:
        return state
      }
    }
// key - reducer 형태로 합쳐준 루트리듀서 생성 
const rootReducer = combineReducers({
  cake : cakeReducer, // 해당 키갑은 
  ice : iceReducer,
})
const store = createStore(rootReducer,applyMiddleware(logger)) //해당 함수 호출해서 스토어객체 생성해주기, reducer를 파라미터로 받는다.
console.log('Initial State', store.getState())


const unsubscribe = store.subscribe(()=>{})


// store.dispatch(orderCake()) //액션생성함수 호출을 통해 dispatch함수에 액션 전달
// 액션생성자함수와 store.dispatch를 바인딩해서 사용하는 편의문법(헬퍼함수)
const actions = bindActionCreators({orderCake,restockCake,restockIceCream,orderIceCream},store.dispatch)
actions.orderCake()
actions.orderCake()
actions.orderCake()
actions.restockCake(3)  //10
actions.orderIceCream() //
actions.orderIceCream()
actions.restockIceCream(3)



unsubscribe()
