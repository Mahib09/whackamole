import React, { useEffect, useState } from "react";
import emojiFlags from "emoji-flags";
import { useGame } from "../context/GameContext";

const PlayerInput = ({}) => {
  const { player, setPlayer } = useGame();
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [countryCode, setCountryCode] = useState("CA");

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        if (data.country) {
          setCountryCode(data.country);
        }
      } catch {
        // fallback stays
      } finally {
        setLoading(false);
      }
    };

    fetchCountry();
  }, [setCountryCode]);

  const getFlag = (code) => {
    const country = emojiFlags.countryCode(code);
    return country ? country.emoji : "✨";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const flag = getFlag(countryCode);

    sessionStorage.setItem(
      "player",
      JSON.stringify({
        name: name,
        flag,
        countryCode: countryCode,
      })
    );
    setPlayer({ name: name, flag, countryCode });
    console.log(name, flag);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center gap-4 p-4 h-screen justify-center bg-[#0000006b]"
    >
      <label htmlFor="playerName" className="text-lg font-semibold">
        Enter your name to start:
      </label>

      <input
        id="playerName"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border px-3 py-1 rounded-md w-64"
        placeholder="e.g. Mahib"
        required
        autoFocus
      />

      <div className="flex flex-col items-start gap-1 w-64">
        <label htmlFor="country" className="text-sm font-medium">
          Select your country:
        </label>
        <select
          id="country"
          value={countryCode}
          onChange={(e) => setCountryCode(e.target.value)}
          className="border px-3 py-1 rounded-md w-full"
          disabled={loading}
        >
          {emojiFlags.data.map((c) => (
            <option key={c.code} value={c.code} className="text-black">
              {c.emoji} {c.name}
            </option>
          ))}
        </select>
      </div>

      {name && (
        <p className="text-sm text-gray-200">
          Ready to play as{" "}
          <span className="font-semibold">
            {getFlag(countryCode)} {name}
          </span>
          ?
        </p>
      )}

      <button
        type="submit"
        disabled={!name}
        className={`px-4 py-2 rounded transition text-white ${
          !name
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-orange-400 hover:bg-orange-600"
        }`}
        onClick={handleSubmit}
      >
        Start Game
      </button>
    </form>
  );
};

export default PlayerInput;
