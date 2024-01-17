import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_BACK,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosClient.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("spring_token");
    if (token) {
      config.headers.authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export { axiosClient as axios };
