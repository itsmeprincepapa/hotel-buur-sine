// src/index.tsx
// Point d'entrée de l'application React : monte le composant racine <App />
// dans l'élément #root du fichier public/index.html.
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
