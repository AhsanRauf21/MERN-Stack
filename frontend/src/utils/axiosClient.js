import axios from 'axios'

export const axiosClient = axios.create({
    baseURL:'https://mern-stack-api-seven.vercel.app/api/v1'
})
