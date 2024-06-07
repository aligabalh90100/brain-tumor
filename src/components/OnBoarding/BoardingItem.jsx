import React from "react";

const BoardingItem = ({ text, image, title, handleClick, btnText }) => {
  return (
    <div className="boarding-container">
      <div className="image-container">
        <img src={image} alt="brain" />
      </div>
      <h3>{title}</h3>
      <p>{text}</p>
      <button onClick={handleClick}>{btnText}</button>
    </div>
  );
};

export default BoardingItem;
