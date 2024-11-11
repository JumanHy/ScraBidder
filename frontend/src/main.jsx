import { StrictMode } from "react";
import React from "react";
import App from "./App";
import { createRoot } from "react-dom/client";
import ReactDOM from 'react-dom';
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
