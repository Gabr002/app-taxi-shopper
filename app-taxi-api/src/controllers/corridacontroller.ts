import Corrida from '../models/corrida';
import Driver from '../models/drivers';
import { calculateDistance } from '../services/googlePlacesService';

export const estimateRides = async (req, res) => {
  const { customer_id, origin, destination } = req.body;

  try {

    if(!origin  || !destination){
      return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
    }

    if(origin.lat === destination.lat && origin.lng === destination.lng){
      return res.status(400).json({ message: 'Origem e destino não podem ser iguais' });
    }

    const calculate = await calculateDistance(origin, destination);

    if(calculate.status){
      const drivers = await Driver.find();
      const filteredDrivers = drivers.filter((driver) => {
        return (calculate.distance/1000) >= driver.minimum_km;
      })

      const options = filteredDrivers.map((driver) => {
        const { _id:id,name,description,vehicle,review,picture } = driver['_doc'];
        return {
          id,
          picture,
          name,
          description,
          vehicle,
          review,
          value: driver.rate * calculate.distance / 1000
        }
      })

      res.status(200).json({
        origin: calculate.origin,
        destination:calculate.destination,
        distance:calculate.distance,
        duration:calculate.duration,
        options,
        routeResponse:calculate.routeResponse
      });

    }else{
        res.status(400).json({
          message:"Rota indisponivel"
        });
    }

  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar corrida', error: error.message });
  }
};

export const listarCorridas = async (req, res) => {
  const corridas = await Corrida.find();
  res.status(200).json(corridas);
};

export const confirmRide = async (req, res) => {
  const { origin, destination, distance, estimatedTime, driver_id } = req.body;

  const newRide = await Corrida.create({
    status: 'em andamento',
    origin: origin,
    destination: destination,
    distance: distance,
    estimatedTime: estimatedTime,
    driver_id: driver_id,
  });

  res.status(200).json(newRide);
};
