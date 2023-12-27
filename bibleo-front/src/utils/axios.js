import axios from "axios";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_API_BACK,
  withCredentials: false,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export { axiosClient as axios };
