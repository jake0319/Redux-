  const {configureStore, getDefaultMiddleware} = require('@reduxjs/toolkit')
  const cakeReducer = require('../features/cake/cakeSlice').default
  const icecreamReducer = require('../features/icecream/icecreamSlice').default
  
  // const reduxLogger = require('redux-logger').createLogger
  // const logger = reduxLogger.createLogger()
  const store = configureStore({
    reducer:{
      cake: cakeReducer,
      icecream: icecreamReducer,
    },
    // middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(logger)
  })
  //네, 맞습니다. Redux Toolkit의 configureStore 함수는 기본적으로 Redux Thunk와 Redux DevTools Extension 지원 등의 미들웨어를 자동으로 설정해줍니다. 따라서 이들을 별도로 추가할 필요가 없습니다.

  module.exports ={ default: store }