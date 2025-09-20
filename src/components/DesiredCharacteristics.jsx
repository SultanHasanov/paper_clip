// components/DesiredCharacteristics.jsx
import React, { useEffect, useState } from "react";
import { Card, Tag, Space, Typography, Button, Input } from "antd";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import ProgressBar from "./ProgressBar";
import FixedButtons from "./FixedButtons";

const { Title, Text } = Typography;

const DesiredCharacteristics = ({ onNext, onBack }) => {
  const [selectedGoals, setSelectedGoals] = useState([
    "Кино или театр",
    "Путешествие",
    "Прогулки",
    "Дружба",
    "Спорт",
  ]);
  const [selectedCharacteristics, setSelectedCharacteristics] = useState([
    "Парень",
    "С юмором",
    "Воронеж",
    "Дружба",
  ]);
  const [showFixedButtons, setShowFixedButtons] = useState(true);
  const [searchValue, setSearchValue] = useState("");
  
  useEffect(() => {
    const input = document.querySelector("input"); // ваш единственный поиск

    if (!input) return;

    const handleFocus = () => setShowFixedButtons(false);
    const handleBlur = () => setShowFixedButtons(true);

    input.addEventListener("focus", handleFocus);
    input.addEventListener("blur", handleBlur);

    return () => {
      input.removeEventListener("focus", handleFocus);
      input.removeEventListener("blur", handleBlur);
    };
  }, []);
  const recommendedCharacteristics = [
    "Парень",
    "Девушка",
    "Семья",
    "Спорт",
    "С юмором",
    "Высокий",
    "Творческая",
    "Общение",
    "Санкт Петербург",
    "Дружба",
    "Москва",
    "Путешествия",
    "ЗОЖ",
    "Танцы",
  ];

  const handleRemoveGoal = (goalToRemove) => {
    setSelectedGoals(selectedGoals.filter((goal) => goal !== goalToRemove));
  };

  const handleRemoveCharacteristic = (characteristicToRemove) => {
    setSelectedCharacteristics(
      selectedCharacteristics.filter((char) => char !== characteristicToRemove)
    );
  };

  const handleAddCharacteristic = (characteristicToAdd) => {
    if (!selectedCharacteristics.includes(characteristicToAdd)) {
      setSelectedCharacteristics([
        ...selectedCharacteristics,
        characteristicToAdd,
      ]);
    }
  };

  return (
    <div
      style={{
        fontFamily: "Roboto, sans-serif",
        padding: "28px",
        maxWidth: "600px",
        margin: "0 auto",
        minHeight: "100vh",
        position: "relative",
        paddingBottom: "100px",
      }}
    >
      <ProgressBar currentStep={2} totalSteps={4} />

      <div
        style={{ textAlign: "center", marginBottom: "20px", padding: "0 10px" }}
      >
        <Title
          level={2}
          style={{
            fontSize: "clamp(28px, 5vw, 32px)",
            fontWeight: 600,
            color: "rgba(17, 24, 39, 1)",
            marginBottom: "16px",
          }}
        >
          Желаемые характеристики
        </Title>
        <Text
          style={{
            fontSize: "clamp(16px, 3vw, 16px)",
            color: "#6B7280",
            lineHeight: "25px",
            letterSpacing: "0px",
            fontWeight: 200,
          }}
        >
          Выберите желаемые характеристики для того, чтобы найти именно того,
          кого ищете
        </Text>
      </div>

      {/* Карточка с выбранными целями */}
      <Card
        style={{
          marginBottom: "16px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
        bodyStyle={{ padding: "16px" }}
      >
        <Title
          level={4}
          style={{
            color: "#999FAA",
            fontWeight: 600,
            marginBottom: "12px",
            fontSize: "clamp(16px, 3.5vw, 16px)",
          }}
        >
          Выбранные цели
        </Title>

        <Space size={[0, 6]} wrap style={{ marginBottom: "0px" }}>
          {selectedGoals.map((goal, index) => (
            <Tag
              key={index}
              closable
              onClose={() => handleRemoveGoal(goal)}
              closeIcon={
                <CloseOutlined
                  style={{ fontSize: "10px", marginLeft: 10, color: "#404040" }}
                />
              }
              style={{
                backgroundColor: "#EFF0F2",
                color: "#404040",
                border: "none",
                borderRadius: "5px",
                padding: "8px 8px 8px 8px",
                fontSize: "clamp(14px, 2.5vw, 14px)",
                lineHeight: "20px",
                height: "auto",
                marginBottom: "8px",
              }}
            >
              {goal}
            </Tag>
          ))}
        </Space>
      </Card>

      {/* Карточка с желаемыми характеристиками */}
      <Card
        style={{
          marginBottom: "16px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
        bodyStyle={{ padding: "16px" }}
      >
        <Title
          level={4}
          style={{
            color: "#999FAA",
            fontWeight: 600,
            marginBottom: "12px",
            fontSize: "clamp(16px, 3.5vw, 16px)",
          }}
        >
          Желаемые характеристики
        </Title>

        <Space size={[0, 6]} wrap style={{ marginBottom: "16px" }}>
          {selectedCharacteristics.map((char, index) => (
            <Tag
              key={index}
              closable
              onClose={() => handleRemoveCharacteristic(char)}
              closeIcon={
                <CloseOutlined
                  style={{ fontSize: "10px", marginLeft: 10, color: "#404040" }}
                />
              }
              style={{
                backgroundColor: "#EFF0F2",
                color: "#404040",
                border: "none",
                borderRadius: "5px",
                padding: "8px 8px 8px 8px",
                fontSize: "clamp(14px, 2.5vw, 14px)",
                lineHeight: "20px",
                height: "auto",
                marginBottom: "8px",
              }}
            >
              {char}
            </Tag>
          ))}
        </Space>

        <Input
          placeholder="Поиск"
          prefix={<SearchOutlined style={{ color: "#bfbfbf" }} />}
          suffix={
            searchValue && (
              <CloseOutlined
                onClick={() => setSearchValue("")}
                style={{
                  color: "#404040",
                  cursor: "pointer",
                  fontSize: "12px",
                }}
              />
            )
          }
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{
            borderRadius: "5px",
            backgroundColor: "#EFF0F2",
            border: "none",
            fontSize: "clamp(14px, 3vw, 16px)",
          }}
        />
      </Card>

      {/* Карточка с рекомендуемыми характеристиками */}
      <Card
        style={{
          marginBottom: "30px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
        bodyStyle={{ padding: "16px" }}
      >
        <Title
          level={4}
          style={{
            color: "#999FAA",
            fontWeight: 600,
            marginBottom: "16px",
            fontSize: "clamp(16px, 3.5vw, 16px)",
          }}
        >
          Рекомендуемые
        </Title>

        <Space size={[0, 6]} wrap>
          {recommendedCharacteristics.map((char, index) => (
            <Tag
              key={index}
              onClick={() => handleAddCharacteristic(char)}
              style={{
                backgroundColor: "#EFF0F2",
                color: "#404040",
                border: "none",
                borderRadius: "5px",
                padding: "8px 8px",
                fontSize: "clamp(14px, 2.5vw, 14px)",
                lineHeight: "20px",
                height: "auto",
                cursor: "pointer",
                marginBottom: "8px",
              }}
            >
              {char}
            </Tag>
          ))}
        </Space>
      </Card>

      {showFixedButtons && (
        <FixedButtons
          onNext={() => onNext({ selectedGoals, selectedCharacteristics })}
          onBack={onBack}
          nextButtonText="Далее"
          showBackButton={true}
          backButtonText="Назад"
        />
      )}
    </div>
  );
};

export default DesiredCharacteristics;
