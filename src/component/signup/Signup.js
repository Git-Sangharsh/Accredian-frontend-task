import React, { useEffect, useState } from "react";
import "./Signup.css";
import graphics from "../assets/graphics.jpg";
import axios from "axios";
import { Link } from "react-router-dom";
const Signup = () => {
  const [SignupUsername, setSignupUsername] = useState("");
  const [SignupEmail, setSignupEmail] = useState("");
  const [SignupPassword, setSignupPassword] = useState("");
  const [SignupConfirmPassword, setSignupConfirmPassword] = useState("");
  const [passLength, setPassLength] = useState(false);
  const [emptyInput, setEmptyInput] = useState(false);
  const [route, setRoute] = useState(false);

  const handleSignupUsername = (e) => {
    setSignupUsername(e.target.value);
  };

  const handleSignupEmail = (e) => {
    setSignupEmail(e.target.value);
  };

  const handleSignupPassword = (e) => {
    setSignupPassword(e.target.value);
  };

  const handleSignupConfirmPassword = (e) => {
    setSignupConfirmPassword(e.target.value);
  };

  const [duplicateEmail, setDuplicateEmail] = useState(false);

  const submitSignup = (e) => {
    if (
      SignupUsername.length > 2 &&
      SignupPassword === SignupConfirmPassword &&
      SignupPassword.length >= 8
    ) {
      // setRoute(true);  // Trigger route change here

      const userData = {
        userName: SignupUsername,
        userEmail: SignupEmail,
        userPassword: SignupPassword,
        userConfirmPassword: SignupConfirmPassword,
      };

      axios
        .post("http://localhost:5000/user", userData)
        .then((response) => {
          console.log(response.data);
          if (response.data.error && response.data.error === "Duplicate email") {
            console.log("Duplicate email found");
            setDuplicateEmail(true);
          } else if (response.data.backendSuccess === "success") {
            console.log("logging successssssss")
            setRoute(true);  // Trigger route change here

            //!
            // console.log("everything is fine");
          }
        })
        .catch((error) => {
          console.log("Error found", error);
        });
    } else {
      console.log(
        "Retype password or Password length is less than 8 characters"
      );
      setPassLength(true);
    }

    if (
      SignupUsername === "" ||
      SignupEmail === "" ||
      SignupPassword === "" ||
      SignupConfirmPassword === ""
    ) {
      setEmptyInput(true);
    } else {
      // Reset passLength if other conditions are not met
      setPassLength(false);
    }

    if (SignupPassword !== SignupConfirmPassword) {
      setPassLength(true);
    } else {
      // Reset passLength if passwords match
      setPassLength(false);
    }
    e.preventDefault();
  };


  useEffect(() => {
    if (duplicateEmail) {
      const timeoutId = setTimeout(() => {
        setDuplicateEmail(false);
      }, 4000);
      return () => clearTimeout(timeoutId);
    }

    if (emptyInput) {
      const timeoutId = setTimeout(() => {
        setEmptyInput(false);
        setPassLength(false);
      }, 4000);
      return () => clearTimeout(timeoutId);
    }

    if (passLength) {
      const timeoutId = setTimeout(() => {
        setPassLength(false);
      }, 4000);
      return () => clearTimeout(timeoutId);
    }

  }, [duplicateEmail, emptyInput, passLength, ]);

  console.log("route is ", route);
  return (
    <div className="signup">
      <div className="signup-wrapper">
        <div className="signup-row">
          <div className="left-row">
            <img src={graphics} alt="" className="graphics-img" />
          </div>
          <div className="right-row">
            <div className="inputs">
              <h1 className="right-row-h1">Sign up to Discover</h1>
              <div className="user-email">
                <div className="user-input common-div-input">
                  <h1 className="input-headers">Username</h1>
                  <input
                    type="text"
                    className="main-input"
                    placeholder=""
                    onChange={handleSignupUsername}
                  />
                </div>
                <div className="emial-input common-div-input">
                  <h1 className="input-headers">Email Address</h1>
                  <input
                    type="email"
                    className="main-input"
                    onChange={handleSignupEmail}
                  />
                  {duplicateEmail && (
                    <div>
                      <h1 className="email-duplicate">email Already Exist!</h1>
                    </div>
                  )}
                  {passLength ? (
                    <div>
                      <h1 className="pass-length">
                        password does not match to confirm password or password
                        length must be greater than 8
                      </h1>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "none",
                      }}
                    ></div>
                  )}

                  {emptyInput ? (
                    <div>
                      <h1 className="pass-length">pls fill all input</h1>
                    </div>
                  ) : (
                    <div
                      style={{
                        display: "none",
                      }}
                    ></div>
                  )}
                </div>
              </div>
              <div className="class-inp">
                <h1 className="input-headers ">Password</h1>
                <input
                  type="text"
                  className="main-input input-password"
                  onChange={handleSignupPassword}
                />
                <h1 className="input-headers">Confirm Password</h1>
                <input
                  type="password"
                  className="main-input input-password"
                  onChange={handleSignupConfirmPassword}
                />
              </div>
              {route ? (
                <Link to="/signin" style={{ width: "100%" }}>
                  <button className="button">
                    Sign up
                  </button>
                </Link>
              ) : (
                  <button className="button" onClick={submitSignup}>
                    Sign up
                  </button>
              )}
              <Link to="/signin">
                <h4>Sign In</h4>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
