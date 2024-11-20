const axios = require('axios');

exports.servicoExterno = async () => {
  const resposta = await axios.get('');
  return resposta.data;
};
