import React from "react";
import brain from "../../Assests/brain.png";
import doctors from "../../Assests/Doctors.png";
import mobile from "../../Assests/Thank you.png";
import "./OnBoarding.css";
import BoardingItem from "./BoardingItem";
import { useNavigate, useParams } from "react-router-dom";
const OnBoarding = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  function handleClick() {
    if (Number(id) === 3) {
      navigate("/home");
      return;
    }
    const nextBoard = (Number(id) + 1).toString();
    navigate(`/boarding/${nextBoard}`);
  }
  return (
    <>
      {id === "1" && (
        <BoardingItem
          image={brain}
          text=" What makes us superior in this aspect is the use of the latest
      specialized technology in the detection of brain tumors"
          title="Brain"
          handleClick={handleClick}
          btnText="Next"
        />
      )}
      {id === "2" && (
        <BoardingItem
          image={doctors}
          text="Where you can access the best rumor detection without any doubt of getting incorrect infromation"
          title="Feature Of Scanner"
          handleClick={handleClick}
          btnText="Next"
        />
      )}
      {id === "3" && (
        <BoardingItem
          image={mobile}
          text="Discover exactly what you're looking for here, and we're committed to helping you be at your best"
          title="Oncology Checker Application"
          handleClick={handleClick}
          btnText="Get start"
        />
      )}
    </>
  );
};

export default OnBoarding;
