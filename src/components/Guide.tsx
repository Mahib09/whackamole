import React from "react";

interface GuideProps {
  setShowGuide: React.Dispatch<React.SetStateAction<boolean>>;
}

const Guide = ({ setShowGuide }: GuideProps) => {
  return (
    <div className="fixed inset-0 bg-[#0000007c] flex items-center justify-center z-50 overflow-hidden">
      {/* Modal */}
      <div className="bg-orange-300 p-6 rounded-lg shadow-lg w-90 border-12 border-orange-800 text-center relative z-10">
        <h2 className="text-2xl  mb-2">Game Guide</h2>
        <ul className="text-left text-lg space-y-2">
          <li>🎯 Tap the mole to score.</li>
          <li>💣 Avoid bombs or lose 5 points.</li>
          <li>💥 Game ends if score drops below 0.</li>
          <li>⏳ 30 seconds per round.</li>
        </ul>
        <button
          className="mt-4 px-4 py-2 bg-lime-500 shadow-2xl rounded hover:bg-lime-600 transition"
          onClick={() => setShowGuide(false)}
        >
          Got it!
        </button>
      </div>
    </div>
  );
};

export default Guide;
