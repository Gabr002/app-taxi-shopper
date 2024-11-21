const express = require('express');
const router = express.Router();
const CorridaController = require('../controllers/corridacontroller');

router.post('/rides', CorridaController.criarCorrida);
router.get('/rides', CorridaController.listarCorridas);
router.put('/rides/:id', CorridaController.atualizarStatus);

module.exports = router;
