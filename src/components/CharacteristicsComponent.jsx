// components/CharacteristicsComponent.jsx
import React, { useEffect, useState, useCallback } from "react";
import { Card, Tag, Input, Space, Typography } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import ProgressBar from "./ProgressBar";
import TelegramButtons from "./TelegramButtons";

const { Title, Text } = Typography;

const CharacteristicsComponent = ({ onNext, onBack }) => {
  const [selectedCharacteristics, setSelectedCharacteristics] = useState([
    "Программист",
    "С чувством юмора",
    "Воронеж",
    "Вегетарианец",
  ]);
  const [searchValue, setSearchValue] = useState("");
  const [showFixedButtons, setShowFixedButtons] = useState(true);

  useEffect(() => {
    const input = document.querySelector("input");
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

  const handleNext = useCallback(() => {
    onNext(selectedCharacteristics);
  }, [onNext, selectedCharacteristics]);

  const handleBack = useCallback(() => {
    onBack();
  }, [onBack]);

  const recommendedCharacteristics = [
    "Люблю животных",
    "Общительный",
    "Москва",
    "Оптимистичный",
    "Домосед",
    "Санкт Петербург",
    "Творческий",
    "ЗОЖ",
    "Геймер",
    "Путешественник",
    "Сладкоежка",
  ];

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

  const filteredRecommended = recommendedCharacteristics.filter(
    (char) =>
      !selectedCharacteristics.includes(char) &&
      char.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div
      style={{
        fontFamily: "Roboto, sans-serif",
        padding: "28px",
        maxWidth: "600px",
        margin: "0 auto",
        minHeight: "100vh",
        position: "relative",
        paddingBottom: "20px", // Уменьшили отступ снизу
      }}
    >
      <ProgressBar currentStep={2} totalSteps={3} />

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
          Мои характеристики
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
          Выберите ваши характеристики. Это поможет подобрать людей с похожими
          интересами
        </Text>
      </div>

      <Card
        style={{
          marginBottom: "12px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
        bodyStyle={{ padding: "12px" }}
      >
        <Title
          level={4}
          style={{
            color: "#999FAA",
            fontWeight: 600,
            marginBottom: "15px",
            fontSize: "clamp(18px, 3.5vw, 18px)",
          }}
        >
          Мои характеристики
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

      <Card
        style={{
          marginBottom: "30px",
          borderRadius: "12px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        }}
        bodyStyle={{ padding: "clamp(16px, 4vw, 24px)" }}
      >
        <Title
          level={4}
          style={{
            color: "#999FAA",
            fontWeight: 600,
            marginBottom: "16px",
            fontSize: "clamp(18px, 3.5vw, 18px)",
          }}
        >
          Рекомендуемые
        </Title>

        <Space size={[0, 6]} wrap>
          {filteredRecommended.map((char, index) => (
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
              }}
            >
              {char}
            </Tag>
          ))}
        </Space>
      </Card>

      {/* Используем Telegram кнопки вместо кастомных */}
      <TelegramButtons
        onNext={handleNext}
        onBack={handleBack}
        nextButtonText="Далее"
        showBackButton={true}
        isNextEnabled={selectedCharacteristics.length > 0}
      />
    </div>
  );
};

export default CharacteristicsComponent;