import { useEffect } from "react";
import Mole from "../components/Mole";
import GameOver from "../components/GameOver";
import { useGame } from "../context/GameContext";
import GameRecords from "../components/GameRecords";
import front from "../assets/front.png";
import back from "../assets/back.png";

const Game = () => {
  const {
    score,
    activeIndex,
    setActiveIndex,
    timeLeft,
    setTimeLeft,
    gameActive,
    setGameActive,
    gameOver,
    setGameOver,
    level,
    incrementScore,
    resetGame,
  } = useGame();
  const percentage = (timeLeft / 30) * 100;

  // Timer Effect
  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setGameActive(false);
          setActiveIndex(null);
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Clear the interval properly
  }, [gameActive]);

  // Mole Pop-Up Effect
  useEffect(() => {
    if (!gameActive) return;
    let diff = level === "Easy" ? 800 : level == "Medium" ? 600 : 400;
    const moleInterval = setInterval(() => {
      const random = Math.floor(Math.random() * 9);
      setActiveIndex(random);
    }, diff);

    return () => clearInterval(moleInterval);
  }, [gameActive]);

  // Handle Clicking Mole
  const handleClick = () => {
    if (!gameActive) return;
    incrementScore();
    setActiveIndex(null);
  };

  // Start a New Game
  const startGame = () => {
    resetGame();
  };

  return (
    <div className="relative">
      <div className="flex items-center justify-center  px-2">
        <div className="bg-gameBackground flex flex-col items-center max-w-[1000px] w-full h-[100vh]">
          <h2 className="md:px-20 pt-10 text-xl md:text-4xl">
            Objective: Whack as many moles as you can in 30 sec. 1 Mole = 100pts
          </h2>
          <div className="flex gap-2 md:gap-5 md:px-20 pt-5 flex-wrap items-center justify-center">
            <button
              onClick={startGame}
              className="text-2xl rounded-lg px-2 p-1 md:px-4 bg-red-400 shadow-lg"
            >
              {gameActive ? "Restart" : "Start"}
            </button>
            <GameRecords title={"Score"} value={score} />
            <GameRecords title={"Level"} value={level} />
            <GameRecords title={"High-Score"} value={score} />
          </div>
          <h1 className="mx-auto mt-5 text-6xl">{timeLeft}</h1>
          <div className="w-[98%] h-4 bg-gray-200 rounded-full overflow-hidden mt-4 mx-auto max-w-xl ">
            <div
              className="h-full bg-green-500 transition-all duration-1000 ease-linear"
              style={{ width: `${percentage}%` }}
            ></div>
          </div>

          <div className="max-h-[60vh] h-full max-w-[62vh] w-full flex flex-col  mx-20">
            {[0, 1, 2].map((row) => (
              <div key={row} className="h-1/3 flex justify-center items-center">
                {[0, 1, 2].map((col) => {
                  const index = row * 3 + col;
                  return (
                    <div
                      key={index}
                      className="relative h-full w-1/3 overflow-hidden items-end justify-center"
                    >
                      {/* Back image */}
                      <img
                        src={back} // path to back.png
                        alt="Hole Back"
                        className="absolute inset-y-4 w-full h-full  z-10 "
                      />

                      {/* Mole Image: Positioned behind the hole */}
                      <Mole
                        isActive={gameActive && index === activeIndex}
                        onClick={handleClick}
                      />

                      {/* Front rim image */}
                      <img
                        src={front} // path to front.png
                        alt="Hole Rim"
                        className="absolute inset-y-4 w-full h-[100%]  z-30  pointer-events-none"
                      />
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
      {gameOver && <GameOver score={score} onRestart={startGame} />}
    </div>
  );
};

export default Game;
