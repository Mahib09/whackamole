export const TableContent = ({ value, data }: TableContentProps) => {
  const entries = data;

  return (
    <div className="overflow-x-auto rounded-md border p-4 bg-[#fda760]">
      <h2 className="text-xl font-semibold mb-4">{value} Leaderboard</h2>
      <table className="w-full text-left ">
        <thead>
          <tr className="border-b">
            <th className="py-2">Rank</th>
            <th className="py-2">Country</th>
            <th className="py-2">Name</th>
            <th className="py-2">Score</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={entry.name} className="border-b ">
              <td className="py-2">{index + 1}</td>
              <td className="py-2">{entry.countryCode}</td>
              <td className="py-2">{entry.name}</td>
              <td className="py-2">{entry.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
