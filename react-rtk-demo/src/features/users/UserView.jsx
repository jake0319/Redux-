import { useSelector } from "react-redux"
const UserView = () => {
  const users = useSelector((state)=>state.users.users)
  return (
    <div>
      list of users
      <li>
        {users.map((user)=><ol key={user.id}>{user.name}:{user.id} </ol>)}
      </li>
    </div>
  )
}

export default UserView