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
  const response = await api.post('rides/estimate', {
    origin, destination
  })

  return response.data
}

export default estimateRide;
