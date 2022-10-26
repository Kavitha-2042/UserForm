import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router'


const ChangePassword = () => {

    const [newPassword, setNewPassword] = useState("")
    const [conNewPassword, setConNewPassword] = useState("")

    const navigate = useNavigate()

    const eventHandler = (e:any) =>{
        e.preventDefault();
        
        axios.post('/user/changepassword', { newPassword, conNewPassword})
        .then((changePasswordResult)=>{
            console.log("changePasswordResult: ", changePasswordResult)
            if(changePasswordResult.data.status === true){
                console.log("Became true")
                alert(changePasswordResult.data.message)
                navigate('/profile')
            }
            console.log("become false")
        })
        .catch(err=>console.log("error caught"))
    }

  return (
    <div>
        <form action="" style={{textAlign:"center"}}>
            <h1>Change Password</h1>
            <input type="password" name = "New Password" placeholder='New Password' onChange={(e:any)=>{setNewPassword(e.target.value)}}/>
            <br />
            <input type="password" name = "Confirm Password" placeholder = "Confirm Password" onChange={(e:any)=>{setConNewPassword(e.target.value)}}/>
            <br/>
            <button onClick={eventHandler}>Submit</button>
        </form>
    </div>
  )
}

export default ChangePassword