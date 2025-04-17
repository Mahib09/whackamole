import { useEffect } from "react";
import Mole from "../components/Mole";
import GameOver from "../components/GameOver";
import { useGame } from "../context/GameContext";
import GameRecords from "../components/GameRecords";
import front from "../assets/front.png";
import back from "../assets/back.png";
import PlayerInput from "../components/PlayerInput";
import { submitScore } from "../utils/sendScore";
import { ArrowBigLeft, RotateCw } from "lucide-react";

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
    setPlayer,
    highScore,
    setHighScore,
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
      {!player ? (
        <PlayerInput />
      ) : (
        <div className="flex items-center justify-center  px-2">
          <div className="bg-gameBackground flex flex-col items-center max-w-[1000px] w-full h-[100vh]">
            <div className="flex gap-2 md:gap-5 md:px-20 pt-5 flex-wrap items-center justify-center">
              <a
                href="/"
                className="bg-background text-xl py-2 px-4 rounded-lg border-amber-600 border hover:bg-amber-600 transition-colors ease-in-out delay-75"
              >
                <ArrowBigLeft />
              </a>
              <GameRecords title={"Score"} value={score} />
              <GameRecords title={"Level"} value={level} />
              <GameRecords title={"High-Score"} value={highScore} />
            </div>
            <h1 className="mx-auto mt-5 text-2xl md:text-3xl lg:text-4xl">
              {timeLeft}
            </h1>
            <div className="w-[98%] h-4 bg-gray-200 rounded-full overflow-hidden mt-4 mx-auto max-w-xl ">
              <div
                className="h-full bg-green-500 transition-all duration-1000 ease-linear"
                style={{ width: `${percentage}%` }}
              ></div>
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

            <button
              onClick={startGame}
              className="text-2xl rounded-lg px-2 p-1 md:px-4 bg-red-400 hover:bg-red-600 transition-colors delay-75 ease-in-out shadow-lg mt-8"
            >
              {gameActive ? <RotateCw /> : "Start"}
            </button>
          </div>
        </div>
      )}

      {gameOver && <GameOver score={score} onRestart={startGame} />}
    </div>
  );
};

export default Game;
