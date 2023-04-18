import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { createContext, useEffect, useState } from "react"
import { auth } from "../firebase";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(false)

    useEffect(() => {
        const unuscribe = onAuthStateChanged(auth, (user) => {
            console.log(user);
            if(user) {
                const {email, photoURL, displayName, uid} = user
                setUser({email, photoURL, displayName, uid})
            }else{
                setUser(null)
            }
        })
        return () => unuscribe();
    }, [])

    
    const registerUser = (email, password) => createUserWithEmailAndPassword(auth, email, password)

    const loginuser = (email, password) => signInWithEmailAndPassword(auth, email,password)

    const signOutUser = () => signOutUser(auth)

    return (
        <UserContext.Provider value={{ user, setUser, registerUser, loginuser, signOutUser }} > 
        {/* //valor propiedad user: user*/}
            {children} 
            {/* //children trae los componenetes anidados */}
        </UserContext.Provider>
    )
}

export default UserProvider

 