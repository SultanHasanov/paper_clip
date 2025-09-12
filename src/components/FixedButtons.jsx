// components/FixedButtons.jsx
import React from "react";
import { Button } from "antd";

const FixedButtons = ({
  onNext,
  onBack,
  nextButtonText = "Далее",
  backButtonText = "Назад",
  showBackButton = false,
  nextButtonStyle = {},
  backButtonStyle = {},
}) => {
  const defaultButtonStyle = {
    backgroundColor: "#000",
    borderColor: "#000",
    borderRadius: "5px",
    height: "clamp(50px, 10vw, 50px)",
    fontSize: "clamp(20px, 3.5vw, 24px)",
    fontWeight: 700,
    width: "135px",
    color: "#CDDDDB",
    padding: "0 0 5px 0",
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "20px",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          maxWidth: "600px",
          margin: "0 auto",
          display: "flex",
          justifyContent: showBackButton ? "space-between" : "flex-end",
        }}
      >
        {showBackButton && (
          <Button
            size="large"
            onClick={onBack}
            style={{
              ...defaultButtonStyle,
              ...backButtonStyle,
            }}
          >
            {backButtonText}
          </Button>
        )}
        <Button
          type="primary"
          size="large"
          onClick={onNext}
          style={{
            ...defaultButtonStyle,
            ...nextButtonStyle,
          }}
        >
          {nextButtonText}
        </Button>
      </div>
    </div>
  );
};

export default FixedButtons;