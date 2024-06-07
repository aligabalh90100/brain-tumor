import React, { useState } from "react";
import RecoverPassword from "./RecoverPassword";
import { useNavigate } from "react-router-dom";
const SigninForm = ({ showSignIn, showSignUp }) => {
  const navigate = useNavigate();
  const [login, setLogin] = useState("login");
  const [errors, setErrors] = useState({});
  function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    const currentUser = JSON.parse(localStorage.getItem("users"));
    const curUser = currentUser.find((user) => user.email === data.email);
    if (currentUser.length > 0) {
      if (!curUser) {
        setErrors({ email: "This Email dose not exist" });
        return;
      }
    }
    if (currentUser.length === 0) {
      setErrors({ email: "This Email dose not exist" });
      return;
    } else {
      const user = currentUser.find((user) => user.email === data.email);
      if (data.password !== user.password) {
        setErrors({ password: "Wrong password please try again" });
        return;
      }
    }

    event.target.reset();

    setErrors({});
    if (
      curUser.country &&
      curUser.date &&
      curUser.email &&
      curUser.gender &&
      curUser.password &&
      curUser.phone &&
      curUser.username &&
      curUser.fullName
    ) {
      navigate(`/userprofile/${curUser.email}`);
    } else {
      navigate(`/personal-inforamtion/${data.email}`);
    }
  }
  if (login === "forgetPassword") {
    return <RecoverPassword setLogin={setLogin} />;
  }
  return (
    <div className="sign-in">
      <form onSubmit={handleSubmit} action="">
        <h1>Sign in</h1>
        <div className="input-field" style={{ position: "relative" }}>
          <i className="fas fa-user"></i>
          <input type="email" name="email" placeholder="Email" required />
          {errors.email && (
            <span
              style={{
                position: "absolute",
                bottom: "-20px",
                left: "60px",
                fontSize: "13px",
                color: "red",
              }}
            >
              {errors.email}
            </span>
          )}
        </div>
        <div className="input-field" style={{ position: "relative" }}>
          <i className="fas fa-lock"></i>
          <input
            type="password"
            name="password"
            placeholder="Password"
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
        <a
          onClick={() => {
            setLogin("forgetPassword");
            setErrors({});
          }}
        >
          Forget your Password?
        </a>
        <div
          style={{ position: "relative", width: "80%", textAlign: "center" }}
        >
          <button>Sign In</button>
          <p className="show-text">
            Don't have an account?
            <span
              onClick={() => {
                showSignIn(false);
                showSignUp(true);
              }}
            >
              Sign up
            </span>
          </p>
        </div>
        <p className="sign-text">or sign in with social platform</p>
        <div className="social-container">
          <a href="#">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="#">
            <i className="fab fa-google-plus-g"></i>
          </a>
          <a href="#">
            <i className="fab fa-linkedin-in"></i>
          </a>
          <a href="#">
            <i className="fab fa-twitter"></i>
          </a>
        </div>
      </form>
    </div>
  );
};

export default SigninForm;
