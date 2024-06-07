import React, { useEffect, useState } from "react";
import "./PersonalInformation.css";
import { useNavigate, useParams } from "react-router-dom";
const PersonalInformation = () => {
  const [curUser, setCurUser] = useState({});
  const [error, setError] = useState({});
  const { username } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const allUsers = JSON.parse(localStorage.getItem("users"));
    const currentUser = allUsers.find((user) => user.email === username);

    setCurUser(currentUser);
  }, [username]);

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());
    // check gender
    if (data.gender === "0") {
      setError({ error: "Please pick gender" });
      return;
    }
    const allUsers = JSON.parse(localStorage.getItem("users"));
    const newData = allUsers.filter((user) => user.email !== username);
    newData.push({
      ...curUser,
      email: username,
      fullName: data.fullName,
      gender: data.gender,
      date: data.birth,
      phone: data.phone,
      country: data.country,
    });
    localStorage.removeItem("users");
    localStorage.setItem("users", JSON.stringify(newData));
    console.log(newData);
    event.target.reset();
    setError({});
    navigate(`/userprofile/${curUser.email}`);
  }
  return (
    <div className="personal-information">
      <form onSubmit={handleSubmit} action="">
        <h2>Pesonal Information</h2>
        <input type="text" placeholder="Username" required name="username" />
        <input type="text" placeholder="Full Name" required name="fullName" />
        <div style={{ position: "relative" }}>
          <select name="gender" required>
            <option value="0">Pick gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {error.error && (
            <span
              style={{
                position: "absolute",
                color: "red",
                fontSize: "14px",
                top: "-20px",
                left: "0",
              }}
            >
              {error.error}
            </span>
          )}
        </div>
        <input type="text" placeholder="Country" required name="country" />
        <input type="tel" name="phone" placeholder="Phone number" required />
        <input type="date" name="birth" placeholder="Date Of Birth" required />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default PersonalInformation;
