import { useEffect,useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {ChatEngine} from 'react-chat-engine'
import axios from 'axios'
import { MessageFormSocial } from "react-chat-engine";


const Chats = () => {

    const {user,logOut} = useAuth()
    const navigate = useNavigate()
    const location = useLocation()
    const [loading,setLoading] = useState(true)
    console.log(user)

    const handleLogout = async ()=>{
        try{
            await logOut()
        }catch(err){
            console.log(err)
        }
    }

    const getFile = async (url)=>{
        const response = await fetch(url)
        const data = await response.blob()

        return new File([data],"userPhoto.jpg",{type:'image/jpeg'})
    }

    useEffect(()=>{
        if(!user){
            navigate('/')
            return;
        }

        axios.get('https://api.chatengine.io/users/me',{
            headers:{
                "Project-ID":"26662382-db93-44ad-8ae7-00e464da5baa",
                "User-Name": user.email,
                "User-Secret": user.uid,
            }
        })
        .then(()=>{
            console.log('success')
            setLoading(false)
        })
        .catch(()=>{
            let formdata = new FormData()
            formdata.append('email',user?.email)
            formdata.append('username',user?.email)
            formdata.append('secret',user?.uid)

            getFile(user?.photoURL)
                .then((avatar)=>{
                    formdata.append('avatar',avatar,avatar?.name)
                
                    axios.post('https://api.chatengine.io/users/',
                        formdata,
                        {headers:{"Private-Key":"c3935ccb-f405-49ca-90a4-b1360b8d5e77"}},
                    )
                    .then(()=>{
                        setLoading(false)
                    })
                    .catch((error)=>console.log(error))
                })
        
        })
    },[user,location])

    if(!user || loading) return (
        <h1 className="text-3xl text-black flex justify-center items-center h-screen">Loading...</h1>
    )

    return ( 
        <div>
            <div className="bg-white flex justify-between items-center">
                <h1 className="text-slate-800 text-3xl ml-4">Chat App</h1>
                <button className="text-lg font-semibold bg-blue-200 rounded-sm m-2 tracking-wider text-slate-800 py-2 px-4" onClick={handleLogout}>Logout</button>
            </div>
        <div>
            <ChatEngine
            height="100vh"
            projectID="26662382-db93-44ad-8ae7-00e464da5baa"
            userName={user.email}
            userSecret={user.uid}
            renderNewMessageForm={()=><MessageFormSocial/>}
            />
        </div>
        </div>
     );
}
 
export default Chats;