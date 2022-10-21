import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [checkEmail, setCheckEmail] = useState("");

  const [showBtn, setShowBtn] = useState(false);
  const [url, setUrl] = useState("");

  const eventHandler = (e: any) => {
    e.preventDefault();

    axios
      .post("/user/forgotpassword", { email: checkEmail })
      .then((forgotPasswordResult) => {
        // if(forgotPasswordResult.data.auth){
        //     localStorage.setItem("jwt-token", forgotPasswordResult.data.token)
        //     dispatch(initialize({user: forgotPasswordResult.data.user, auth: forgotPasswordResult.data.auth}))
        // }
        console.log("Forgot pass:", forgotPasswordResult);
        

        setUrl(forgotPasswordResult.data.Link);

        if (forgotPasswordResult.data.Link) {
          setShowBtn(true);
        }
        alert(forgotPasswordResult.data.message)
        
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <form action="" style={{ textAlign: "center" }}>
        <h1>Forgot Password</h1>
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={(e: any) => {
            setCheckEmail(e.target.value);
          }}
        />
        <br />
        <button onClick={eventHandler}> Submit </button>
        <br />

        {showBtn ? (
          <Link to={url}>
            <button>Click</button>
          </Link>
        ) : (
          ""
        )}
      </form>
    </div>
  );
};

export default ForgotPassword;
