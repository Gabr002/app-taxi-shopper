const Tarefa = require('../models/tarefa');

exports.criarTarefa = async (req, res) => {
  const { titulo, descricao } = req.body;
  const novaTarefa = new Tarefa({ titulo, descricao });
  await novaTarefa.save();
  res.status(201).json(novaTarefa);
};

exports.listarTarefas = async (req, res) => {
  const tarefas = await Tarefa.find();
  res.status(200).json(tarefas);
};

exports.atualizarTarefa = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const tarefaAtualizada = await Tarefa.findByIdAndUpdate(id, { status }, { new: true });
  res.status(200).json(tarefaAtualizada);
};
