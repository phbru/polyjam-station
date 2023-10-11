import React, { useState, ReactNode } from "react";

interface ToggleProps {
  title: ReactNode;
  children: ReactNode;
}

const ToggleComponent: React.FC<ToggleProps> = ({ children, title }) => {
  const [isContentVisible, setContentVisibility] = useState(false);

  const toggleContent = () => {
    setContentVisibility(!isContentVisible);
  };

  return (
    <div className="toggle-component__container">
      <div className="toggle-component__title">
        {title}
        <div
          onClick={toggleContent}
          className="toggle-component__arrow-container"
        >
          <div
            className={`toggle-component__arrow ${
              isContentVisible ? "down" : "right"
            }`}
          ></div>
        </div>
      </div>
      {isContentVisible && <div>{children}</div>}
    </div>
  );
};

export default ToggleComponent;
