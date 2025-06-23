import background from "../../assets/bg-login.jpg";
import { useState } from "react";
import { toast } from "react-toastify";
import { registrarUsuario } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

export default function Registro() {
  const { login } = useAuth();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });
  const [foto, setFoto] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFotoChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 2 * 1024 * 1024) {
      toast.error("A imagem deve ter no máximo 2MB");
      e.target.value = null;
      setFoto(null);
      return;
    }
    setFoto(file);
  };

  const handleRegister = async () => {
    if (!form.nome || !form.email || !form.senha || !form.confirmarSenha) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    if (form.senha !== form.confirmarSenha) {
      toast.error("As senhas não coincidem");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("nome", form.nome);
      formData.append("email", form.email);
      formData.append("senha", form.senha);
      if (foto) {
        formData.append("foto", foto);
      }

      try {
        const resposta = await registrarUsuario(formData);
        login({ token: resposta.token, nome: resposta.nome, foto: resposta.foto});
        toast.success("Registro realizado com sucesso!");
        window.location.href = "/dashboard";
      } catch (err) {
        toast.error(err?.response?.data?.erro || "Erro ao registrar.");
      }
    } catch (err) {
      toast.error(err?.response?.data?.erro || "Erro ao registrar.");
    }
  };

  return (
    <div
      className="w-screen min-h-screen flex justify-center items-center bg-cover bg-center py-8 px-4"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="p-8 w-96 max-w-[90vw] bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Registro
        </h1>

        <div className="mb-4">
          <label
            htmlFor="nome"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Nome do Restaurante
          </label>
          <input
            id="nome"
            name="nome"
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            value={form.nome}
            onChange={handleChange}
            placeholder="Digite o nome do restaurante"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
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

        <div className="mb-4">
          <label
            htmlFor="senha"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
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

        <div className="mb-4">
          <label
            htmlFor="confirmarSenha"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Confirmar senha
          </label>
          <input
            id="confirmarSenha"
            name="confirmarSenha"
            type="password"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
            value={form.confirmarSenha}
            onChange={handleChange}
            placeholder="Confirme sua senha"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Foto de perfil (máx. 2MB)
          </label>

          <label
            htmlFor="foto"
            className="cursor-pointer inline-block bg-orange-600 hover:bg-orange-700 text-white font-medium py-2 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            Selecionar imagem
          </label>

          <input
            id="foto"
            name="foto"
            type="file"
            accept="image/*"
            onChange={handleFotoChange}
            className="hidden"
          />

          {foto && (
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600 mb-2">Pré-visualização:</p>
              <img
                src={URL.createObjectURL(foto)}
                alt="Pré-visualização da foto"
                className="w-24 h-24 object-cover rounded-full mx-auto shadow-md border"
              />
            </div>
          )}
        </div>

        <button
          className="w-full bg-orange-600 hover:bg-orange-700 text-white font-medium py-2.5 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          onClick={handleRegister}
        >
          Registrar
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">
          Já tem uma conta?{" "}
          <a
            href="/login"
            className="text-orange-600 hover:text-orange-800 hover:underline font-medium"
          >
            Faça login aqui
          </a>
        </p>
      </div>
    </div>
  );
}
