import axios from 'axios'

const axiosClient = axios.create({
  baseURL: '/api',
  withCredentials: true,
})

export default axiosClient
