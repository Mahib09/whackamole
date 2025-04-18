import bomb from "../assets/bomb.png";
interface BombProps {
  isActive: boolean;
  onClick: () => void | null;
}
const Bomb = ({ isActive, onClick }: BombProps) => {
  return (
    <img
      src={bomb}
      alt="Bomb"
      className={`absolute bottom-0  left-1/2 transform -translate-x-1/2 w-28 h-28 transition-transform duration-300 z-20 ${
        isActive
          ? "-translate-y-7 opacity-100 cursor-pointer pointer-events-auto"
          : "translate-y-full opacity-0 pointer-events-none"
      }`}
      onClick={isActive ? onClick : undefined}
    />
  );
};

export default Bomb;
