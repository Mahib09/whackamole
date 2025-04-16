import React, { useState } from "react";
import { useGame } from "../context/GameContext";

const Levels = ({ closeModal }) => {
  const { level, setLevel } = useGame();
  const gameLevels = [
    {
      level: "Easy",
      bg: "#38AE38",
      border: "#077707",
      hover: "#44DD44FF",
      name: "Novice Mole Whacker",
    },
    {
      level: "Medium",
      bg: "#F08A16",
      border: "#BF6C0D",
      hover: "#ff8801",
      name: "Pro Mole Buster",
    },
    {
      level: "Hard",
      bg: "#F93636",
      border: "#A80808",
      hover: "#ff1515",
      name: "Whack-a-Mole Master",
    },
  ];

  const handleSelect = (lvl) => {
    setLevel(lvl);
    closeModal();
  };
  return (
    <div className="bg-[#0000006b] w-full h-screen gap-10 flex flex-col justify-center items-center absolute">
      <div className=" border-20 md:border-25 lg:border-30 rounded-3xl max-w-[80%] w-[900px] h-[50%] lg:h-[70%]  border-[#f8aa23] bg-[#f8aa23] flex flex-col">
        <div className="rounded-lg flex flex-col gap-10 justify-center h-full bg-background">
          <h2 className="text-4xl lg:text-5xl mx-auto text-shadow-lg">
            Select A Level
          </h2>
          <div className="flex flex-col gap-8 justify-center items-center">
            {gameLevels.map((item) => (
              <button
                key={item.level}
                onClick={() => handleSelect(item.level)}
                className={`border rounded-lg text-lg sm:text-xl md:text-3xl lg:text-4xl p-2 w-[70%] bg-[${
                  item.bg
                }] border-[${item.border}] hover:bg-[${
                  item.hover
                }] cursor-pointer ${
                  level === item.level
                    ? "outline-blue-600 outline-2 border-0"
                    : ""
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>
          <button
            onClick={closeModal}
            className="absolute top-6 right-8 text-3xl text-white hover:text-red-400"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Levels;
