import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext"; // ou caminho relativo do seu AuthContext
import { toast } from "react-toastify";

const PedidoContext = createContext();

export function PedidoProvider({ children }) {
  const [pedidos, setPedidos] = useState([]);
  const { token, logout } = useAuth();

  const API_URL = "https://menuzio.onrender.com";

  // ✅ Verifica token e faz logout se inválido
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      logout();
      throw new Error("Usuário não autenticado.");
    }
    return {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };
  };

  const buscarPedidos = async () => {
    try {
      const resposta = await fetch(`${API_URL}/pedidos`, {
        headers: getAuthHeaders(),
      });

      if (!resposta.ok) {
        if (resposta.status === 401) logout();
        const erro = await resposta.json();
        throw new Error(erro.erro || "Erro ao buscar pedidos");
      }

      const dados = await resposta.json();
      setPedidos(dados);
    } catch (err) {
      toast.error(err.message);
    }
  };

  const excluirPedido = async (id) => {
    try {
      const resposta = await fetch(`${API_URL}/pedidos/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!resposta.ok) {
        if (resposta.status === 401) logout();
        const erro = await resposta.json();
        throw new Error(erro.erro || "Erro ao excluir pedido");
      }

      toast.success("Pedido excluído");
      buscarPedidos();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const atualizarStatus = async (id, status) => {
    try {
      const resposta = await fetch(`${API_URL}/pedidos/${id}/status`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ status }),
      });

      if (!resposta.ok) {
        if (resposta.status === 401) logout();
        const erro = await resposta.json();
        throw new Error(erro.erro || "Erro ao atualizar status");
      }

      toast.success("Status atualizado");
      buscarPedidos();
    } catch (err) {
      toast.error(err.message);
    }
  };

  const gerarAleatorios = async () => {
    try {
      const resposta = await fetch(`${API_URL}/pedidos/aleatorios`, {
        method: "POST",
        headers: getAuthHeaders(),
      });

      if (!resposta.ok) {
        if (resposta.status === 401) logout();
        const erro = await resposta.json();
        throw new Error(erro.erro || "Erro ao gerar pedidos");
      }

      toast.success("Pedidos aleatórios gerados");
      buscarPedidos();
    } catch (err) {
      toast.error(err.message);
    }
  };

useEffect(() => {
    if (token) {
      buscarPedidos();
    } else {
      setPedidos([]);
    }
  }, [token]);

  return (
    <PedidoContext.Provider
      value={{
        pedidos,
        buscarPedidos,
        excluirPedido,
        atualizarStatus,
        gerarAleatorios,
      }}
    >
      {children}
    </PedidoContext.Provider>
  );
}

export function usePedidos() {
  return useContext(PedidoContext);
}
