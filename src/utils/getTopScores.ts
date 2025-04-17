// getTopScores.ts
import { collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import { db } from "../services/firebaseConfig";
import { LeaderboardScore } from "../types/types";

export const getTopScores = async (): Promise<LeaderboardScore[]> => {
  const q = query(
    collection(db, "leaderboard"),
    orderBy("score", "desc"),
    limit(10)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((doc) => doc.data() as LeaderboardScore);
};
