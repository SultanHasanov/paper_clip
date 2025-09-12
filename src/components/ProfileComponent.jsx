// components/ProfileComponent.jsx
import React, { useEffect, useState, useRef } from "react";
import { Input, Typography, Spin, Drawer, message } from "antd";
import ProgressBar from "./ProgressBar";
import FixedButtons from "./FixedButtons";

const { Title, Text } = Typography;

const ProfileComponent = ({ onBack }) => {
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [about, setAbout] = useState("");
  const [photoUrl, setPhotoUrl] = useState(null);
  const [isPhotoLoading, setIsPhotoLoading] = useState(false);
  const [showPhotoMenu, setShowPhotoMenu] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg?.initDataUnsafe?.user) {
      const user = tg.initDataUnsafe.user;
      if (user.first_name) setName(user.first_name);
      if (user.photo_url) {
        setIsPhotoLoading(true);
        setPhotoUrl(user.photo_url);
      }
    }
  }, []);

  useEffect(() => {
  const handleFocus = () => {
    const tg = window.Telegram?.WebApp;
    tg?.expand();
  };

  // Добавляем обработчики для всех полей ввода
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', handleFocus);
  });

  return () => {
    inputs.forEach(input => {
      input.removeEventListener('focus', handleFocus);
    });
  };
}, []);

  useEffect(() => {
    if (photoUrl) {
      const img = new Image();
      img.onload = () => setIsPhotoLoading(false);
      img.onerror = () => setIsPhotoLoading(false);
      img.src = photoUrl;

      const timer = setTimeout(() => {
        setIsPhotoLoading(false);
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      setIsPhotoLoading(false);
    }
  }, [photoUrl]);

  const handleBirthDateChange = (e) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 8) val = val.slice(0, 8);
    if (val.length >= 5) {
      val = `${val.slice(0, 2)}.${val.slice(2, 4)}.${val.slice(4)}`;
    } else if (val.length >= 3) {
      val = `${val.slice(0, 2)}.${val.slice(2)}`;
    }
    setBirthDate(val);
  };

  const handleProfileComplete = () => {
    alert("Профиль создан!");
  };

  const handleAvatarClick = () => {
    setShowPhotoMenu(true);
  };

  const handleTakePhoto = () => {
    // Создаем input элемент для камеры
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.capture = 'camera'; // Используем камеру
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        processImageFile(file);
      }
    };
    
    input.click();
    setShowPhotoMenu(false);
  };

  const handleChooseFromGallery = () => {
    // Активируем скрытый input для выбора файла
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    setShowPhotoMenu(false);
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      processImageFile(file);
    }
    // Сбрасываем значение, чтобы можно было выбрать тот же файл снова
    e.target.value = null;
  };

  const processImageFile = (file) => {
    setIsPhotoLoading(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      setPhotoUrl(e.target.result);
      setIsPhotoLoading(false);
    };
    reader.onerror = () => {
      message.error('Ошибка загрузки изображения');
      setIsPhotoLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleCancelPhoto = () => {
    setShowPhotoMenu(false);
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
      <ProgressBar currentStep={3} totalSteps={3} />

      <div style={{ textAlign: "center", marginBottom: "40px" }}>
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
        <div onClick={handleAvatarClick} style={{ cursor: "pointer" }}>
          {isPhotoLoading ? (
            <div
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                backgroundColor: "#f0f0f0",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Spin size="large" />
            </div>
          ) : photoUrl ? (
            <img
              src={photoUrl}
              alt="profile"
              style={{
                width: "130px",
                height: "130px",
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
      </div>

      {/* Скрытый input для выбора файла из галереи */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />

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
          onChange={handleBirthDateChange}
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

      <Drawer
        title=" "
        placement="bottom"
        onClose={handleCancelPhoto}
        open={showPhotoMenu}
        height="auto"
        contentWrapperStyle={{
          maxWidth: "600px",
          margin: "0 auto",
          left: "6px",
          right: "6px",
          width: "auto",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          overflow: "hidden",
        }}
        bodyStyle={{
          padding: "0",
        }}
        headerStyle={{ display: "none" }}
        style={{
          background: "transparent",
        }}
        maskStyle={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        }}
      >
        <div style={{ textAlign: "center" }}>
          {/* Кнопка "Сделать фото" */}
          <div
            style={{
              padding: "20px",
              borderBottom: "1px solid #E5E5E5",
              color: "#007AFF",
              fontSize: "16px",
              fontWeight: "500",
              cursor: "pointer",
              backgroundColor: "#FFFFFF",
            }}
            onClick={handleTakePhoto}
          >
            Сделать фото
          </div>

          {/* Кнопка "Выбрать из галереи" */}
          <div
            style={{
              padding: "20px",
              borderBottom: "1px solid #E5E5E5",
              color: "#007AFF",
              fontSize: "16px",
              fontWeight: "500",
              cursor: "pointer",
              backgroundColor: "#FFFFFF",
            }}
            onClick={handleChooseFromGallery}
          >
            Выбрать из галереи
          </div>

          {/* Кнопка "Отменить" */}
          <div
            style={{
              padding: "20px",
              color: "#FF3B30",
              fontSize: "16px",
              fontWeight: "500",
              cursor: "pointer",
              backgroundColor: "#FFFFFF",
            }}
            onClick={handleCancelPhoto}
          >
            Отменить
          </div>
        </div>
      </Drawer>

      <FixedButtons
        onNext={handleProfileComplete}
        onBack={onBack}
        nextButtonText="Далее"
        nextButtonStyle={{
          backgroundColor: "#7A7A7A",
          borderColor: "#7A7A7A",
          color: "#FFFFFF",
        }}
        showBackButton={true}
      />
    </div>
  );
};

export default ProfileComponent;