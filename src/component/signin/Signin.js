import React, { useState, useEffect } from "react";
import "./Signin.css";
import graphics from "../assets/graphics.jpg";
import axios from "axios";
import { Link } from "react-router-dom";

const Signin = () => {
  const [SignINEmail, setSignINEmail] = useState();
  const [SignINPassword, setSignINPassword] = useState();
  const [route, setRoute] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  const handleSignInEmail = (e) => {
    setSignINEmail(e.target.value);
  };

  const handleSignInPassword = (e) => {
    setSignINPassword(e.target.value);
  };

  const submitSignup = (e) => {
    console.log({
      SignINEmail,
      SignINPassword,
    });
    e.preventDefault();

    const signInUserData = {
      userSignInEmail: SignINEmail,
      userSignInPassword: SignINPassword,
    };

    axios
      .post("http://localhost:5000/signin", signInUserData)
      .then((response) => {
        console.log(response.data);
        if (response.data.success === "success") {
          setRoute(true);
          console.log('matching the data')
        }else if(response.data.error === "incorrect"){
          setPasswordErr(true)
          console.log('setPassword is ', true)
        } else{
          console.log('data is not matching')
        }
      })
      .catch((error) => {
        console.log("error Found", error);
      });
  };

  useEffect(() => {

    if(passwordErr){
    const timeoutId = setTimeout(() => {
        setPasswordErr(false)
      },4000)
      return () => clearTimeout(timeoutId);
    }
  },[passwordErr])

  console.log('route is ', route);

  return (
    <div className="signin">
      <div className="signin-wrapper">
        <div className="signin-row">
          <div className="left-row">
            <img src={graphics} alt="" className="graphics-img" />
          </div>
          <div className="right-row">
            <div className="inputs">
              <h1 className="right-row-h1">Sign in to Discover</h1>

              <div className="class-inp">
                <h1 className="input-headers ">Username or Email</h1>
                <input
                  type="text"
                  className="main-input input-password"
                  onChange={handleSignInEmail}
                />
                <h1 className="input-headers">Password</h1>
                <input
                  type="text"
                  className="main-input input-password"
                  onChange={handleSignInPassword}
                />
                {
                  passwordErr ? (
                    <div>
                      <h1 className="wrong-pass">email or password is wrong</h1>
                    </div>
                  ) : ( <div style={{display: "none"}}></div>)
                }
              </div>
              {route ? (
                <Link to={'/success'} style={{width: '100%'}}>
                  <button className="button">Sign in</button>
                </Link>
              ) : (
                <button className="button" onClick={submitSignup}>
                  Sign in
                </button>
              )}
              <Link to="/">
                <h4>Sign Up</h4>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
