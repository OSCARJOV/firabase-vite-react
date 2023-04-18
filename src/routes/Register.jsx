import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserProvider"

const Register = () => {

    const [email, setEmail] = useState('prueba@prueba.com')
    const [password, setPassword] = useState('123456')

    const navigate = useNavigate()

    const {registerUser} = useContext(UserContext)

const handleSubmit = async(e) => {
    e.preventDefault()
   try {
    await registerUser(email, password)
    console.log("exitoso");
    navigate("/login")
   } catch (error) {
    console.log(error.code);
   }
    
console.log("procesando", email , password);
} 

    return (
        <>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="ingrese email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  //  name={email}
                />

                <input
                    type="password"
                    placeholder="ingrese password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                //    name={password}
                />
            <button type="submit">Register</button>

            </form>
        </>
    )
}

export default Register