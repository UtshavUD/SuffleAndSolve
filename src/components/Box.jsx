import React from "react";

const Box = ({ content, clickable, onClick, className }) => {
  return (
    <div
      className={`w-16 h-16 flex justify-center items-center bg-white shadow-md rounded-md text-xl cursor-pointer ${
        clickable ? "hover:shadow-lg hover:scale-105" : ""
      } transition-all duration-300 ${className}`}
      onClick={clickable ? onClick : undefined}
    >
      {content}
    </div>
  );
};

export default Box;
