import "../styles/input.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Input = ({ onInputChange, onEnterPressed, value }) => {
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      onEnterPressed();
    }
  };

  return (
    <div className="input-container">
      <FontAwesomeIcon className="icon" icon={faSearch} />
      <input
        type="text"
        placeholder="Type a message"
        value={value}
        onChange={onInputChange}
        onKeyDown={handleKeyDown}
        className="input-field"
      />
    </div>
  );
};

export default Input;
