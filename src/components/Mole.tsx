import mole from "../assets/mole.png";

interface MoleProps {
  isActive: boolean;
  onClick: () => void;
}

const Mole = ({ isActive, onClick }: MoleProps) => {
  return (
    <img
      src={mole} // Use the correct path here
      className={`absolute -bottom-5 left-1/2 transform -translate-x-1/2 w-32 h-32 transition-transform duration-300 z-20 ${
        isActive
          ? "translate-y-0 opacity-100 cursor-pointer"
          : "translate-y-full opacity-0 "
      }`}
      alt="Mole"
      onClick={isActive ? onClick : undefined}
      style={{ zIndex: 20 }}
    />
  );
};

export default Mole;
