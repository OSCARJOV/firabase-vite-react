import { useContext } from "react"
import { UserContext } from "../context/UserProvider"
import {Navigate} from 'react-router-dom'

const RequireAuth = ({children}) => {  // CHILDREN ES COMO EL NEXT 
    const {user} = useContext(UserContext)

    if(!user){
        return <Navigate to="/login"/>
    }

  return children // este seria como el next un midleware
  
}

export default RequireAuth