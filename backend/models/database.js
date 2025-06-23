import mongoose from 'mongoose';

export async function connectDatabase() {
  const mongoUri = process.env.MONGO_URI;

  try {
    await mongoose.connect(mongoUri);
    console.log('✅ Conectado com sucesso ao banco MongoDB');
  } catch (error) {
    console.error('❌ Falha em conectar ao banco:', error);
    process.exit(1);
  }
}
