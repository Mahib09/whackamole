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
          <h2 className="px-20 pt-10 text-4xl">
            Objective: Whack as many moles as you can in 30 sec. 1 Mole = 100pts
          </h2>
          <div className="flex gap-5 px-20 pt-5 justify-around">
            <button
              onClick={startGame}
              className="text-2xl rounded-lg px-4 bg-red-400 shadow-lg m-auto"
            >
              {gameActive ? "Restart" : "Start"}
            </button>
            <GameRecords title={"Score"} value={score} />
            <GameRecords title={"Level"} value={level} />
            <GameRecords title={"High-Score"} value={score} />
          </div>
          <h1 className="mx-auto mt-2 text-6xl">{timeLeft}</h1>

          <div className="h-[60vh] w-[62vh] flex flex-col  mx-20">
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
                        className="absolute inset-y-4 w-full h-[100%]  z-30 pointer-events-none "
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
