import React from "react";
import "../css/components/button.css";
const Button = ({ buttonText, klik, type }) => {
  return (
    <div
      className={
        type === "hitam" ? "button button__hitam" : "button button__putih"
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
