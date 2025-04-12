import React from "react";

const Home = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-32 h-screen">
      <div className="mt-24 flex flex-col">
        <h1 className="text-9xl">Whack a mole</h1>
        <h1 className="text-9xl">Whack a mole</h1>
        <h1 className="text-9xl">Whack a mole</h1>
      </div>
      <div className="flex flex-col w-[200px] justify-center items-center mb-24 gap-6">
        <a
          href="/game"
          className="border py-2 px-6 rounded-lg w-full text-center text-2xl"
        >
          Start Game
        </a>
        <a
          href="/levels"
          className="border py-2 px-6 rounded-lg w-full text-center text-2xl"
        >
          Level
        </a>
        <a
          href="/leaderboard"
          className="border py-2 px-6 rounded-lg w-full text-center text-2xl"
        >
          LeaderBoard
        </a>
      </div>
    </div>
  );
};

export default Home;
