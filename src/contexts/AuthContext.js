import { useState,useContext,useEffect, createContext } from "react";
import { auth } from "../firebase";
import { GoogleAuthProvider,FacebookAuthProvider,signInWithRedirect,onAuthStateChanged,signOut } from '@firebase/auth'

const AuthContext = createContext()

export const AuthContextProvider = ({children})=>{
    const [loading,setLoading] = useState(true)
    const [user,setUser] = useState(null)

    const googleSignIn = ()=>{
        const googleprovider = new GoogleAuthProvider()
        signInWithRedirect(auth,googleprovider)
    }

    const facebookSignIn = ()=>{
        const facebookprovider = new FacebookAuthProvider()
        signInWithRedirect(auth,facebookprovider)
    }

    const logOut = ()=>{
        signOut(auth)
    }


    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,(user)=>{
            setUser(user)
            setLoading(false)
        })
        return ()=>{
            unsubscribe()
        }
        
    },[user])

    return (
        <AuthContext.Provider value={{user,googleSignIn,facebookSignIn,logOut}}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}
