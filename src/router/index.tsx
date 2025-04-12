import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Game from "../pages/Game";
import Levels from "../pages/Levels";
import Leaderboard from "../pages/Leaderboard";

const index = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/game" element={<Game />} />
      <Route path="/levels" element={<Levels />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
    </Routes>
  );
};

export default index;
