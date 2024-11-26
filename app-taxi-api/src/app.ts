import * as express from "express";
const app = express();
import corridaRoutes from './routes/corridaRoutes';
import * as cors from "cors"

app.use(cors())
app.use(express.json());
app.use('/api', corridaRoutes);

export default app;