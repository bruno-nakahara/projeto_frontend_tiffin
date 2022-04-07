import axios from 'axios';

//Criando axios com os parâmetros necessário para realizar a requisição
const axiosAPI = axios.create({
  baseURL: 'http://XXXX:3000/v1', //Colocar o ip da máquina no lugar do localhost, pois react native não reconhece localhost
  headers: {
    'Content-Type': 'application/json', //O corpo da requisição vai estar no formato JSON
  },
});

export default axiosAPI;
