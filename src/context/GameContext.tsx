import React, { createContext, useContext, useState, ReactNode } from "react";
import type { GameProvider as GameProviderType } from "@/types/types"; // Type-only import for GameProvider

interface Player {
  name: string;
  countryCode: string;
  flag: string;
}

const GameContext = createContext<GameProviderType | undefined>(undefined);

interface GameProviderProps {
  children: ReactNode;
}

export const useGame = () => useContext(GameContext);

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [score, setScore] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(30);
  const [gameActive, setGameActive] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [level, setLevel] = useState<string>(() => {
    const savedLevel = localStorage.getItem("level");
    return savedLevel ? savedLevel : "Easy";
  });
  const [player, setPlayer] = useState<Player | null>(() => {
    const savedPlayer = sessionStorage.getItem("player");
    return savedPlayer ? JSON.parse(savedPlayer) : null;
  });
  const [highScore, setHighScore] = useState<number>(() => {
    const savedHighscore = sessionStorage.getItem("highScore");
    return savedHighscore ? parseInt(savedHighscore) : 0;
  });
  const [bombIndex, setBombIndex] = useState<number | null>(null);

  const incrementScore = () => setScore((prev) => prev + 1);
  const decrementScore = () => setScore((prev) => prev - 5);
  const resetGame = () => {
    setScore(0);
    setTimeLeft(30);
    setGameActive(true);
    setGameOver(false);
  };

  return (
    <GameContext.Provider
      value={{
        score,
        setScore,
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
        player,
        setPlayer,
        highScore,
        setHighScore,
        bombIndex,
        setBombIndex,
        decrementScore,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
