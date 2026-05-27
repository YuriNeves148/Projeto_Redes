import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import Home from "../src/paginas/home";
import Cadastro from "./paginas/cadastro";
import Feed from "./paginas/feed";
import Perfil from "./paginas/perfil";
import Usuario from "./paginas/usuario";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/usuario/:nomeUsuario" element={<Usuario />} />
        <Route path="/perfil" element={<Perfil />} />{" "}
      </Routes>
    </HashRouter>
  </StrictMode>,
);
