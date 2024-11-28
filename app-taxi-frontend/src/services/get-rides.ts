import toast from 'react-hot-toast';
import api from '../utils/http-client'

export interface LatLng {
  lat: number;
  lng: number;
}

const getRides = async (customer_id: string) => {
  try {
    const response = await api.get(`rides?customer_id=${customer_id}`)

    return response.data    
  } catch (error) {
    if(error.response.status === 400){
      toast.error(error.response.data.message)
    }
    else{
      toast.error('Ocorreu um erro ao estimar o trajeto')
    }
  }
}

export default getRides;
