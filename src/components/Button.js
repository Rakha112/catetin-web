import React from "react";
import "../css/components/button.css";
const Button = ({ buttonText }) => {
  return (
    <div
      className={
        buttonText === "Log In"
          ? "button button--putih"
          : "button button--hitam"
      }
    >
      <button>{buttonText}</button>
    </div>
  );
};

export default Button;
