import { useContext, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import RequireAuth from './components/RequireAuth'
import { UserContext } from './context/UserProvider'
import Home from './routes/Home'
import Login from './routes/Login'
import Register from './routes/Register'


const App = () => {  // home es el elemento children
  
  const {user} = useContext(UserContext)
  
  if(user === false){
    return <p>Loading</p> 
  }
 
  return (
    <>
    
    <Navbar/>
    <h1>APP</h1>
      <Routes>
        <Route path="/" element={
          <RequireAuth> 
            {/* //ruta protegida */}
            <Home/>
          </RequireAuth>
        } />  
        {/* // Home seria el children */}
        <Route path="/login" element={<Login/>} /> 
        <Route path="/register" element={<Register/>} /> 


      </Routes>
    </>
  )
}

export default App
