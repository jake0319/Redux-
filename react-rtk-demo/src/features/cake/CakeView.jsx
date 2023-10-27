import { useSelector, useDispatch} from "react-redux"
import {ordered,restocked} from './cakeSlice'
function CakeView() {
  const numOfCakes = useSelector((state)=>state.cake.numOfCakes)
  const dispatch = useDispatch()
  return (
    <div>
      <h2>Number of Cakes: {numOfCakes}</h2>
      <button onClick={()=>{dispatch(ordered(1))}}>order Cake</button>
      <button onClick={()=>{dispatch(restocked(3))}}>restock Cakes</button>
    </div>
  )
}

export default CakeView