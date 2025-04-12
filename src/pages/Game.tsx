import { useEffect, useState } from "react";
import Mole from "../components/Mole";
import GameOver from "../components/GameOver";

const Game = () => {
  const [score, setScore] = useState(0);
  const [activeIndex, setActiveIndex] = useState();
  const [time, setTime] = useState(10);
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState("Easy");

  // Timer Effect
  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      setTime((prev) => {
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
    let diff = level === "Easy" ? 800 : 400;
    const moleInterval = setInterval(() => {
      const random = Math.floor(Math.random() * 9);
      setActiveIndex(random);
    }, diff);

    return () => clearInterval(moleInterval);
  }, [gameActive]);

  // Handle Clicking Mole
  const handleClick = () => {
    if (!gameActive) return;
    setScore((prev) => prev + 1);
    setActiveIndex(null);
  };

  // Start a New Game
  const startGame = () => {
    setScore(0);
    setTime(10);
    setGameActive(true);
    setGameOver(false);
  };

  return (
    <div className="">
      {gameOver ? (
        <GameOver score={score} onRestart={startGame} />
      ) : (
        <div className="flex items-center justify-center">
          <div className="bg-gameBackground max-w-[1000px] w-full h-[100vh]">
            <button className="border" onClick={startGame}>
              Start
            </button>
            <h1>{time}</h1>
            <h1 className="text-3xl font-bold text-center pt-8">
              Score: {score}
            </h1>
            <div className="border h-[60vh] flex flex-col gap-2 p-2 m-20">
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Game;
