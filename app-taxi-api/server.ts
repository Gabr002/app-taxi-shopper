import 'dotenv/config';
import mongoose from 'mongoose';
import app from './src/app';

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("conectado ao mongoDB");
  })
  .catch(err => console.error(err));

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});