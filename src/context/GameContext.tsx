import { createContext, useContext, useEffect, useState } from "react";

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [activeIndex, setActiveIndex] = useState();
  const [timeLeft, setTimeLeft] = useState(30);
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(() => {
    const savedLevel = localStorage.getItem("level");
    return savedLevel ? savedLevel : "Easy";
  });

  const incrementScore = () => setScore((prev) => prev + 1);
  const resetGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
    setGameOver(false);
  };
  useEffect(() => {
    localStorage.setItem("level", level);
  }, [level]);
  return (
    <GameContext.Provider
      value={{
        score,
        activeIndex,
        setActiveIndex,
        timeLeft,
        setTimeLeft,
        gameActive,
        setGameActive,
        gameOver,
        setGameOver,
        incrementScore,
        level,
        setLevel,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
