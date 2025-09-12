// components/ProgressBar.jsx
import React from "react";

const ProgressBar = ({ currentStep, totalSteps }) => {
  const progressBars = [];

  for (let i = 1; i <= totalSteps; i++) {
    const isActive = i <= currentStep;
    const isLast = i === totalSteps;

    progressBars.push(
      <div
        key={i}
        style={{
          height: "5px",
          backgroundColor: isActive ? "#000" : "#E0E3E8",
          width: "25%",
          borderRadius: "5px",
          marginLeft: i === 1 ? "0" : "8px",
          position: isLast ? "relative" : "static",
        }}
      >
        {isLast && (
          <span
            style={{
              position: "absolute",
              top: "-20px",
              right: "0",
              fontSize: "13px",
              fontWeight: 600,
              color: "#8C8C8C",
            }}
          >
            Шаг {currentStep} из {totalSteps}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: "20px",
        marginTop: "20px",
      }}
    >
      {progressBars}
    </div>
  );
};

export default ProgressBar;