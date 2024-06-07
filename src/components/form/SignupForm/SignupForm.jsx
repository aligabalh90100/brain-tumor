import React, { useState } from "react";
import { ToastContainer } from "react-toastify";

import notify from "../../util/useNotify";
const check = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const SignupForm = ({ showSignIn, showSignUp }) => {
  const [errors, setErrors] = useState({});
  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    // userName validation
    if (data.username.length < 3) {
      setErrors((prevState) => {
        const updatedState = {
          erroruser: "Username can not be less than 3 characters",
        };
        return updatedState;
      });
      return;
    } else {
      for (let char of data.username) {
        if (!check.includes(char)) {
          setErrors({
            erroruser: `Username can not contain ${char}'`,
          });
          return;
        }
      }
    }
    // password Validation
    if (data.password.length < 6) {
      setErrors({ password: "Password can not be less than 6 characters" });
      return;
    }
    // email validation
    if (
      !data.email.includes("@") ||
      !data.email.includes(".") ||
      data.email === ""
    ) {
      setErrors({ errorEmail: "Please prvide valid email address" });
      return;
    }

    if (data.email && data.username && data.password) {
      const currentUsers = JSON.parse(localStorage.getItem("users"));
      // check if user already exist
      for (let user of currentUsers) {
        if (user.email === data.email) {
          setErrors({ errorEmail: "This account already exist" });
          return;
        } else if (user.username === data.username) {
          setErrors({
            erroruser: `This Username already exist`,
          });
          return;
        }
      }
      localStorage.removeItem("users");
      const newUser = {
        email: data.email,
        password: data.password,
        username: data.username,
      };
      currentUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(currentUsers));
    }
    event.target.reset();
    setErrors({});
    notify("Account created successfully", "success");
  }
  return (
    <>
      <div className="sign-up">
        <form onSubmit={handleSubmit} action="">
          <h1>Sign up</h1>
          <div className="input-field" style={{ position: "relative" }}>
            <i className="fas fa-user"></i>
            <input
              type="text"
              placeholder="Username"
              name="username"
              required
            />
            {errors.erroruser && (
              <span
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  left: "60px",
                  fontSize: "13px",
                  color: "red",
                }}
              >
                {errors.erroruser}
              </span>
            )}
          </div>
          <div className="input-field" style={{ position: "relative" }}>
            <i className="fas fa-envelope"></i>
            <input type="email" placeholder="Email" name="email" />
            {errors.errorEmail && (
              <span
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  left: "60px",
                  fontSize: "13px",
                  color: "red",
                }}
              >
                {errors.errorEmail}
              </span>
            )}
          </div>
          <div className="input-field" style={{ position: "relative" }}>
            <i className="fas fa-lock"></i>
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
            />
            {errors.password && (
              <span
                style={{
                  position: "absolute",
                  bottom: "-20px",
                  left: "60px",
                  fontSize: "13px",
                  color: "red",
                }}
              >
                {errors.password}
              </span>
            )}
          </div>
          <div style={{ position: "relative", width: "80%" }}>
            <button>Sign Up</button>
            <p className="show-text">
              Already have an account?
              <span
                onClick={() => {
                  showSignUp(false);
                  showSignIn(true);
                }}
              >
                Sign in
              </span>
            </p>
          </div>
          <p className="sign-text">or use your email for registration</p>
          <div className="social-container">
            <a href="">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="">
              <i className="fab fa-google-plus-g"></i>
            </a>
            <a href="">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </form>
      </div>
      <ToastContainer theme="light" position="top-center" />
    </>
  );
};

export default SignupForm;
