import ToggleButton from "./ToggleButton";

export default function Box({ children, isOpen, setIsOpen }) {
  return (
    <div className="box">
      <ToggleButton isOpen={isOpen} setIsOpen={setIsOpen} />
      {children}
    </div>
  );
}
