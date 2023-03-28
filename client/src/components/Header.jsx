import "../styles/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRobot,
  faVolumeXmark,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";

const Header = ({ toggleMute, isMute }) => {
  const handleClick = () => {
    toggleMute(!isMute);
  };

  return (
    <div className="header-container">
      <div className="title">
        <FontAwesomeIcon className="icon" icon={faRobot} />
        <h2>Chat Bot</h2>
      </div>
      <div onClick={() => handleClick()} className="media">
        <FontAwesomeIcon
          className="icon"
          icon={isMute ? faVolumeXmark : faVolumeHigh}
        />
      </div>
    </div>
  );
};

export default Header;
