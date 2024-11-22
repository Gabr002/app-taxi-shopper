import axios, { AxiosError } from 'axios';

export const calcularDistancia = async (origem, destino) => {
  try {
    
  // const origemCoords = await obterCoordenadas(origem);
  // const destinoCoords = await obterCoordenadas(destino);
  const url = process.env.GOOGLE_ROUTES_API_URL;

  const response = await axios.post(url, {
    "origin":{
    "location":{
      "latLng": origem
    }
  },
  "destination":{
    "location":{
      "latLng": destino
    }
  },
  "travelMode": "DRIVE",
  "routingPreference": "TRAFFIC_AWARE",
  "computeAlternativeRoutes": false,
  "routeModifiers": {
    "avoidTolls": false,
    "avoidHighways": false,
    "avoidFerries": false
  },
  "languageCode": "en-US",
  "units": "IMPERIAL"
  }, {
    headers: {
      "X-Goog-Api-Key": process.env.GOOGLE_API_KEY,
      "X-Goog-FieldMask": "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline"
    }
  });

  console.log(response.data);

  const rota = response.data.routes[0];
  return {
    distancia: rota.distanceMeters, // distância em metros
    duracao: rota.duration // duração em segundos
  };
  } catch (error) {
    if(axios.isAxiosError(error)){
      console.log(error.response);
    }
  }
};

async function obterCoordenadas(endereco) {
  const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(endereco)}&format=json&limit=1`;
  const response = await axios.get(url);
  if (response.data.length === 0) {
    throw new Error('Endereço não encontrado');
  }
  const { lat, lon } = response.data[0];
  return `${lon},${lat}`;
}
