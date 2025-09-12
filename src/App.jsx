import { useState, useEffect } from "react";
import "./App.css";
import DatingApp from "./components/DatingApp";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Имитация загрузки (можно заменить на реальную загрузку данных)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // 2 секунды загрузки

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="loading-screen">
          <div className="logo-container">
            <img
              src="/logo.png" // Укажите путь к вашему логотипу
              alt="Логотип"
              className="loading-logo"
            />
          </div>
        </div>
      ) : (
        <DatingApp />
      )}
    </>
  );
}

export default App;
