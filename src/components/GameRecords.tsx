interface GameRecordsProps {
  title: string;
  value: string | number;
}

const GameRecords = ({ title, value }: GameRecordsProps) => {
  return (
    <div className="flex bg-[#BF905C] p-1 px-3 gap-2 rounded-lg">
      <p className="text-lg">{title}</p>
      <div className="bg-[#926245] px-4 rounded-md">
        <p className="text-lg">{value}</p>
      </div>
    </div>
  );
};

export default GameRecords;
