// components/ProfileComponent.jsx
import React, { useEffect, useState, useRef } from "react";
import { Input, Typography, Spin, Drawer, message } from "antd";
import ProgressBar from "./ProgressBar";

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

  // Настройка кнопок Telegram WebApp
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;

    // Показываем главную кнопку
    tg.MainButton.setText("Далее");
    tg.MainButton.color = "#7A7A7A";
    tg.MainButton.textColor = "#FFFFFF";
    tg.MainButton.show();

    // Показываем кнопку "Назад"
    tg.BackButton.show();

    // Обработчик для главной кнопки
    const handleMainButton = () => {
      handleProfileComplete();
    };

    // Обработчик для кнопки "Назад"
    const handleBackButton = () => {
      if (onBack) {
        onBack();
      }
    };

    // Подписываемся на события
    tg.MainButton.onClick(handleMainButton);
    tg.BackButton.onClick(handleBackButton);

    // Очистка при размонтировании компонента
    return () => {
      tg.MainButton.offClick(handleMainButton);
      tg.BackButton.offClick(handleBackButton);
      tg.MainButton.hide();
      tg.BackButton.hide();
    };
  }, [onBack]);

  // Обновление состояния главной кнопки в зависимости от заполненности формы
  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (!tg) return;

    const isFormValid = name.trim() !== "" && birthDate.length >= 8;
    
    if (isFormValid) {
      tg.MainButton.color = "#007AFF";
      tg.MainButton.enable();
    } else {
      tg.MainButton.color = "#7A7A7A";
      tg.MainButton.disable();
    }
  }, [name, birthDate]);

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
    const tg = window.Telegram?.WebApp;
    
    // Показываем индикатор загрузки
    if (tg) {
      tg.MainButton.showProgress();
    }

    // Симулируем отправку данных
    setTimeout(() => {
      if (tg) {
        tg.MainButton.hideProgress();
        // Показываем уведомление через Telegram WebApp
        tg.showAlert("Профиль создан!");
      } else {
        alert("Профиль создан!");
      }
    }, 1500);
  };

  const handleAvatarClick = () => {
    setShowPhotoMenu(true);
  };

  const handleTakePhoto = async () => {
    try {
      setIsPhotoLoading(true);
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user" },
      });

      const cameraContainer = document.createElement("div");
      cameraContainer.id = "camera-container";
      cameraContainer.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: black;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    `;

      const video = document.createElement("video");
      video.autoplay = true;
      video.playsInline = true;
      video.muted = true;
      video.srcObject = stream;
      video.style.cssText = `
  width: 300px;
  height: 300px;
  border-radius: 50%;
  object-fit: cover;
  transform: scaleX(-1);
`;

      const buttonContainer = document.createElement("div");
      buttonContainer.style.cssText = `
      display: flex;
      gap: 20px;
      margin-top: 20px;
    `;

      const cancelBtn = document.createElement("button");
      cancelBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg> Отменить`;
      cancelBtn.style.cssText = `
      background: #FF3B30;
      color: white;
      border: none;
      padding: 15px 20px;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 8px;
    `;

      const captureBtn = document.createElement("button");
      captureBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-camera-icon lucide-camera"><path d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"/><circle cx="12" cy="13" r="3"/></svg> Сделать снимок`;
      captureBtn.style.cssText = `
      background: #007AFF;
      color: white;
      border: none;
      padding: 15px 20px;
      border-radius: 8px;
      font-size: 16px;
      cursor: pointer;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 8px;
    `;

      const cleanup = () => {
        stream.getTracks().forEach((track) => track.stop());
        cameraContainer.remove();
        setIsPhotoLoading(false);
      };

      captureBtn.onclick = () => {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");

        // Отзеркаливаем по горизонтали
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        setPhotoUrl(canvas.toDataURL("image/jpeg", 0.8));
        cleanup();
        setShowPhotoMenu(false);
        message.success("Фото сделано!");
      };

      cancelBtn.onclick = cleanup;

      buttonContainer.appendChild(cancelBtn);
      buttonContainer.appendChild(captureBtn);
      cameraContainer.appendChild(video);
      cameraContainer.appendChild(buttonContainer);

      await new Promise((resolve, reject) => {
        video.onloadedmetadata = () => video.play().then(resolve).catch(reject);
        setTimeout(() => reject(new Error("Timeout")), 10000);
      });

      document.body.appendChild(cameraContainer);
      setIsPhotoLoading(false);
      setShowPhotoMenu(false);
    } catch (err) {
      console.error("Ошибка доступа к камере:", err);
      setIsPhotoLoading(false);
      message.error("Ошибка доступа к камере");
      setShowPhotoMenu(false);
    }
  };

  const handleChooseFromGallery = () => {
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
      message.error("Ошибка загрузки изображения");
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
        paddingBottom: "20px", // Уменьшили отступ снизу, так как кнопки теперь нативные
        filter: showPhotoMenu ? "blur(2.5px)" : "none",
        transition: "filter 0.3s ease",
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
        <div>
          {isPhotoLoading ? (
            <div
              onClick={handleAvatarClick}
              style={{
                width: "120px",
                height: "120px",
                borderRadius: "50%",
                backgroundColor: "#f0f0f0",
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
              }}
            >
              <Spin size="large" />
            </div>
          ) : photoUrl ? (
            <img
             onClick={handleAvatarClick}
              src={photoUrl}
              alt="profile"
              style={{
                width: "130px",
                height: "130px",
                borderRadius: "50%",
                objectFit: "cover",
                margin: "0 auto",
                display: "block",
                cursor: "pointer"
              }}
            />
          ) : (
            <div
             onClick={handleAvatarClick}
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
                cursor: "pointer"
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
        style={{ display: "none" }}
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
    </div>
  );
};

export default ProfileComponent;