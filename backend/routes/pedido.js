import { autenticarToken } from '../middlewares/auth.js';
import { Pedido } from '../models/pedido.js';
import express from 'express';

const router = express.Router();


router.get('/', autenticarToken, async (req, res) => {
  try {
    const pedidos = await Pedido.find({ usuario: req.userId });

    const resposta = pedidos.map(p => ({
      id: p._id,
      title: `Pedido #${p.numero}`,
      mesa: `Mesa ${p.mesa.toString().padStart(2, '0')}`,
      itens: p.itens.map(i => ({
        nome: i.nome,
        quantidade: i.quantidade
      })),
      valor_total: p.total,
      status: p.status
    }));

    res.json(resposta);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar pedidos', detalhe: err.message });
  }
});


router.delete('/:id', autenticarToken, async (req, res) => {
  try {
    const pedido = await Pedido.findOneAndDelete({ _id: req.params.id, usuario: req.userId });

    if (!pedido) return res.status(404).json({ erro: 'Pedido não encontrado' });

    res.json({ message: 'Pedido excluído com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao excluir pedido', detalhe: err.message });
  }
});

router.put('/:id/status', autenticarToken, async (req, res) => {
  const { status } = req.body;

  if (!['aberto', 'pagamento', 'fechado'].includes(status)) {
    return res.status(400).json({ erro: 'Status inválido' });
  }

  try {
    const pedido = await Pedido.findOneAndUpdate(
      { _id: req.params.id, usuario: req.userId },
      { status },
      { new: true }
    );

    if (!pedido) return res.status(404).json({ erro: 'Pedido não encontrado' });

    res.json({ message: 'Status atualizado com sucesso', pedido });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao atualizar status', detalhe: err.message });
  }
});

const itensBase = [
  { nome: 'Caldinho de Camarão', preco: 20 },
  { nome: 'Buchada de Bode', preco: 55 },
  { nome: 'Macaxeira com Charque', preco: 30 },
  { nome: 'Guaraná', preco: 6 },
  { nome: 'Caipirinha', preco: 15 }
];

// rota para gerar pedidos aleatórios (pra testar o menuzio)
router.post('/aleatorios', autenticarToken, async (req, res) => {
  const quantos = parseInt(req.query.qtd) || 1;

  try {
    const pedidos = [];

    for (let i = 0; i < quantos; i++) {
      const numero = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
      const mesa = Math.floor(Math.random() * 10) + 1;

      const qtdItens = Math.floor(Math.random() * 7) + 1;
      const itensSorteados = Array.from({ length: qtdItens }, () => {
        const item = itensBase[Math.floor(Math.random() * itensBase.length)];
        return {
          nome: item.nome,
          preco: item.preco,
          quantidade: Math.floor(Math.random() * 3) + 1
        };
      });

      const total = itensSorteados.reduce((acc, i) => acc + i.preco * i.quantidade, 0);

      const pedido = new Pedido({
        numero,
        mesa,
        itens: itensSorteados,
        total,
        status: 'aberto',
        usuario: req.userId
      });

      await pedido.save();
      pedidos.push(pedido);
    }

    res.status(201).json({ message: `${pedidos.length} pedidos criados com sucesso.`, pedidos });
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao criar pedidos aleatórios', detalhe: err.message });
  }
});

export default router;