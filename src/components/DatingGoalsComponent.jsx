import React, { useEffect, useState } from "react";
import { Card, Tag, Input, Button, Space, Typography } from "antd";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
const { Title, Text } = Typography;

// Компонент выбора целей знакомства
const DatingGoalsComponent = ({ onNext }) => {
  const [selectedGoals, setSelectedGoals] = useState([
    "Кино или театр",
    "Путешествие",
    "Прогулки",
    "Бильярд",
    "Спорт",
  ]);
  const [searchValue, setSearchValue] = useState("");

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
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            height: "5px",
            backgroundColor: "#000",
            width: "25%",
            borderRadius: "5px",
          }}
        ></div>
        <div
          style={{
            height: "5px",
            backgroundColor: "#E0E3E8",
            width: "25%",
            borderRadius: "5px",
            marginLeft: "8px",
          }}
        ></div>
        <div
          style={{
            height: "5px",
            backgroundColor: "#E0E3E8",
            width: "25%",
            borderRadius: "5px",
            marginLeft: "8px",
            position: "relative", // добавлено
          }}
        >
          {/* Текст теперь внутри последней линии */}
          <span
            style={{
              position: "absolute",
              top: "-20px", // подняли над линией
              right: 0, // привязали к правому краю
              fontSize: "13px",
              fontWeight: 600,
              color: "#8C8C8C",
            }}
          >
            Шаг 1 из 3
          </span>
        </div>
      </div>

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
      <div style={{ display: "flex", justifyContent: "end" }}>
        <Button
          type="primary"
          size="large"
          onClick={() => onNext(selectedGoals)}
          style={{
            backgroundColor: "#000",
            borderColor: "#000",
            borderRadius: "8px",
            height: "clamp(50px, 10vw, 50px)",
            fontSize: "clamp(20px, 3.5vw, 24px)",
            fontWeight: 700,
            width: "150px",
            color: "#CDDDDB",
            padding: "0 0 5px 0",
          }}
        >
          Далее
        </Button>
      </div>
    </div>
  );
};

// Компонент выбора характеристик
const CharacteristicsComponent = ({ onNext, onBack }) => {
  const [selectedCharacteristics, setSelectedCharacteristics] = useState([
    "Программист",
    "С чувством юмора",
    "Воронеж",
    "Вегетарианец",
  ]);
  const [searchValue, setSearchValue] = useState("");

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
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            height: "5px",
            backgroundColor: "#000",
            width: "25%",
            borderRadius: "5px",
          }}
        ></div>
        <div
          style={{
            height: "5px",
            backgroundColor: "#000",
            width: "25%",
            borderRadius: "5px",
            marginLeft: "8px",
          }}
        ></div>
        <div
          style={{
            height: "5px",
            backgroundColor: "#E0E3E8",
            width: "25%",
            borderRadius: "5px",
            marginLeft: "8px",
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: "-20px", // подняли над линией
              right: 0, // привязали к правому краю
              fontSize: "13px",
              fontWeight: 600,
              color: "#8C8C8C",
            }}
          >
            Шаг 2 из 3
          </span>
        </div>
      </div>

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

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          size="large"
          onClick={onBack}
          style={{
            backgroundColor: "#000",
            borderColor: "#000",
            borderRadius: "8px",
            height: "clamp(50px, 10vw, 50px)",
            fontSize: "clamp(20px, 3.5vw, 24px)",
            fontWeight: 700,
            width: "150px",
            color: "#CDDDDB",
            padding: "0 0 5px 0",
          }}
        >
          Назад
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={() => onNext(selectedCharacteristics)}
          style={{
            backgroundColor: "#000",
            borderColor: "#000",
            borderRadius: "5px",
            height: "clamp(50px, 10vw, 50px)",
            fontSize: "clamp(20px, 3.5vw, 24px)",
            fontWeight: 700,
            width: "150px",
            color: "#CDDDDB",
            padding: "0 0 5px 0",
          }}
        >
          Далее
        </Button>
      </div>
    </div>
  );
};

