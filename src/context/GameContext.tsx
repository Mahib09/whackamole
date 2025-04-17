import { createContext, useContext, useEffect, useState } from "react";
import { submitScore } from "../utils/sendScore";

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
  const [player, setPlayer] = useState(() => {
    const savedPlayer = sessionStorage.getItem("player");
    return savedPlayer ? JSON.parse(savedPlayer) : null;
  });
  const [highScore, setHighScore] = useState(() => {
    const savedHighscore = sessionStorage.getItem("highScore");
    return savedHighscore ? parseInt(savedHighscore) : 0;
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
        player,
        setPlayer,
        highScore,
        setHighScore,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
