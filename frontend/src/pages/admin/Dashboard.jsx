import React, { useState } from "react";
import {
  Package,
  Clock,
  CheckCircle,
  DollarSign,
  BarChart3,
  History,
  Settings,
  Trash2,
  LogOut,
  Plus
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";
import { usePedidos } from "../../context/PedidoContext"; // Importar o context
import { useNavigate } from "react-router-dom";

// Componente Sidebar
const Sidebar = ({ activeTab, setActiveTab, foto, nome, onLogout }) => {
  const menuItems = [
    { id: "pedidos", label: "Pedidos", icon: Package },
    { id: "delivery", label: "Delivery", icon: Clock },
    { id: "historico", label: "Histórico", icon: History },
    { id: "estatisticas", label: "Estatísticas", icon: BarChart3 },
  ];

  return (
    <div className="w-64 bg-gray-900 h-screen flex flex-col">
      {/* Logo e Nome */}
      <div className="p-6 border-b border-gray-700">
        <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
          {foto ? (
            <img 
              src={`${foto}`} 
              alt="Foto do usuário" 
              className="w-full h-full object-cover"
            />
          ) : (
            <Package size={40} className="text-white"/>
          )}
        </div>
        <h2 className="text-white text-center font-semibold">{nome}</h2>
      </div>

      {/* Menu Items e Logout */}
      <nav className="flex-1 flex flex-col p-4">
        {/* Itens do Menu Principal */}
        <div>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-lg mb-2 transition-colors ${
                  activeTab === item.id
                    ? "bg-orange-500 text-white"
                    : "text-orange-400 hover:bg-gray-800"
                }`}
              >
                <Icon size={20} />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Botão de Logout */}
        <div className="mt-auto">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 p-3 rounded-lg transition-colors text-red-400 hover:bg-red-900 hover:text-white"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </nav>

      {/* Bottom Icons */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex justify-center gap-4">
          <button className="flex flex-col place-items-center p-2 text-orange-400 hover:bg-gray-800 rounded">
            <Settings size={20} />
            <p className="text-[10px] text-gray-200">Config</p>
          </button>
          <button className="flex flex-col place-items-center p-2 text-orange-400 hover:bg-gray-800 rounded">
            <DollarSign size={20} />
            <p className="text-[10px] text-gray-200">Personalização</p>
          </button>
          <button className="flex flex-col place-items-center p-2 text-orange-400 hover:bg-gray-800 rounded">
            <Package size={20} />
            <p className="text-[10px] text-gray-200">Suporte</p>
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente Modal de Pedido
const OrderModal = ({ order, isOpen, onClose, onStatusChange, onDelete }) => {
  if (!isOpen) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case "fechado":
        return "bg-red-500";
      case "aberto":
        return "bg-green-500";
      case "pagamento":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "fechado":
        return "Fechado";
      case "aberto":
        return "Aberto";
      case "pagamento":
        return "Aguardando Pag.";
      default:
        return status;
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg max-w-md w-full mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-orange-500 text-white p-4 rounded-t-lg">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Pedido #{order.id}</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl"
            >
              ×
            </button>
          </div>
          <p className="text-orange-100">{order.mesa}</p>
        </div>

        <div className="p-6 max-h-96 overflow-y-auto">
          <h3 className="font-semibold mb-3 text-gray-800">Itens do Pedido:</h3>
          {order.itens && order.itens.map((item, index) => (
            <div
              key={index}
              className="flex justify-between py-2 border-b border-gray-200"
            >
              <span className="text-gray-700">{item.nome}</span>
              <span className="font-medium text-gray-900">
                {item.quantidade}x
              </span>
            </div>
          ))}

          <div className="mt-4 pt-4 border-t-2 border-gray-300">
            <div className="flex justify-between text-xl font-bold text-gray-800">
              <span>Total:</span>
              <span>R$ {order.valor_total?.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex">
          <div
            className={`${getStatusColor(
              order.status
            )} text-white p-4 w-1/2 text-center font-semibold flex items-center justify-center gap-2 cursor-pointer rounded-bl-lg`}
            onClick={() => {
              onStatusChange(order.id, order.status);
              onClose();
            }}
          >
            <div className="w-3 h-3 bg-white rounded-full"></div>
            {getStatusText(order.status)}
          </div>

          <button
            onClick={() => {
              onDelete(order.id);
              onClose();
            }}
            className="bg-red-600 hover:bg-red-700 text-white p-4 w-1/2 text-center font-semibold flex items-center justify-center gap-2 rounded-br-lg transition mouse-pointer"
          >
            <Trash2 size={18} />
            Apagar
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente do Card de Pedido
const OrderCard = ({ order, onStatusChange, onCardClick }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "fechado":
        return "bg-red-500";
      case "aberto":
        return "bg-green-500";
      case "pagamento":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "fechado":
        return "Fechado";
      case "aberto":
        return "Aberto";
      case "pagamento":
        return "Aguardando Pag.";
      default:
        return status;
    }
  };

  return (
    <div className="bg-gray-600 overflow-hidden h-80 flex flex-col cursor-pointer hover:shadow-lg transition-shadow">
      <div className="flex flex-row bg-orange-500 text-white p-3 font-bold text-center justify-between">
        <div className="">Pedido #{order.id}</div>
      </div>

      <div
        className="p-4 bg-gray-100 text-black flex-1 overflow-hidden"
        onClick={() => onCardClick(order)}
      >
        <div className="h-full overflow-hidden">
          {order.itens && order.itens.slice(0, 4).map((item, index) => (
            <div key={index} className="flex justify-between mb-1">
              <span className="text-sm truncate mr-2">{item.nome}</span>
              <span className="text-sm flex-shrink-0">{item.quantidade}x</span>
            </div>
          ))}
          {order.itens && order.itens.length > 4 && (
            <div className="text-sm text-gray-500 italic">
              +{order.itens.length - 4} itens...
            </div>
          )}
        </div>

        <div className="border-t border-gray-300 mt-3 pt-3">
          <div className="flex justify-between font-bold">
            <span>Total:</span>
            <span>R$ {order.valor_total?.toFixed(2)}</span>
          </div>
        </div>
      </div>

      <div
        className={`${getStatusColor(
          order.status
        )} text-white p-3 text-center font-semibold flex items-center justify-center gap-2 cursor-pointer`}
        onClick={(e) => {
          e.stopPropagation();
          onStatusChange(order.id, order.status);
        }}
      >
        <div className="w-3 h-3 bg-white rounded-full"></div>
        {getStatusText(order.status)}
      </div>
    </div>
  );
};

// Componente Principal
const Dashboard = () => {
  const { foto, nome, logout } = useAuth();
  const { pedidos, excluirPedido, atualizarStatus, gerarAleatorios } = usePedidos(); // Usar o context
  const [activeTab, setActiveTab] = useState("pedidos");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteOrder = async (orderId) => {
    await excluirPedido(orderId);
  };

  const handleStatusChange = async (orderId, currentStatus) => {
    const statusCycle = ["fechado", "aberto", "pagamento"];
    const currentIndex = statusCycle.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % statusCycle.length;
    const newStatus = statusCycle[nextIndex];
    
    await atualizarStatus(orderId, newStatus);
  };
  
  const handleCardClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const handleGerarPedidos = async () => {
    await gerarAleatorios(3); // Gerar 3 pedidos aleatórios
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-gray-800">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        foto={foto} 
        nome={nome} 
        onLogout={handleLogout} 
      />

      <div className="flex-1 p-6 overflow-auto">
        {activeTab === "pedidos" && (
          <div>
            {/* Header com botão para gerar pedidos */}
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-white text-2xl font-bold">Pedidos ({pedidos?.length || 0})</h1>
              <button
                onClick={handleGerarPedidos}
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
              >
                <Plus size={20} />
                Gerar Pedidos
              </button>
            </div>

            {/* Grid de pedidos */}
            {!pedidos || pedidos.length === 0 ? (
              <div className="flex items-center justify-center h-64">
                <div className="text-center text-white">
                  <Package size={64} className="mx-auto mb-4 text-orange-500" />
                  <h2 className="text-xl font-bold mb-2">Nenhum pedido encontrado</h2>
                  <p className="text-gray-400">Clique em "Gerar Pedidos" para criar alguns pedidos de exemplo</p>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-6 h-full">
                {pedidos && pedidos.map((order) => (
                  <div key={order.id} className="flex flex-col">
                    <div className="bg-gray-500 text-white p-2 text-center font-semibold rounded-t-lg">
                      {order.mesa}
                    </div>

                    <OrderCard
                      order={order}
                      onStatusChange={handleStatusChange}
                      onCardClick={handleCardClick}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === "delivery" && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-white">
              <Clock size={64} className="mx-auto mb-4 text-orange-500" />
              <h2 className="text-2xl font-bold mb-2">Delivery</h2>
              <p className="text-gray-400">Gerenciamento de entregas</p>
            </div>
          </div>
        )}

        {activeTab === "historico" && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-white">
              <History size={64} className="mx-auto mb-4 text-orange-500" />
              <h2 className="text-2xl font-bold mb-2">Histórico</h2>
              <p className="text-gray-400">Histórico de pedidos</p>
            </div>
          </div>
        )}

        {activeTab === "estatisticas" && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-white">
              <BarChart3 size={64} className="mx-auto mb-4 text-orange-500" />
              <h2 className="text-2xl font-bold mb-2">Estatísticas</h2>
              <p className="text-gray-400">Relatórios e análises</p>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onStatusChange={handleStatusChange}
          onDelete={handleDeleteOrder}
        />
      )}
    </div>
  );
};

export default Dashboard;