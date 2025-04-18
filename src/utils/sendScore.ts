// submitScore.ts
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../services/firebase";
import { LeaderboardScore } from "../types/types";

export const submitScore = async (
  name: string,
  countryCode: string,
  score: number,
  level: string
): Promise<void> => {
  try {
    // Construct the score data
    const scoreData: LeaderboardScore = {
      name: name,
      score: score,
      countryCode: countryCode,
      level: level,
      timestamp: serverTimestamp(), // This will automatically return a server Timestamp
    };

    // Add the score data to Firestore
    await addDoc(collection(db, "leaderboard"), scoreData);
    console.log("Score submitted successfully");
  } catch (error) {
    console.error("Error saving score:", error);
  }
};
