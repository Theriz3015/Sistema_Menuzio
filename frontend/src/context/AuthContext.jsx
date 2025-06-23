import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [nome, setNome] = useState(null);
  const [foto, setFoto] = useState(null); // novo estado para foto base64

  useEffect(() => {
    const tokenSalvo = localStorage.getItem("token");
    const nomeSalvo = localStorage.getItem("nome");
    const fotoSalva = localStorage.getItem("foto"); // pega foto do localStorage
    if (tokenSalvo && nomeSalvo) {
      setToken(tokenSalvo);
      setNome(nomeSalvo);
      setFoto(fotoSalva);
    }
  }, []);

  const login = ({ token, nome, foto }) => {
    localStorage.setItem("token", token);
    localStorage.setItem("nome", nome);
    if (foto) {
      localStorage.setItem("foto", foto);
      setFoto(foto);
    }
    setToken(token);
    setNome(nome);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("nome");
    localStorage.removeItem("foto");
    setToken(null);
    setNome(null);
    setFoto(null);
  };

  return (
    <AuthContext.Provider value={{ token, nome, foto, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
