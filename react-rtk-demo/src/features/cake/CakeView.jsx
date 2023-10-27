import { useSelector } from "react-redux"
function CakeView() {
  const numOfCakes = useSelector((state)=>state.cake.numOfCakes)
  return (
    <div>
      <h2>Number of Cakes: {numOfCakes}</h2>
      <button>order Cake</button>
      <button>restock Cakes</button>
    </div>
  )
}

export default CakeView