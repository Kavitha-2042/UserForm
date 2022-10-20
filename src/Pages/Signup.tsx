import React, { useState} from 'react'
import axios from 'axios'
import { initialize } from '../Redux/Slices/userSlice'
import { useAppDispatch } from '../Redux/Hooks'
import { useNavigate } from 'react-router-dom'

const Signup = () => {

    const [ name, setName]  = useState("")
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ conpass, setConPass] = useState("")

    const navigate = useNavigate()

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
            name,email,password, conpass
        })
        .then((signupResponse)=>{
            if(signupResponse.data.auth){
                localStorage.setItem("jwt-token", signupResponse.data.token)
                dispatch(initialize({auth:signupResponse.data.auth, user:signupResponse.data.user}))
                
            }
            alert(signupResponse.data.message)
            navigate('/signin')
        })
        .catch(err=>console.log(err))

        //window.location.reload();

        
    }

  return (
    <div style={{textAlign:"center"}}>
        <form action="">
            <h1>Sign Up</h1>
            <input type="text" name ="username" placeholder='username' onChange={(e:any)=>{setName(e.target.value)}} />
           <br />
            <input type="email" name = "email" placeholder='email' onChange={(e:any)=>{setEmail(e.target.value)}} />
            <br />
            <input type="password" name = "password" placeholder='password' onChange={(e:any)=>{setPassword(e.target.value)}} />
            <br />
            <input type="password" name = "confirm password" placeholder='confirm password' onChange={(e:any)=>{setConPass(e.target.value)}} />
            <br />
            <button onClick={handleEvent}>Sign up</button>
        </form>
    </div>
  )
}

export default Signup