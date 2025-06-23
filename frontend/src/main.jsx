import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { PedidoProvider } from "./context/PedidoContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    
    
    <AuthProvider>
      <PedidoProvider>
      <App />
      </PedidoProvider>
    </AuthProvider>
  </StrictMode>
);
