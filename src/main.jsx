import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SDKProvider } from "@twa-dev/sdk/react";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SDKProvider>
      <App />
    </SDKProvider>
  </StrictMode>
);
