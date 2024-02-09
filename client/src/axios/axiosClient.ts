import axios from 'axios'

const BASE_URL = process.env.REACT_APP_API_BASE_URL as string

const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/v1/`,
  headers: { 'Content-type': 'application/json' },
  withCredentials: true
})

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    return Promise.reject(error)
  }
)

export const axiosClient = {
  get: axiosInstance.get,
  post: axiosInstance.post,
  put: axiosInstance.put,
  delete: axiosInstance.delete
}
