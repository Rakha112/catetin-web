import React from "react";
import "../css/components/button.css";
const Button = ({ buttonText, klik }) => {
  return (
    <div
      className={
        buttonText === "Log In"
          ? "button button__login"
          : "button button__signup"
      }
    >
      <button
        onClick={() => {
          klik();
        }}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default Button;
