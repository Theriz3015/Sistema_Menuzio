const API_URL = "https://menuzio.onrender.com";

export async function registrarUsuario(formData) {
  const resposta = await fetch(`${API_URL}/auth/registro`, {
    method: "POST",
    body: formData,
  });

  const dados = await resposta.json();

  if (!resposta.ok) throw new Error(dados.erro || dados.message);
  return dados;
}

export async function loginUsuario({ email, senha }) {
  const resposta = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });

  const dados = await resposta.json();
  console.log(dados);
  if (!resposta.ok) throw new Error(dados.erro || dados.message);
  return dados;
}
