import React from "react";
import { ICONS } from "../../helpers/icons";
import "./AddressBar.css";

const AddressBar = ({ currentPath, onNavigate }) => {
  const handleInputChange = (e) => {
    if (e.key === "Enter") {
      const newPath = e.target.value.trim();
      if (newPath) {
        const normalizedPath = newPath.startsWith("/")
          ? newPath
          : `/${newPath}`;
        onNavigate(normalizedPath);
      }
    }
  };

  const handleHomeClick = () => {
    onNavigate("/");
  };

  return (
    <div className="address-bar">
      <div className="address-bar-content">
        <button
          className="home-button"
          onClick={handleHomeClick}
          title="Go to root directory"
        >
          {ICONS.ROOT}
        </button>
        <input
          key={currentPath}
          type="text"
          className="address-input"
          placeholder="Enter path (e.g., /Documents)"
          defaultValue={currentPath}
          onKeyDown={handleInputChange}
          title="Press Enter to navigate to path"
        />
      </div>
    </div>
  );
};

export default AddressBar;
