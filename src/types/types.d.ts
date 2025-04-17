// types.ts
export interface LeaderboardScore {
  name: string;
  score: number;
  level: string;
  countryCode: string;
  timestamp: firebase.firestore.Timestamp;
}
