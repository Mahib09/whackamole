import mole from "../assets/mole.png";
import hole from "../assets/hole.png";

const Mole = ({ isActive, onClick }) => {
  return (
    <img
      src={mole} // Use the correct path here
      className={`absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-32 transition-transform duration-300 z-20 ${
        isActive
          ? "translate-y-0 opacity-100 cursor-pointer"
          : "translate-y-full opacity-0 "
      }`}
      alt="Mole"
      onClick={isActive ? onClick : null}
      style={{ zIndex: 20 }}
    />
  );
};

export default Mole;
