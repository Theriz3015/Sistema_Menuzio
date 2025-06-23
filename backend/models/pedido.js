import mongoose from 'mongoose';

const itemSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  quantidade: { type: Number, required: true },
  preco: { type: Number, required: true },
}, { _id: false });

const pedidoSchema = new mongoose.Schema({
  numero: {
    type: String,
    required: true,
    unique: true
  },
  mesa: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['aberto', 'pagamento', 'fechado'],
    default: 'aberto'
  },
  itens: [itemSchema],
  total: {
    type: Number,
    required: true,
    default: 0
  },
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Middleware para calcular total antes de salvar
pedidoSchema.pre('save', function (next) {
  this.total = this.itens.reduce((acc, item) => acc + item.quantidade * item.preco, 0);
  next();
});

// Middleware para recalcular total ao atualizar itens
pedidoSchema.pre('findOneAndUpdate', async function (next) {
  const update = this.getUpdate();

  if (update.itens) {
    const itens = update.itens;
    const total = itens.reduce((acc, item) => acc + item.quantidade * item.preco, 0);
    this.setUpdate({ ...update, total });
  }

  next();
});

export const Pedido = mongoose.model('Pedido', pedidoSchema, 'pedidos');
