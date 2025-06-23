import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import multer from "multer";
import User from "../models/user.js";

const router = express.Router();
const upload = multer();

router.post("/registro", upload.single("foto"), async (req, res) => {
  const { nome, email, senha } = req.body;

  if (!nome || !email || !senha) {
    return res
      .status(400)
      .json({ message: "Preencha todos os campos obrigatórios" });
  }

  if (!process.env.JWT_SECRET) {
    console.error("Erro: JWT_SECRET não está definido");
    return res.status(500).json({ erro: "Configuração interna do servidor, tente novamente." });
  }

  try {
    const userExistente = await User.findOne({ email });
    if (userExistente)
      return res.status(400).json({ erro: "Email já registrado." });

    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const novoUsuario = new User({
      nome,
      email,
      senha: senhaCriptografada,
      foto: req.file
        ? {
            data: req.file.buffer,
            contentType: req.file.mimetype,
          }
        : undefined,
    });

    await novoUsuario.save();

    const token = jwt.sign({ id: novoUsuario._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Preparar a foto para envio (base64)
    let fotoBase64 = null;
    if (novoUsuario.foto && novoUsuario.foto.data) {
      const buffer = novoUsuario.foto.data;
      const mimeType = novoUsuario.foto.contentType;
      fotoBase64 = `data:${mimeType};base64,${buffer.toString("base64")}`;
    }

    res.status(200).json({
      token: token,
      nome: novoUsuario.nome,
      foto: fotoBase64, // pode ser null se não enviou foto
    });
  } catch (err) {
    res.status(500).json({ erro: "Erro no registro", detalhe: err.message });
  }
});


// 📌 Login
router.post("/login", async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await User.findOne({ email });
    if (!usuario)
      return res.status(400).json({ erro: "Usuário não encontrado" });

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) return res.status(401).json({ erro: "Senha incorreta" });

    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Preparar a foto para envio (base64)
    let fotoBase64 = null;
    if (usuario.foto && usuario.foto.data) {
      const buffer = usuario.foto.data;
      const mimeType = usuario.foto.contentType;
      fotoBase64 = `data:${mimeType};base64,${buffer.toString("base64")}`;
    }

    res.json({
      token,
      nome: usuario.nome,
      foto: fotoBase64, // pode ser null se não tiver foto
    });
  } catch (err) {
    res.status(500).json({ erro: "Erro no login", detalhe: err.message });
  }
});

export default router;
