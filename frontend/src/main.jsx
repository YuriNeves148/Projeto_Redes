import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../src/paginas/home";
import Home from "../src/paginas/home";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Home />
  </StrictMode>,
);
