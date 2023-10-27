import { useSelector } from "react-redux"
const IcecreamView = () => {
  const numOfIcecream = useSelector((state)=>state.icecream.numOfIcecream)
  return (
    <div>
      <h2>Number of icecreams: { numOfIcecream }</h2>
      <button>order icecream</button>
      <button>restock icecreams</button>
    </div>
  )
}

export default IcecreamView