import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import Principal from "../pages/Principal";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota inicial: se abrir o site, cai no Login */}
        <Route path="/" element={<Login />} />
        
        {/* Rota para a página de cadastro */}
        <Route path="/cadastro" element={<Cadastro />} />
        
        {/* Rota para a página principal */}
        <Route path="/principal" element={<Principal />} />
      </Routes>
    </BrowserRouter>
  );
}