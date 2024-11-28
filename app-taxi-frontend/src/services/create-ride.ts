import toast from 'react-hot-toast';
import api from '../utils/http-client'

export interface LatLng {
  lat: number;
  lng: number;
}

export interface CreateRideRequest {
  customer_id: string;
  origin: LatLng;
  destination: LatLng;
  distance: number;
  estimatedTime: string;
  driver_id: string;
}

const createRide = async ({
  customer_id,
  origin,
  destination,
  distance,
  estimatedTime,
  driver_id
}: CreateRideRequest) => {
  try {
    const response = await api.post('ride/confirm', {
      customer_id,
      origin,
      destination,
      distance,
      estimatedTime,
      driver_id
    });

    return response.data;
  } catch (error) {
    if(error.response.status === 400){
      toast.error(error.response.data.message)
    }
    else{
      toast.error('Ocorreu um erro ao estimar o trajeto')
    }
  }
}

export default createRide;
