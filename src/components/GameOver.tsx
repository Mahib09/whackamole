const GameOver = ({ score, onRestart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-opacity-80 bg-gameBackground">
      <h1 className="text-4xl font-bold text-white mb-4">Game Over</h1>
      <h2 className="text-2xl text-white mb-6">Your Score: {score}</h2>
      <button
        onClick={onRestart}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
      >
        Play Again
      </button>
    </div>
  );
};

export default GameOver;
