import { useEffect, useState } from "react";
import { getTopScores } from "../utils/getTopScores";
import { LeaderboardScore } from "../types/types";
import { ArrowBigLeft } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TableContent } from "@/components/TableContent";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardScore[]>([]);

  useEffect(() => {
    getTopScores().then((scores) => setLeaderboard(scores));
  }, []);

  return (
    <div className="mt-6 overflow-x-auto flex flex-col items-center justify-center">
      <div className="w-full max-w-[1000px] flex gap-5">
        <a
          href="/"
          className=" text-xl hover:text-sky-600 transition-colors ease-in-out delay-75 px-4"
        >
          <ArrowBigLeft size={32} />
        </a>
        <h2 className="text-2xl font-semibold mb-4 text-center mx-auto">
          🏆 Leaderboard
        </h2>
      </div>

      <Tabs defaultValue="Easy" className="max-w-[1000px] p-5 w-full m">
        <TabsList className="gap-4 bg-amber-300 text-white shadow-2xl m-auto">
          <TabsTrigger value="Easy" className="text-2xl px-4 text-white">
            Novice
          </TabsTrigger>
          <TabsTrigger value="Medium" className="text-2xl px-4 text-white">
            Pro
          </TabsTrigger>
          <TabsTrigger value="Hard" className="text-2xl px-4 text-white">
            Master
          </TabsTrigger>
        </TabsList>
        <TabsContent value="Easy">
          <TableContent
            value="Novice"
            data={leaderboard.filter((item) => item.level == "Easy")}
          />
        </TabsContent>
        <TabsContent value="Medium">
          <TableContent
            value="Pro"
            data={leaderboard.filter((item) => item.level == "Medium")}
          />
        </TabsContent>
        <TabsContent value="Hard">
          <TableContent
            value="Master"
            data={leaderboard.filter((item) => item.level == "Hard")}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Leaderboard;
