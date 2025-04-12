import React from "react";

const Mole = ({ isActive, onClick }) => {
  return (
    <div
      className={`relative h-full w-full flex items-end justify-center transition-transform duration-300 ${
        isActive ? "translate-y-0" : "translate-y-full"
      }`}
      onClick={isActive ? onClick : null}
    >
      <div
        className={`w-16 h-16 bg-black rounded-full shadow-lg ${
          isActive ? "cursor-pointer" : ""
        }`}
      />
    </div>
  );
};

export default Mole;
