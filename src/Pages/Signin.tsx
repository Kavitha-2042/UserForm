import axios from 'axios'
import React, { useState } from 'react'
import { initialize } from '../Redux/Slices/userSlice'
import { useAppDispatch } from '../Redux/Hooks';
import { Link, useNavigate } from 'react-router-dom';
import Home from './Home';



const Signin = () => {

    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

  

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const eventHandler = (e:any) =>{
        e.preventDefault();

        axios.post("/user/signin", { email, password})
        .then((signinResult)=>{
            if(signinResult.data.auth){
                localStorage.setItem("jwt-token", signinResult.data.token)
                dispatch(initialize({user: signinResult.data.user, auth: signinResult.data.auth}))
  
                navigate("/homelogin")
            }
            console.log("Signin")
            alert(signinResult.data.message)
            
            
                console.log("signin token: ", signinResult.data.token)
            //window.location.reload()
            
        })


        .catch(err=>alert(err))

        
    }

  return (
    <div>
      <Home/>
      <form action="" style={{textAlign:"center"}}>
        <h1>Sign in</h1>
        <input type="email" name="email" placeholder='email' onChange={(e:any)=>{setEmail(e.target.value)}} required />
        <br />
        <input type="password" name = "password" placeholder='password' onChange={(e:any)=>{setPassword(e.target.value)}} required/>
        <br />
        <button onClick={eventHandler} >Sign in</button>
        <br />
        <Link to="/forgotpassword">Forgot Password</Link>
        
        

      </form>
    </div>
  )
}

export default Signin


