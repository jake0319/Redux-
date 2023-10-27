import { useSelector, useDispatch } from "react-redux"
import {ordered,restocked} from './icecreamSlice'
const IcecreamView = () => {
  const numOfIcecream = useSelector((state)=>state.icecream.numOfIcecream)
  const dispatch = useDispatch()
  return (
    <div>
      <h2>Number of icecreams: { numOfIcecream }</h2>
      <button onClick={()=>{dispatch(ordered())}}>order icecream</button>
      <button onClick={()=>{dispatch(restocked(3))}}>restock icecreams</button>
    </div>
  )
}

export default IcecreamView