import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Home from "../src/paginas/home";
import Cadastro from "./paginas/cadastro";
import Conversa from "./paginas/conversa";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/conversa" element={<Conversa />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
