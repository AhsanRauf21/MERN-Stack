import axios from 'axios'

const url = import.meta.env.VITE_Backend_Url

export const axiosClient = axios.create({
    baseURL:`${url}/api/v1`
})
