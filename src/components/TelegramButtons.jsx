// components/TelegramButtons.jsx
import React, { useEffect } from 'react';
import { BackButton, MainButton } from '@twa-dev/sdk/react';

const TelegramButtons = ({
  onNext,
  onBack,
  nextButtonText = "Далее",
  showBackButton = false,
  isNextEnabled = true
}) => {
  useEffect(() => {
    // Настройка MainButton
    MainButton.setText(nextButtonText);
    MainButton.enable();
    MainButton.show();
    
    if (!isNextEnabled) {
      MainButton.disable();
    }

    // Настройка BackButton
    if (showBackButton) {
      BackButton.show();
    } else {
      BackButton.hide();
    }

    // Очистка при размонтировании
    return () => {
      MainButton.hide();
      BackButton.hide();
      
      // Удаляем предыдущие обработчики
      MainButton.offClick(onNext);
      BackButton.offClick(onBack);
    };
  }, [showBackButton, nextButtonText, isNextEnabled, onNext, onBack]);

  useEffect(() => {
    // Добавляем обработчики
    MainButton.onClick(onNext);
    if (showBackButton) {
      BackButton.onClick(onBack);
    }

    return () => {
      // Удаляем обработчики при изменении пропсов
      MainButton.offClick(onNext);
      BackButton.offClick(onBack);
    };
  }, [onNext, onBack, showBackButton]);

  return null; // Этот компонент не рендерит DOM-элементы
};

export default TelegramButtons;