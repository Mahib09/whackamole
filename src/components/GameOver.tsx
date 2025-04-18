interface GameOverProps {
  score: number;
  onRestart: () => void;
}

const GameOver = ({ score, onRestart }: GameOverProps) => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col gap-2 items-center justify-center bg-[#0000007c]">
      <h1 className="text-6xl font-bold text-white ">Game Over</h1>

      <h2 className="text-3xl text-white leading">Your Score: {score}</h2>
      <div className="flex gap-2">
        <button
          onClick={onRestart}
          className="px-6 py-2 text-2xl bg-red-400 hover:bg-red-500 rounded-lg drop-shadow-lg"
        >
          Play Again
        </button>
        <a
          href="/"
          className="text-2xl bg-green-400 hover:bg-green-500 px-6 py-2 rounded-lg drop-shadow-lg"
        >
          Backhome
        </a>
      </div>
    </div>
  );
};

export default GameOver;
