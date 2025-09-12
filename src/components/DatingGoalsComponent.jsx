// components/DatingGoalsComponent.jsx
import React, { useEffect, useState } from "react";
import { Card, Tag, Input, Button, Space, Typography } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import ProgressBar from "./ProgressBar";
import FixedButtons from "./FixedButtons";

const { Title, Text } = Typography;

const DatingGoalsComponent = ({ onNext }) => {
  const [selectedGoals, setSelectedGoals] = useState([
    "Кино или театр",
    "Путешествие",
    "Прогулки",
    "Бильярд",
    "Спорт",
  ]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const handleFocus = () => {
      const tg = window.Telegram?.WebApp;
      tg?.expand();
    };

    // Добавляем обработчики для поля поиска
    const inputs = document.querySelectorAll("input");
    inputs.forEach((input) => {
      input.addEventListener("focus", handleFocus);
    });

    return () => {
      inputs.forEach((input) => {
        input.removeEventListener("focus", handleFocus);
      });
    };
  }, []);

  const recommendedGoals = [
    "Путешествие",
    "Прогулка",
    "Йога",
    "Концерт",
    "Бокс",
    "Спорт",
    "Походы и трекинг",
    "Совместная поездка",
    "Бильярд",
    "Йога",
    "Музеи и выставки",
    "Совместные хобби",
  ];

  const handleRemoveGoal = (goalToRemove) => {
    setSelectedGoals(selectedGoals.filter((goal) => goal !== goalToRemove));
  };

  const handleAddGoal = (goalToAdd) => {
    if (!selectedGoals.includes(goalToAdd)) {
      setSelectedGoals([...selectedGoals, goalToAdd]);
    }
  };

  const filteredRecommended = recommendedGoals.filter(
    (goal) =>
      !selectedGoals.includes(goal) &&
      goal.toLowerCase().includes(searchValue.toLowerCase())
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
        paddingBottom: "100px",
      }}
    >
      <ProgressBar currentStep={1} totalSteps={3} />

      <div
        style={{ textAlign: "center", marginBottom: "20px", padding: "0 25px" }}
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
          Цели знакомства
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
          Выберите какие цели знакомства вам интересны. Это поможет подобрать
          людей с похожими интересами
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
          Мои цели
        </Title>

        <Space size={[0, 6]} wrap style={{ marginBottom: "16px" }}>
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
              }}
            >
              {goal}
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
          {filteredRecommended.map((goal, index) => (
            <Tag
              key={index}
              onClick={() => handleAddGoal(goal)}
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
              {goal}
            </Tag>
          ))}
        </Space>
      </Card>

      <FixedButtons
        onNext={() => onNext(selectedGoals)}
        nextButtonText="Далее"
        showBackButton={false}
      />
    </div>
  );
};

export default DatingGoalsComponent;
