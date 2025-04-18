// types.ts
export interface LeaderboardScore {
  name: string;
  score: number;
  level: string;
  countryCode: string;
  timestamp: firebase.firestore.Timestamp;
}

export interface Player {
  name: string;
  countryCode: string;
  flag: string;
}

export interface GameProvider {
  score: number;
  setScore: Dispatch<SetStateAction<number>>;
  activeIndex: number | null;
  setActiveIndex: Dispatch<SetStateAction<number | null>>;
  timeLeft: number;
  setTimeLeft: Dispatch<SetStateAction<number>>;
  gameActive: boolean;
  setGameActive: Dispatch<SetStateAction<boolean>>;
  gameOver: boolean;
  setGameOver: Dispatch<SetStateAction<boolean>>;
  level: string;
  setLevel: Dispatch<SetStateAction<string>>;
  player: Player | null;
  setPlayer: Dispatch<SetStateAction<Player | null>>;
  highScore: number;
  setHighScore: Dispatch<SetStateAction<number>>;
  bombIndex: number | null;
  setBombIndex: Dispatch<SetStateAction<number | null>>;
  incrementScore: () => void;
  decrementScore: () => void;
  resetGame: () => void;
}
