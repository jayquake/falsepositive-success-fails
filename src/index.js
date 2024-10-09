import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ModalProvider } from "./components/util/ModalContext"; // Import the ModalProvider

const rootElement = document.getElementById("root");
const root = createRoot(rootElement); // Create a root with createRoot

root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    {" "}
    {/* Add basename here */}
    <ModalProvider>
      <App />
    </ModalProvider>
  </BrowserRouter>
);
