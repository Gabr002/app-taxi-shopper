import toast from 'react-hot-toast';
import api from '../utils/http-client'

export interface LatLng {
  lat: number;
  lng: number;
}

interface EstimateRideResquest {
  origin: LatLng,
  destination: LatLng
}

const estimateRide = async ({
  origin, destination
}:EstimateRideResquest) => {

  try {
    const response = await api.post('rides/estimate', {
      customer_id:'asdasdasdasd-asd13123',origin, destination
    })
    return response.data
    
  } catch (error) {
      if(error.response.status === 400){
        toast.error(error.response.data.message)
      }else{
        toast.error('Ocorreu um erro ao estimar o trajeto')
      }
  }
}

export default estimateRide;
