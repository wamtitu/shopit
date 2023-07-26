import { useState, useEffect } from "react"
import axios from "axios"

function TotalClients() {
    const [users, setUsers] = useState([]);
    const getUsers = async()=>{
        try {
            const res = await axios.get('http://localhost:5000/users')
            setUsers(res.data)
        } catch (error) {
           console.log(error) 
        }
    }
    useEffect(()=>{
        getUsers()
    },[])

  return (
    <div>
        <h2>Users</h2>
        <div className="total">
            total users: {users.length}
        </div>

    </div>
  )
}

export default TotalClients