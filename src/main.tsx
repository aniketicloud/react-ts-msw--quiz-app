import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { worker } from "./mocks/browser";
worker.start({
  onUnhandledRequest: ({ url }, { warning }) => {
    if (url.pathname === "/vite.svg" || url) {
      return;
    } else {
      warning();
    }
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
