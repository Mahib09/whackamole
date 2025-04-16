import React, { useState } from "react";
import Levels from "./Levels";

const Home = () => {
  const [showLevels, setShowLevels] = useState(false);
  return (
    <div className="flex flex-col justify-center items-center gap-20 h-screen">
      <div className="relative mt-24 flex flex-col">
        <h1 className="text-9xl/20 text-[#DA8B00]">Whack a mole</h1>
        <h1 className="text-9xl/30 text-[#F1AE38]">Whack a mole</h1>
        <h1 className="text-9xl/20 text-[#EFBC63]">Whack a mole</h1>
        <img
          src="../assets/react.svg"
          className="m-auto absolute bottom-0 right-1/2"
        />
      </div>
      <div className="flex flex-col w-[200px] justify-center items-center mb-24 gap-6">
        <a
          href="/game"
          className=" py-2 px-6 rounded-lg w-full text-center text-3xl bg-[#FF6560] hover:bg-[#ff4a44]"
        >
          Start Game
        </a>
        <button
          onClick={() => setShowLevels(true)}
          className=" py-2 px-6 rounded-lg w-full text-center text-2xl bg-[#4DB2C9] hover:bg-[#47ddff]"
        >
          Level
        </button>
        <a
          href="/leaderboard"
          className=" py-2 px-6 rounded-lg w-full text-center text-2xl bg-[#6097FF] hover:bg-[#3d79eb]"
        >
          LeaderBoard
        </a>
      </div>

      {showLevels && <Levels closeModal={() => setShowLevels(false)} />}
    </div>
  );
};

export default Home;
