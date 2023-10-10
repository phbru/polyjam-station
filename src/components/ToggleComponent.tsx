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
    <div>
      <div onClick={toggleContent} className="title">
        {title}
        <span className={`arrow ${isContentVisible ? "down" : "right"}`}></span>
      </div>
      {isContentVisible && <div className="content">{children}</div>}
    </div>
  );
};

export default ToggleComponent;
