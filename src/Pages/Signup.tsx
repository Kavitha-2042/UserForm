import React, { useState} from 'react'
import axios from 'axios'
import { initialize } from '../Redux/Slices/userSlice'
import { useAppDispatch } from '../Redux/Hooks'

const Signup = () => {

    const [ name, setName]  = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const dispatch = useAppDispatch()

    const handleEvent = async (e:any) =>{
        e.preventDefault();

        // let res = await fetch('http://localhost:5000/user',{
        //     method: "POST",
        //     headers: {
        //         "Content-Type" : "Application/json"
        //     },
        //     body: JSON.stringify({name, email, password})
        // })

        axios.post("/user/signup", {
            name,email,password
        })
        .then((signupResponse)=>{
            if(signupResponse.data.auth){
                localStorage.setItem("jwt-token", signupResponse.data.token)
                dispatch(initialize({auth:signupResponse.data.auth, user:signupResponse.data.user}))
                
            }
            alert(signupResponse.data.message)
        })
        .catch(err=>console.log(err))
    }

  return (
    <div style={{textAlign:"center"}}>
        <form action="">
            <h1>Sign Up</h1>
            <input type="text" name ="username" placeholder='username' onChange={(e:any)=>{setName(e.target.value)}} />
           
            <input type="email" name = "email" placeholder='email' onChange={(e:any)=>{setEmail(e.target.value)}} />
            
            <input type="password" name = "password" placeholder='password' onChange={(e:any)=>{setPassword(e.target.value)}} />
            
            <button onClick={handleEvent}>Sign up</button>
        </form>
    </div>
  )
}

export default Signup