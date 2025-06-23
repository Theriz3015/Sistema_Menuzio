import jwt from 'jsonwebtoken';

export function autenticarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Espera: Bearer <token>

  if (!token) return res.status(401).json({ erro: 'Token não fornecido' });

  const secret = process.env.JWT_SECRET;
  if (!secret) return res.status(500).json({ erro: 'JWT_SECRET não configurado' });

  jwt.verify(token, secret, (err, payload) => {
    if (err) return res.status(403).json({ erro: 'Token inválido ou expirado' });

    req.userId = payload.id; // você pode passar mais dados no token se quiser
    next();
  });
}
