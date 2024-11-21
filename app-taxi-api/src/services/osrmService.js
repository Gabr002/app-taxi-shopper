const axios = require('axios');

exports.calcularDistancia = async (origem, destino) => {
  const origemCoords = await obterCoordenadas(origem);
  const destinoCoords = await obterCoordenadas(destino);
  const url = `http://router.project-osrm.org/route/v1/driving/${origemCoords};${destinoCoords}?overview=false`;

  const response = await axios.get(url);
  if (response.data.code !== 'Ok') {
    throw new Error('Erro ao chamar a API do OSRM');
  }

  const rota = response.data.routes[0];
  return {
    distancia: rota.distance, // distância em metros
    duracao: rota.duration // duração em segundos
  };
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
