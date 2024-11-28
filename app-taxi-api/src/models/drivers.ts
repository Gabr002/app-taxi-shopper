import mongoose from 'mongoose';

const DriversSchema = new mongoose.Schema({
  id: { type: String, required: false },
  name: { type: String, required: true },
  picture: { type: String, required: true },
  description: { type: String, required: true },
  rate: { type: Number, required: true },
  vehicle: { type: String, required: true },
  minimum_km: { type: Number, required: true },
  review: { type: Object, required: true },
  
});

const Driver = mongoose.model('drivers', DriversSchema);

export default Driver;
