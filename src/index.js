import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import { HashRouter } from "react-router-dom"; // Use HashRouter instead of BrowserRouter
import App from "./App";
import { ModalProvider } from "./components/util/ModalContext"; // Import the ModalProvider

const rootElement = document.getElementById("root");
const root = createRoot(rootElement); // Create a root with createRoot

root.render(
  <HashRouter>
    <ModalProvider>
      <App />
    </ModalProvider>
  </HashRouter>
);
