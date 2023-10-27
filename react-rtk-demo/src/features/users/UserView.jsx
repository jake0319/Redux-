import { useSelector, useDispatch } from "react-redux"
import { fetchUsers } from './usersSlice'
import { useEffect } from "react"
const UserView = () => {
  const user = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchUsers())
  },[])
  console.log(user.users)
  return (
    <div>
      list of users
      <ul>
        {user.loading && 'loading...'}
        {!user.loading && user.error ? <div>{user.error}</div> : null}
        {!user.loading && user.users.length ? (user.users.map((user)=><li key={user.id}>{user.name}:{user.id} </li>)) : null} 
      </ul>
    </div>
  )
}

export default UserView