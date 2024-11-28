import mongoose from 'mongoose';

const CorridaSchema = new mongoose.Schema({
  origin: { type: String, required: true },
  destination: { type: String, required: true },
  status: { type: String, enum: ['pendente', 'em andamento', 'completa'], default: 'pendente' },
  distance: { type: String },
  estimatedTime: { type: String },
  driver_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver'},
});

const Corrida = mongoose.model('Corrida', CorridaSchema);

export default Corrida;
