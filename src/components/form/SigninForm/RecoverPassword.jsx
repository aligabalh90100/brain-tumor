import React, { useState } from "react";
import notify from "../../util/useNotify";

const RecoverPassword = ({ setLogin }) => {
  const [errors, setErrors] = useState({});
  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    // email validation
    if (
      !data.email.includes("@") ||
      !data.email.includes(".") ||
      data.email === ""
    ) {
      setErrors({ email: "Please prvide valid email address" });
      return;
    }
    // check that password match
    if (
      data.password === "" ||
      data.confirmPassword === "" ||
      data.password !== data.confirmPassword
    ) {
      setErrors({ confirmPassword: "Password dose not match" });
      return;
    }
    // update user
    const currentUsers = JSON.parse(localStorage.getItem("users"));
    if (currentUsers.length === 0) {
      setErrors({ email: "This Email dose not exist" });
      return;
    } else {
      const user = currentUsers.find((user) => user.email === data.email);
      const newUser = { ...user, email: data.email, password: data.password };
      const newUsersData = currentUsers.filter(
        (account) => account.email !== data.email
      );
      newUsersData.push(newUser);
      localStorage.removeItem("users");
      localStorage.setItem("users", JSON.stringify(newUsersData));
    }
    event.target.reset();
    setErrors({});
    notify("Password changed successfully", "success");
  }
  return (
    <div className="sign-in">
      <form onSubmit={handleSubmit}>
        <h1 className="change-password">Change your password</h1>
        <div className="input-field" style={{ position: "relative" }}>
          <i className="fas fa-user"></i>
          <input type="email" name="email" placeholder="Email" />
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
        <div className="input-field" style={{ position: "relative" }}>
          <i className="fas fa-lock"></i>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
          />
          {errors.confirmPassword && (
            <span
              style={{
                position: "absolute",
                bottom: "-20px",
                left: "60px",
                fontSize: "13px",
                color: "red",
              }}
            >
              {errors.confirmPassword}
            </span>
          )}
        </div>
        <button>Submit</button>
        <a onClick={() => setLogin("login")}>Back to sign in page?</a>
      </form>
    </div>
  );
};

export default RecoverPassword;
