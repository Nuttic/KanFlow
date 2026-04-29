import { createRoot } from "react-dom/client";
import App from "./app/App";
import "./styles/index.css";

import { client } from "./client/client.gen";
// 2. Настраиваем его ПЕРЕД рендером приложения
client.setConfig({
  baseURL: 'http://localhost:3000', // Адрес твоего NestJS
  withCredentials: true,             // Чтобы куки (refreshToken/sessionId) работали
});

createRoot(document.getElementById("root")!).render(<App />);