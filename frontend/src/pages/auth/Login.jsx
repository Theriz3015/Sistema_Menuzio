// src/pages/Login.jsx
import background from '../../assets/bg-login.jpg';
import { useState } from 'react';
import logo from "../../assets/logo-menuzio-1.png";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { loginUsuario } from '../../services/authService'; 
import { useAuth } from '../../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', senha: '' });
  const navigate = useNavigate();
  const {login} = useAuth();
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async () => {
    try {
      const dados = await loginUsuario(form);
      login(dados);
      
      toast.success(`Login realizado com sucesso sob nome de ${dados.nome}!`);
      navigate("/dashboard");
    } catch (err) {
      toast.error(err.message || "Erro ao fazer login");
    }
  };

  return (
    <div
      className="w-screen h-screen flex justify-center items-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="p-8 w-96 flex flex-col items-center max-w-[90vw] bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl">
        
        {/* <img src={logo} className="w-30 m-4" /> */}
        
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Menuzio
        </h1>
        <h1 className="text-xl font-light mb-6 text-center text-gray-800">
          Seu pedido é uma ordem
        </h1>
        
        <div className="mb-4 w-full">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            value={form.email}
            onChange={handleChange}
            placeholder="Digite seu email"
          />
        </div>
        
        <div className="mb-6 w-full">
          <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-2">
            Senha
          </label>
          <input
            id="senha"
            name="senha"
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            value={form.senha}
            onChange={handleChange}
            placeholder="Digite sua senha"
          />
        </div>
        
        <button
          className="cursor-pointer w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          onClick={handleLogin}
        >
          Entrar
        </button>
        
        <p className="mt-4 text-sm text-center text-gray-600">
          Ainda não tem conta?{' '}
          <a 
            href="/registro" 
            className="text-orange-600 hover:text-orange-800 hover:underline font-medium"
          >
            Registre-se aqui
          </a>
        </p>
      </div>
    </div>
  );
}
