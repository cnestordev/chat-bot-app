import "../styles/header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRobot,
  faVolumeXmark,
  faVolumeHigh,
  faArrowRight,
} from "@fortawesome/free-solid-svg-icons";

const Header = ({ toggleMute, isMute, handleMenuToggle, isMenuOpen }) => {
  const handleClick = () => {
    toggleMute(!isMute);
  };

  return (
    <div className="header-container">
      <div
        onClick={() => handleMenuToggle()}
        className={`menu ${isMenuOpen ? "toggleArrow" : ""}`}
      >
        <FontAwesomeIcon className="icon" icon={faArrowRight} />
      </div>
      {/* <div className="title">
        <FontAwesomeIcon className="icon" icon={faRobot} />
        <h2>Chat Bot</h2>
      </div>
      <div onClick={() => handleClick()} className="media">
        <FontAwesomeIcon
          className="icon"
          icon={isMute ? faVolumeXmark : faVolumeHigh}
        />
      </div> */}
    </div>
  );
};

export default Header;
