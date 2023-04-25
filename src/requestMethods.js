import axios from "axios";

const BASE_URL = "https://pet-shops-api.vercel.app/";


export const publicRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
