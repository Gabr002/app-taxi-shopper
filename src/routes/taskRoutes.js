const express = require('express');
const router = express.Router();
const TarefaController = require('../controllers/tarefaController');

router.post('/tasks', TarefaController.criarTarefa);
router.get('/tasks', TarefaController.listarTarefas);
router.put('/tasks/:id', TarefaController.atualizarTarefa);

module.exports = router;