// Компонент заполнения профиля
const ProfileComponent = ({ onBack }) => {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [about, setAbout] = useState("");
  const [photoUrl, setPhotoUrl] = useState(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg?.initDataUnsafe?.user) {
      const user = tg.initDataUnsafe.user;
      if (user.first_name) setName(user.first_name);
      if (user.photo_url) setPhotoUrl(user.photo_url);
    }
  }, []);

  return (
    <div
      style={{
        fontFamily: "Roboto, sans-serif",
        padding: "28px",
        maxWidth: "600px",
        margin: "0 auto",
        minHeight: "100vh",
      }}
    >
      {/* Progress indicator */}

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
          marginTop: "20px",
        }}
      >
        <div
          style={{
            height: "5px",
            backgroundColor: "#000",
            width: "25%",
            borderRadius: "5px",
          }}
        ></div>
        <div
          style={{
            height: "5px",
            backgroundColor: "#000",
            width: "25%",
            borderRadius: "5px",
            marginLeft: "8px",
          }}
        ></div>
        <div
          style={{
            height: "5px",
            backgroundColor: "#000",
            width: "25%",
            borderRadius: "5px",
            marginLeft: "8px",
            position: "relative",
          }}
        >
          <span
            style={{
              position: "absolute",
              top: "-20px", // подняли над линией
              right: 0, // привязали к правому краю
              fontSize: "13px",
              fontWeight: 600,
              color: "#8C8C8C",
            }}
          >
            Шаг 3 из 3
          </span>
        </div>
      </div>

      <div
        style={{ textAlign: "center", marginBottom: "40px", padding: "0 20px" }}
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
          Заполнение профиля
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
          Напишите немного о себе, чтобы другим было проще с вами познакомиться
        </Text>
      </div>

      {/* Profile Picture */}
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        {photoUrl ? (
          <img
            src={photoUrl}
            alt="profile"
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              objectFit: "cover",
              margin: "0 auto",
              display: "block",
            }}
          />
        ) : (
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              backgroundColor: "#C4C7CC",
              margin: "0 auto",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "40px",
              color: "#000",
            }}
          >
            👤
          </div>
        )}
      </div>

      {/* Name Input */}
      <div style={{ marginBottom: "10px" }}>
        <Text style={{ fontSize: "16px", color: "#999FAA", fontWeight: 600 }}>
          Имя
        </Text>
        <Input
          placeholder="Введите имя"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            marginTop: "2px",
            borderRadius: "8px",
            backgroundColor: "#F9F9F9",
            border: "1px solid #E5E5E5",
            fontSize: "16px",
            padding: "12px",
            height: "48px",
          }}
        />
      </div>

      {/* Birth Date Input */}
      <div style={{ marginBottom: "10px" }}>
        <Text style={{ fontSize: "16px", color: "#999FAA", fontWeight: 600 }}>
          Дата рождения
        </Text>
        <Input
          placeholder="ДД.ММ.ГГГГ"
          value={birthDate}
          onChange={(e) => {
            let val = e.target.value.replace(/\D/g, ""); // оставляем только цифры

            if (val.length > 8) val = val.slice(0, 8); // максимум 8 цифр

            // Автоставим точки
            if (val.length >= 5) {
              val = `${val.slice(0, 2)}.${val.slice(2, 4)}.${val.slice(4)}`;
            } else if (val.length >= 3) {
              val = `${val.slice(0, 2)}.${val.slice(2)}`;
            }

            setBirthDate(val);
          }}
          inputMode="numeric"
          pattern="\d{2}\.\d{2}\.\d{4}"
          style={{
            marginTop: "2px",
            borderRadius: "8px",
            backgroundColor: "#F9F9F9",
            border: "1px solid #E5E5E5",
            fontSize: "16px",
            padding: "12px",
            height: "48px",
          }}
        />
      </div>

      {/* About Input */}
      <div style={{ marginBottom: "30px" }}>
        <Text style={{ fontSize: "16px", color: "#999FAA", fontWeight: 600 }}>
          О себе
        </Text>
        <Input.TextArea
          placeholder="Например: люблю путешествовать, готовить и смотреть сериалы"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          maxLength={160}
          showCount
          style={{
            marginTop: "2px",
            borderRadius: "8px",
            backgroundColor: "#F9F9F9",
            border: "1px solid #E5E5E5",
            fontSize: "16px",
            minHeight: "100px",
            resize: "none",
          }}
        />
      </div>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          size="large"
          onClick={onBack}
          style={{
            backgroundColor: "#000",
            borderColor: "#000",
            borderRadius: "5px",
            height: "clamp(50px, 10vw, 50px)",
            fontSize: "clamp(20px, 3.5vw, 24px)",
            fontWeight: 700,
            width: "150px",
            color: "#CDDDDB",
            padding: "0 0 5px 0",
          }}
        >
          Назад
        </Button>
        <Button
          type="primary"
          size="large"
          style={{
            backgroundColor: "#7A7A7A",
            borderColor: "#7A7A7A",
            borderRadius: "5px",
            height: "clamp(50px, 10vw, 50px)",
            fontSize: "clamp(20px, 3.5vw, 24px)",
            fontWeight: 700,
            width: "150px",
            color: "#FFFFFF",
            padding: "0 0 5px 0",
          }}
          onClick={() => alert("Профиль создан!")}
        >
          Далее
        </Button>
      </div>
    </div>
  );
};

// Основной компонент приложения
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
