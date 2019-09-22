import React from "react";
import "./Square.css";

const Square = ({ marked, value, onClick }) => {
  const bg = marked ? "orange" : "transparent";
  return (
    <button
      style={{ backgroundColor: bg }}
      className="square"
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Square;
