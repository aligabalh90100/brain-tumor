import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import avata from "../../Assests/avatar.png";
import "./AboutPage.css";
const AboutPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [image, setImage] = useState(avata);

  const params = useParams();
  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users"));
    const loginUser = users.find((user) => user.email === params.username);
    setUser(loginUser);
  }, []);

  function handleSelectImage(e) {
    if (!e.target.files[0]) {
      return;
    }

    setImage(URL.createObjectURL(e.target.files[0]));
  }
  console.log(user);
  return (
    <div className="user-profile">
      <main className="profile">
        <div className="profile-left">
          <i className="fa-solid fa-user" style={{ color: "#2D9197" }}></i>
          <h4>{user.username}</h4>
        </div>
        <div className="profile-right">
          <div className="user-data">
            <div className="user-data-text">
              <div className="user-general">
                <h2>General Information</h2>
                <p>
                  <span>Name</span>: {user.fullName}
                </p>
                <p>
                  <span>Gender</span>: {user.gender}
                </p>
                <p>
                  <span>Country</span>: {user.country}
                </p>
              </div>
              <div className="user-personal">
                <h2>Personal Information</h2>
                <p>
                  <span>Email</span>: {user.email}
                </p>
                <p>
                  <span>Phone</span>: {user.phone}
                </p>
                <p>
                  <span>Date Of Birth</span>: {user.date}
                </p>
              </div>
            </div>
            <div className="user-data-image">
              <div className="image">
                <label htmlFor="photo">
                  <img src={image} />
                </label>

                <input
                  type="file"
                  name="photo"
                  id="photo"
                  style={{ display: "none" }}
                  onChange={handleSelectImage}
                />
              </div>
              <div className="upload">
                <label htmlFor="photo">
                  <i className="fa-solid fa-arrow-up-from-bracket"></i>
                </label>
                <p>upload mri</p>
              </div>
            </div>
          </div>
          <button
            onClick={() => {
              navigate("/home");
            }}
          >
            Sign Out
          </button>
        </div>
      </main>
    </div>
  );
};

export default AboutPage;
