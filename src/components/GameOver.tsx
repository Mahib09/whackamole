const GameOver = ({ score, onRestart }) => {
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-full bg-opacity-80 bg-gameBackground">
      <h1 className="text-4xl font-bold text-white">Game Over</h1>
      <h2 className="text-2xl text-white ">Your Score: {score}</h2>
      <button
        onClick={onRestart}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
      >
        Play Again
      </button>
      <a
        href="/"
        className="hover:bg-amber-400 transition-colors ease-in-out delay-200 p-2 rounded-lg bg-green-500"
      >
        Backhome
      </a>
    </div>
  );
};

export default GameOver;
