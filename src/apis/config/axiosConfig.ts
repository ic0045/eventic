import axios, { AxiosError } from 'axios';

// initializing the axios instance with custom configs
const api = axios.create({
  // adding a custom language header   
  headers: {},
  baseURL: 'http://localhost:3000'
});

const errorHandler = (error: AxiosError) => {
    const statusCode = error.response?.status
  
    if (statusCode && statusCode !== 401) {
      console.log('deu ruim')
    }
  
    return Promise.reject(error)
  }

api.interceptors.response.use(undefined, (error) => {
    return errorHandler(error);
})

export default api;