import { useEffect } from "react";
import Mole from "../components/Mole";
import GameOver from "../components/GameOver";
import { useGame } from "../context/GameContext";

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
    <div className="">
      {gameOver ? (
        <GameOver score={score} onRestart={startGame} />
      ) : (
        <div className="flex items-center justify-center  px-2">
          <div className="bg-gameBackground flex flex-col max-w-[1000px] w-full h-[100vh]">
            <div className="flex gap-5 px-10">
              <h1 className="text-3xl font-bold text-center ">
                Score: {score}
              </h1>
              <h1 className="text-3xl font-bold text-center  m-auto">
                Grade: {level}
              </h1>
              <h1 className="text-3xl font-bold text-center">
                Hi-Score: {score}
              </h1>
            </div>
            <h1 className="m-auto text-5xl">{timeLeft}</h1>

            <div className="border h-[60vh] flex flex-col gap-2 p-2 mx-20">
              {[0, 1, 2].map((row) => (
                <div
                  key={row}
                  className="h-[20vh] border flex gap-2 justify-center items-center"
                >
                  {[0, 1, 2].map((col) => {
                    const index = row * 3 + col;
                    return (
                      <div
                        key={index}
                        className="border h-full w-1/3 overflow-hidden"
                      >
                        <Mole
                          isActive={gameActive && index === activeIndex}
                          onClick={handleClick}
                        />
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
            <button
              onClick={startGame}
              className="text-2xl rounded-lg px-4 bg-red-400 shadow-lg m-auto"
            >
              Restart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
