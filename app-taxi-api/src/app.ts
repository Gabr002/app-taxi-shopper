import * as express from "express";
const app = express();
import corridaRoutes from './routes/corridaRoutes';

app.use(express.json());
app.use('/api', corridaRoutes);

export default app;