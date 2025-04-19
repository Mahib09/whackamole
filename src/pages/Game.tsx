import { useEffect, useState } from "react";
import Mole from "../components/Mole";
import GameOver from "../components/GameOver";
import { useGame } from "../context/GameContext";
import GameRecords from "../components/GameRecords";
import front from "../assets/front.png";
import back from "../assets/back.png";
import PlayerInput from "../components/PlayerInput";
import { submitScore } from "../utils/sendScore";
import { ArrowLeft, RotateCw } from "lucide-react";
import Bomb from "@/components/Bomb";
import explosion from "../assets/explosion.png";
import hit from "../assets/hit.png";
import Guide from "@/components/Guide";
import type { GameProvider } from "@/types/types";

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
    player,
    decrementScore,
    highScore,
    bombIndex,
    setBombIndex,
  } = useGame() as GameProvider;
  const [exploded, setExploded] = useState<boolean>(false);
  const [hitIndex, setHitIndex] = useState<number | null>(null);
  const [moleHit, setMoleHit] = useState<boolean>(false);
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const percentage: number = (timeLeft / 30) * 100;

  // Timer Effect
  useEffect(() => {
    if (!gameActive) return;

    const interval = setInterval(() => {
      setTimeLeft((prev: number) => {
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

  // Submit Score when Game Ends
  useEffect(() => {
    if (
      gameOver &&
      player?.name &&
      player?.countryCode &&
      typeof score === "number" &&
      score > 0
    ) {
      sessionStorage.setItem(
        "highScore",
        JSON.stringify(Math.max(highScore, score))
      );
      submitScore(player.name, player.countryCode, score, level);
    }
  }, [gameOver]);

  // Mole Pop-Up Effect
  useEffect(() => {
    if (!gameActive) return;
    const diff = level === "Easy" ? 800 : level == "Medium" ? 700 : 500;
    const moleInterval = setInterval(() => {
      const random = Math.floor(Math.random() * 9);
      const isBomb = Math.random() < 0.2;
      if (isBomb) {
        setBombIndex(random); // Set bomb at random index
        setActiveIndex(null); // No mole showing
        setTimeout(() => {
          setBombIndex(null);
        }, diff + 300);
      } else {
        setBombIndex(null); // No bomb
        setActiveIndex(random); // Set mole at random index
      }
    }, diff);

    return () => clearInterval(moleInterval);
  }, [gameActive]);

  // Handle Clicking Mole
  const handleClick = () => {
    if (!gameActive) return;
    setMoleHit(true);
    setHitIndex(activeIndex);
    incrementScore();

    setTimeout(() => {
      setMoleHit(false); // Reset after explosion
    }, 500);
    setActiveIndex(null);
  };
  const handleBombClick = (index: number) => {
    if (!gameActive || bombIndex !== index) return;

    setExploded(true);
    setHitIndex(index);

    // Check if score is less than 5
    if (score < 5) {
      setTimeLeft(0);
      setGameActive(false);
      setGameOver(true);
    } else {
      // Otherwise, deduct 5 points
      decrementScore(); // Assuming decrementScore accepts a number to subtract from the score
    }
    setTimeout(() => {
      setExploded(false); // Reset after explosion
    }, 500);

    setBombIndex(null); // Remove bomb from the grid after it’s clicked
  };
  // Start a New Game
  const startGame = () => {
    resetGame();
  };

  return (
    <div className="relative">
      {!player ? (
        <PlayerInput />
      ) : (
        <div className="flex items-center justify-center  px-2">
          <div className="bg-gameBackground flex flex-col items-center max-w-[1000px] w-full h-[100vh]">
            <div className="flex items-center w-full  p-2">
              <a
                href="/"
                className="hover:text-sky-400 text-lg p-1 transition-colors ease-in-out delay-75"
              >
                <ArrowLeft size={32} />
              </a>
              <button
                onClick={() => setShowGuide(true)}
                className="ml-auto mr-6 text-xl font-bold bg-sky-500 shadow-lg border border-gray-300 rounded-full w-10 h-10 flex items-center justify-center hover:bg-sky-400 transition-all shadow-sm"
              >
                ?
              </button>
            </div>
            <div className="flex gap-2  md:gap-10 md:px-20  flex-wrap items-center justify-center">
              <GameRecords title={"Score"} value={score} />
              <GameRecords title={"Level"} value={level} />
              <GameRecords title={"Hi-Score"} value={highScore} />
            </div>
            <div className="w-full flex justify-center items-center gap-3">
              <h1 className=" mt-5 text-2xl md:text-3xl lg:text-4xl">
                {timeLeft}
              </h1>
              <div className="w-[98%] h-4 bg-gray-200 rounded-full overflow-hidden mt-4  max-w-xl ">
                <div
                  className="h-full bg-green-500 transition-all duration-1000 ease-linear"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
            </div>

            <div className="max-h-[60vh] h-full max-w-[62vh] w-full flex flex-col  mx-20">
              {[0, 1, 2].map((row) => (
                <div
                  key={row}
                  className="h-1/3 flex justify-center items-center"
                >
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
                          className="absolute inset-y-4 w-full h-full  z-10 pointer-events-none"
                        />
                        {hitIndex === index && exploded && (
                          <img
                            src={explosion}
                            alt="explsion"
                            className="absolute inset-y-4 w-full h-full  z-20 "
                          />
                        )}
                        {moleHit && index === hitIndex && (
                          <img
                            src={hit}
                            className="absolute inset-y-4 w-full h-full  z-20 "
                          />
                        )}

                        {/* Mole Image: Positioned behind the hole */}
                        <Mole
                          isActive={gameActive && index === activeIndex}
                          onClick={handleClick}
                        />
                        <Bomb
                          isActive={gameActive && bombIndex === index}
                          onClick={() => handleBombClick(index)}
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

            <button
              onClick={startGame}
              className="text-2xl rounded-lg px-2 p-1 md:px-4 bg-red-400 hover:bg-red-500  shadow-xl transition-colors delay-75 ease-in-out  mt-20"
            >
              {gameActive ? <RotateCw /> : "Start"}
            </button>
          </div>
        </div>
      )}

      {showGuide && <Guide setShowGuide={setShowGuide} />}
      {gameOver && <GameOver score={score} onRestart={startGame} />}
    </div>
  );
};

export default Game;
