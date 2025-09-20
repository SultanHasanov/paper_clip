// DatingApp.jsx
import React, { useState } from "react";
import DatingGoalsComponent from "./DatingGoalsComponent";
import CharacteristicsComponent from "./CharacteristicsComponent";
import ProfileComponent from "./ProfileComponent";
import DesiredCharacteristics from "./DesiredCharacteristics";
import ProfilesListComponent from "./ProfilesListComponent";

const DatingApp = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [userData, setUserData] = useState({
    goals: [],
    desiredCharacteristics: [],
    characteristics: [],
    profile: {},
  });

  const handleGoalsNext = (goals) => {
    setUserData((prev) => ({ ...prev, goals }));
    setCurrentStep(1);
  };

  const handleDesiredCharacteristicsNext = (desiredCharacteristics) => {
    setUserData((prev) => ({ ...prev, desiredCharacteristics }));
    setCurrentStep(2);
  };

  const handleCharacteristicsNext = (characteristics) => {
    setUserData((prev) => ({ ...prev, characteristics }));
    setCurrentStep(3);
  };

  const handleProfileComplete = (profileData) => {
    setUserData((prev) => ({ 
      ...prev, 
      profile: {
        ...profileData,
        name: profileData.name || "Пользователь",
        about: profileData.about || "",
        photo: profileData.photoUrl || null
      }
    }));
    setCurrentStep(4); // Переходим к просмотру профилей
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const steps = [
    <DatingGoalsComponent onNext={handleGoalsNext} />,
    <DesiredCharacteristics
      onNext={handleDesiredCharacteristicsNext}
      onBack={handleBack}
    />,
    <CharacteristicsComponent
      onNext={handleCharacteristicsNext}
      onBack={handleBack}
    />,
    <ProfileComponent 
      onComplete={handleProfileComplete} 
      onBack={handleBack} 
    />,
    <ProfilesListComponent 
      onBack={handleBack}
      userData={userData}
    />,
  ];

  return (
    <div style={{ backgroundColor: "#F5F5F5", minHeight: "100vh" }}>
      {steps[currentStep]}
    </div>
  );
};

export default DatingApp;