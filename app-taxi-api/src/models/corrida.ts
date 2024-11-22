import mongoose from 'mongoose';

const CorridaSchema = new mongoose.Schema({
  origem: { type: String, required: true },
  destino: { type: String, required: true },
  status: { type: String, enum: ['pendente', 'em andamento', 'completa'], default: 'pendente' },
  distancia: { type: Number },
  tempoEstimado: { type: Number }
});

const Corrida = mongoose.model('Corrida', CorridaSchema);

export default Corrida;
