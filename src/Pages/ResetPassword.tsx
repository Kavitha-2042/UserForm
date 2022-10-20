import React, { useState } from 'react'

const ResetPassword = () => {

    const [ newPassword, setNewPassword] = useState("")
    const [ conNewPassword, setConNewPassword] = useState("")

    const eventHandler = (e:any) =>{
        e.preventDefault()


    }

  return (
    <div>
        <form action="">
            <input type="password" name="new password" placeholder='new password'  onChange={(e:any)=>{setNewPassword(e.target.value)}}/><br />
            <input type="password" name="confirm password" placeholder="confirm password" onChange={(e:any)=>{setConNewPassword(e.target.value)}} /><br />
            <button onClick={eventHandler}>Submit</button>
        </form>
    </div>
  )
}

export default ResetPassword