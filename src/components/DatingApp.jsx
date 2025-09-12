// DatingApp.jsx
import React, { useState } from "react";
import DatingGoalsComponent from "./DatingGoalsComponent";
import CharacteristicsComponent from "./CharacteristicsComponent";
import ProfileComponent from "./ProfileComponent";

const DatingApp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({
    goals: [],
    characteristics: [],
  });

  const handleGoalsNext = (goals) => {
    setUserData((prev) => ({ ...prev, goals }));
    setCurrentStep(1);
  };

  const handleCharacteristicsNext = (characteristics) => {
    setUserData((prev) => ({ ...prev, characteristics }));
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const steps = [
    <DatingGoalsComponent onNext={handleGoalsNext} />,
    <CharacteristicsComponent
      onNext={handleCharacteristicsNext}
      onBack={handleBack}
    />,
    <ProfileComponent onBack={handleBack} />,
  ];

  return (
    <div style={{ backgroundColor: "#F5F5F5", minHeight: "100vh" }}>
      {steps[currentStep]}
    </div>
  );
};

export default DatingApp;