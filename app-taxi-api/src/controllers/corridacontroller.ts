import Corrida from '../models/corrida';
import { calculateDistance } from '../services/googlePlacesService';

export const estimateRides = async (req, res) => {
  const { origin, destination } = req.body;

  try {
    const { distance, duration } = await calculateDistance(origin, destination);
    
    res.status(200).json({ distance, duration });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar corrida', error: error.message });
  }
};

export const listarCorridas = async (req, res) => {
  const corridas = await Corrida.find();
  res.status(200).json(corridas);
};

export const atualizarStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const corridaAtualizada = await Corrida.findByIdAndUpdate(id, { status }, { new: true });
  res.status(200).json(corridaAtualizada);
};