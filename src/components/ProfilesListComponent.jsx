// components/ProfilesListComponent.jsx
import React, { useState } from "react";
import { Card, Typography, Tag, Button, Modal, Space, Avatar } from "antd";
import { ArrowLeftOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import FixedButtons from "./FixedButtons";
import { Send } from "lucide-react";

const { Title, Text } = Typography;

const ProfilesListComponent = ({ onBack }) => {
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  // Пример данных профилей с тремя фото для каждого
  const profiles = [
    {
      id: 1,
      name: "Дмитрий Алексеев",
      age: 24,
      about:
        "Ищу друга для прогулок: одному со скамейками разговаривать неудобно",
      goals: [
        "Дружба",
        "Путешествие",
        "Прогулки",
        "Знакомства",
        "Вечерние посиделки",
      ],
      characteristics: [
        "Программист",
        "Воронеж",
        "С чувством юмора",
        "Люблю животных",
        "Общительный",
      ],
      photos: [
        "https://thispersondoesnotexist.com/",
        "https://picsum.photos/400/300?random=11",
        "https://picsum.photos/400/300?random=12"
      ],
    },
    {
      id: 2,
      name: "Анна Петрова",
      age: 26,
      about:
        "Люблю активный отдых и настольные игры, ищу компанию для совместного",
      goals: ["Дружба", "Отношения", "Настольные игры", "Путешествие"],
      characteristics: ["Дизайнер", "Москва", "Творческая", "Люблю животных"],
      photos: [
        "https://thispersondoesnotexist.com/",
        "https://picsum.photos/400/300?random=21",
        "https://picsum.photos/400/300?random=22"
      ],
    },
    {
      id: 3,
      name: "Иван Сидоров",
      age: 28,
      about: "Фанат походов и горных лыж. Ищу компанию для активного отдыха",
      goals: ["Путешествие", "Прогулки", "Спорт"],
      characteristics: ["Активный", "Москва", "Энергичный"],
      photos: [
        "https://thispersondoesnotexist.com/",
        "https://picsum.photos/400/300?random=31",
        "https://picsum.photos/400/300?random=32"
      ],
    },
  ];

  const handleProfileSelect = (profile) => {
    setSelectedProfile(profile);
    setCurrentPhotoIndex(0);
  };

  const handleCloseModal = () => {
    setSelectedProfile(null);
    setCurrentPhotoIndex(0);
  };

  const handleSendRequest = () => {
    Modal.success({
      title: "Запрос отправлен!",
      content: "Ваш запрос на знакомство отправлен пользователю.",
    });
    setSelectedProfile(null);
    setCurrentPhotoIndex(0);
  };

  const handleNextPhoto = () => {
    if (selectedProfile && selectedProfile.photos) {
      setCurrentPhotoIndex((prevIndex) => 
        prevIndex === selectedProfile.photos.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  const handlePrevPhoto = () => {
    if (selectedProfile && selectedProfile.photos) {
      setCurrentPhotoIndex((prevIndex) => 
        prevIndex === 0 ? selectedProfile.photos.length - 1 : prevIndex - 1
      );
    }
  };

  const handleSwipe = (direction) => {
    if (direction === 'left') {
      handleNextPhoto();
    } else if (direction === 'right') {
      handlePrevPhoto();
    }
  };

  // Обработчик свайпа
  const handleTouchStart = (e) => {
    const touchStartX = e.touches[0].clientX;
    const handleTouchEnd = (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const diffX = touchEndX - touchStartX;
      
      if (Math.abs(diffX) > 50) { // Минимальное расстояние свайпа
        if (diffX > 0) {
          handleSwipe('right');
        } else {
          handleSwipe('left');
        }
      }
      
      document.removeEventListener('touchend', handleTouchEnd);
    };
    
    document.addEventListener('touchend', handleTouchEnd);
  };

  return (
    <div
      style={{
        fontFamily: "Roboto, sans-serif",
        padding: "20px",
        maxWidth: "600px",
        margin: "0 auto",
        minHeight: "100vh",
        position: "relative",
        paddingBottom: "100px",
        overflowY: "auto",
         filter: selectedProfile ? "blur(2.5px)" : "none",
        transition: "filter 0.3s ease",
      }}
    >
      {/* Заголовок */}
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}
      >
        <Button
          icon={<ArrowLeftOutlined />}
          onClick={onBack}
          type="text"
          style={{ marginRight: "10px" }}
        />
        <Title level={4} style={{ margin: 0 }}>
          Профиль
        </Title>
      </div>

      {/* Список карточек */}
      {profiles.map((profile) => (
        <Card
          key={profile.id}
          style={{
            borderRadius: "12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            cursor: "pointer",
            marginBottom: "16px",
          }}
          bodyStyle={{ padding: "16px" }}
          onClick={() => handleProfileSelect(profile)}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: '20px'
            }}
          >
            <Avatar
              src={profile.photos[0]}
              style={{ width: "110px", height: "64px" }}
            />
            <div>
              <Title level={4} style={{ margin: 0 }}>
                {profile.name}, {profile.age}
              </Title>
              <Text style={{ color: "#666" }}>{profile.about}</Text>
            </div>
          </div>

          <div style={{ marginBottom: "16px" }}>
            <Text strong style={{ display: "block", marginBottom: "8px" }}>
              Цели
            </Text>
            <Space size={[0, 6]} wrap>
              {profile.goals.map((goal, index) => (
                <Tag
                  key={index}
                  style={{
                    backgroundColor: "#EFF0F2",
                    color: "#404040",
                    border: "none",
                    borderRadius: "5px",
                    padding: "4px 8px",
                    fontSize: "14px",
                  }}
                >
                  {goal}
                </Tag>
              ))}
            </Space>
          </div>

          <div>
            <Text strong style={{ display: "block", marginBottom: "8px" }}>
              Характеристики
            </Text>
            <Space size={[0, 6]} wrap>
              {profile.characteristics.map((char, index) => (
                <Tag
                  key={index}
                  style={{
                    backgroundColor: "#EFF0F2",
                    color: "#404040",
                    border: "none",
                    borderRadius: "5px",
                    padding: "4px 8px",
                    fontSize: "14px",
                  }}
                >
                  {char}
                </Tag>
              ))}
            </Space>
          </div>
        </Card>
      ))}

      {/* Модальное окно */}
      <Modal
        open={!!selectedProfile}
        onCancel={handleCloseModal}
        footer={null}
        width={380}
        centered
        bodyStyle={{ padding: 0, borderRadius: "12px", overflow: "hidden",  }}
      >
        {selectedProfile && (
          <div>
            <div 
              style={{ 
                position: "relative", 
                overflow: "hidden"
              }}
              onTouchStart={handleTouchStart}
            >
              <Title level={4} style={{ marginBottom: "8px" }}>
                {selectedProfile.name}, {selectedProfile.age}
              </Title>
              <img
                src={selectedProfile.photos[currentPhotoIndex]}
                alt={selectedProfile.name}
                style={{ 
                  width: "100%", 
                  height: "240px", 
                  objectFit: "cover",
                  borderRadius: 10,
                }}
              />
              
              {/* Кнопки навигации */}
              <Button
                icon={<LeftOutlined />}
                type="text"
                style={{
                  position: "absolute",
                  left: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "white",
                  backgroundColor: "rgba(0,0,0,0.3)",
                  border: "none",
                }}
                onClick={handlePrevPhoto}
              />
              <Button
                icon={<RightOutlined />}
                type="text"
                style={{
                  position: "absolute",
                  right: 8,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "white",
                  backgroundColor: "rgba(0,0,0,0.3)",
                  border: "none",
                }}
                onClick={handleNextPhoto}
              />
              
              {/* Индикатор фото */}
              <div
                style={{
                  position: "absolute",
                  bottom: 12,
                  left: 0,
                  right: 0,
                  display: "flex",
                  justifyContent: "center",
                  gap: "6px",
                }}
              >
                {selectedProfile.photos.map((_, index) => (
                  <div
                    key={index}
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      backgroundColor: index === currentPhotoIndex 
                        ? "white" 
                        : "black",
                      cursor: "pointer",
                    }}
                    onClick={() => setCurrentPhotoIndex(index)}
                  />
                ))}
              </div>
            </div>
            
            <div style={{ padding: "16px", }}>
              
              <Text style={{ display: "block", marginBottom: "16px" }}>
                {selectedProfile.about}
              </Text>

              <div style={{ marginBottom: "16px" }}>
                <Text strong style={{ display: "block", marginBottom: "8px" }}>
                  Цели
                </Text>
                <Space size={[0, 6]} wrap>
                  {selectedProfile.goals.map((goal, index) => (
                    <Tag
                      key={index}
                      style={{
                        backgroundColor: "#EFF0F2",
                        color: "#404040",
                        border: "none",
                        borderRadius: "5px",
                        padding: "4px 8px",
                        fontSize: "14px",
                      }}
                    >
                      {goal}
                    </Tag>
                  ))}
                </Space>
              </div>

              <div style={{ marginBottom: "20px" }}>
                <Text strong style={{ display: "block", marginBottom: "8px" }}>
                  Характеристики
                </Text>
                <Space size={[0, 6]} wrap>
                  {selectedProfile.characteristics.map((char, index) => (
                    <Tag
                      key={index}
                      style={{
                        backgroundColor: "#EFF0F2",
                        color: "#404040",
                        border: "none",
                        borderRadius: "5px",
                        padding: "4px 8px",
                        fontSize: "14px",
                      }}
                    >
                      {char}
                    </Tag>
                  ))}
                </Space>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <Button
                  icon={<Send size={25} />}
                  style={{
                    backgroundColor: "black",
                    border: "none",
                    width: "48px",
                    height: "48px",
                    color: "white",
                  }}
                  onClick={() => window.open("https://t.me/username", "_blank")}
                />
                <Button
                  type="primary"
                  block
                  style={{
                    backgroundColor: "black",
                    border: "none",
                    height: "48px",
                    fontSize: "20px",
                    fontWeight: "700",
                    flex: 1,
                  }}
                  onClick={handleSendRequest}
                >
                  Отправить запрос
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ProfilesListComponent;