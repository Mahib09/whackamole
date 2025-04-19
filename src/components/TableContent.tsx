interface TableContentProps {
  data: Data[];
  value: string;
}
interface Data {
  countryCode: string;
  name: string;
  score: number;
}

export const TableContent = ({ data }: TableContentProps) => {
  const entries = data;

  return (
    <div className="overflow-x-auto rounded-md border p-5 m-5 bg-[#fda760]">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b  text-lg ">
            <th className="py-2 w-16 ">Rank</th>
            <th className="py-2 w-20">Country</th>
            <th className="py-2 ">Name</th>
            <th className="py-2 w-20 md:w-24">Score</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry: Data, index: number) => (
            <tr key={entry.name} className="border-b text-lg">
              <td className="">
                <div className="bg-blue-600 w-8 h-8 rounded-full text-white flex items-center justify-center">
                  {index + 1}
                </div>
              </td>
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
