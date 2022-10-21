import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const ResetPassword = () => {

    const [ newPassword, setNewPassword] = useState("")
    const [ conNewPassword, setConNewPassword] = useState("")

    

    const navigate = useNavigate()

    const params = useParams()

    const eventHandler = (e:any) =>{
        e.preventDefault()

        axios.post("/user/forgotpassword/"+params.url, { newPassword, conNewPassword})
        .then((updatePassword)=>{
          console.log("update: ", updatePassword)


          if(updatePassword.data.status === true){
            alert(updatePassword.data.message)
            navigate('/signin')
          }
          alert(updatePassword.data.message)
        })
        .catch(err=>console.log(err))
    }

  return (
    <div>
        <form action="" style={{textAlign:"center"}}>
          <h1>Reset password</h1>
      
          

            <input type="password" name="new password" placeholder='new password'  onChange={(e:any)=>{setNewPassword(e.target.value)}}/><br />
            <input type="password" name="confirm password" placeholder="confirm password" onChange={(e:any)=>{setConNewPassword(e.target.value)}} /><br />
            <button onClick={eventHandler}>Submit</button>
        </form>
    </div>
  )
}

export default ResetPassword