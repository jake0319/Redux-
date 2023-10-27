const store = require('./app/store').default
const {cakeActions} = require('./features/cake/cakeSlice')//cakeSlice에서 export한 action모음
const icecreamActions = require('./features/icecream/icecreamSlice').icecreamActions

console.log('initialState',store.getState())

const unsubscribe = store.subscribe(()=>{console.log('updated state',store.getState())}
)
store.dispatch(cakeActions.ordered(1)) //cakeSlice의 reducer객체의 ordered액션키
store.dispatch(cakeActions.ordered(1)) //cakeSlice의 reducer객체의 ordered액션키
store.dispatch(cakeActions.ordered(1)) //cakeSlice의 reducer객체의 ordered액션키
store.dispatch(cakeActions.restocked(3))
store.dispatch(icecreamActions.ordered(2))
unsubscribe()