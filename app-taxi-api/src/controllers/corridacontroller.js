const Corrida = require('../models/corrida');
const axios = require('axios');

exports.criarCorrida = async (req, res) => {
  const { origem, destino } = req.body;
  // Chamar API do Google Maps para calcular distância e tempo estimado
  const response = await axios.get(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origem}&destinations=${destino}&key=YOUR_GOOGLE_MAPS_API_KEY`);
  
  const { distance, duration } = response.data.rows[0].elements[0];
  const novaCorrida = new Corrida({ origem, destino, distancia: distance.value, tempoEstimado: duration.value });
  await novaCorrida.save();
  res.status(201).json(novaCorrida);
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
