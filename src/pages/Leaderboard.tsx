import React, { useEffect, useState } from "react";
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
    <div className="mt-6 overflow-x-auto flex flex-col justify-center items-center">
      <div className="flex gap-5">
        <a
          href="/"
          className="mr-auto text-xl hover:text-orange-600 transition-colors ease-in-out delay-75"
        >
          <ArrowBigLeft size={32} />
        </a>
        <h2 className="text-2xl font-semibold mb-4 text-center">
          🏆 Leaderboard
        </h2>
      </div>

      <Tabs defaultValue="Easy" className="max-w-[1000px] w-full">
        <TabsList className="gap-4 bg-amber-300">
          <TabsTrigger value="Easy" className="text-2xl px-4">
            Easy
          </TabsTrigger>
          <TabsTrigger value="Medium" className="text-2xl ">
            Medium
          </TabsTrigger>
          <TabsTrigger value="Hard" className="text-2xl ">
            Hard
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
