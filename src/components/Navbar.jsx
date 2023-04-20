import { useContext } from "react"
import {  NavLink } from "react-router-dom"
import { UserContext } from "../context/UserProvider"

const Navbar = () => {
    const {user, setUser, signOutUser} = useContext(UserContext)


    const handleLogOut = async () => {
      try {
        setUser(null)

        await signOutUser()  

      } catch (error) {
        console.log(error.code);
      }
      
    }
  return (
    <div>


        {
          
            user ? 
            <>
            <NavLink Link to="/">Inicio</NavLink>  
            <button onClick={handleLogOut}>LogOut</button>

           // {/* //NavLink hace que se agregue la clase active */}
           </>
           :
           <>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/register">Register</NavLink>
           </>
           

        }
       
    </div>
  )}

export default Navbar

 