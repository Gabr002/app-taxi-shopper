const mongoose = require('mongoose');

const TarefaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  descricao: { type: String },
  status: { type: String, enum: ['pendente', 'em andamento', 'completa'], default: 'pendente' }
});

const Tarefa = mongoose.model('Tarefa', TarefaSchema);
module.exports = Tarefa;
