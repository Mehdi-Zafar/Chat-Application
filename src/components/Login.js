import {FcGoogle} from 'react-icons/fc'
import {FaFacebook} from 'react-icons/fa'
import "firebase/app"
import { useAuth } from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const Login = () => {

    const {googleSignIn,facebookSignIn,user} = useAuth()
    const navigate = useNavigate()

    const handleGoogleSignIn = async ()=>{
        try{
            await googleSignIn()
        }catch(err){
            console.log(err)
        }
    }

    const handleFacebookSignIn = async ()=>{
        try{
            await facebookSignIn()
        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        if(user !== null){
            navigate('chats')
        }
    },[user])

    return ( 
        <div className="h-screen flex flex-col justify-center items-center" style={{backgroundImage:`url('/background.jpg')`,backgroundSize: 'cover',backgroundRepeat: 'no-repeat'}}>
            <div className="px-3 py-5 rounded-lg tracking-wider">
                <h1 className="text-white m-2 text-4xl font-bold w-full text-center">Welcome to Chat Application</h1>
                <div className="mx-2 my-4 flex justify-center">
                    <button
                    onClick={handleGoogleSignIn}
                    className="flex items-center border-2 rounded-sm border-slate-800"
                    >
                        <span className="bg-white p-3"><FcGoogle/></span> <span className="bg-blue-600 tracking-widest text-white p-2 border-l-2 border-slate-800 font-medium">Sign in with Google</span>
                    </button>
                </div>
                <div className="mx-2 my-4 flex justify-center">
                    <button
                    onClick={handleFacebookSignIn}
                    className="flex items-center border-2 border-slate-800 rounded-sm"
                    >
                        <span className="bg-white p-3"><FaFacebook/></span> <span className="bg-blue-600 tracking-widest text-white p-2 border-l-2 border-slate-800 font-medium">Sign in with Facebook</span>
                    </button>
                </div>
            </div>
        </div>
     );
}
 
export default Login;