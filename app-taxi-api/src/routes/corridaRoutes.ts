import * as express from "express";
const router = express.Router();
import { confirmRide, estimateRides, listarCorridas } from '../controllers/corridacontroller';

router.post('/rides/estimate', estimateRides);
router.get('/rides', listarCorridas);
router.post('/ride/confirm', confirmRide);

export default router;



