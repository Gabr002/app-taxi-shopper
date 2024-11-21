const Corrida = require('../models/corrida');
const { calcularDistancia } = require('../services/osrmService');

exports.criarCorrida = async (req, res) => {
  const { origem, destino } = req.body;

  try {
    const { distancia, duracao } = await calcularDistancia(origem, destino);
    
    const novaCorrida = new Corrida({ origem, destino, distancia, tempoEstimado: duracao });
    await novaCorrida.save();
    res.status(201).json(novaCorrida);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar corrida', error: error.message });
  }
};

exports.listarCorridas = async (req, res) => {
  const corridas = await Corrida.find();
  res.status(200).json(corridas);
};

exports.atualizarStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const corridaAtualizada = await Corrida.findByIdAndUpdate(id, { status }, { new: true });
  res.status(200).json(corridaAtualizada);
};
