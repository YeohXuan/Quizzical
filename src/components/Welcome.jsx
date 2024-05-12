import React from "react";

export default function Welcome(props) {
  return (
    <div className="welcome-container">
      <div className="welcome">
        <h1 className="welcome-title">Quizzical</h1>
        <p className="welcome-text">
          How do you pronounce <span className="chopinn">Chopin?</span>
        </p>
        <button className="start-btn" onClick={props.onClick}>Start quiz</button>
      </div>
    </div>
  );
}
