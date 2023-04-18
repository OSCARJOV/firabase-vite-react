import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../context/UserProvider"

const Login = () => {

  const [email, setEmail] = useState('prueba@prueba.com')
  const [password, setPassword] = useState('123456')

  const navegate = useNavigate();
  const { loginuser } = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await loginuser(email, password)
      console.log("exitoso");
      navegate("/")
    } catch (error) {
      console.log(error.code);
    }

    console.log("procesando", email, password);
  }

  return (
    <>
      <h1>Login</h1>
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
        <button type="submit">Login</button>

      </form>
    </>
  )
}

export default Login
