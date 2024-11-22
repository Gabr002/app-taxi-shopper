import * as express from "express";
const router = express.Router();
import { atualizarStatus, estimateRides, listarCorridas } from '../controllers/corridacontroller';

router.post('/rides/estimate', estimateRides);
router.get('/rides', listarCorridas);
router.put('/rides/:id', atualizarStatus);

export default router;
