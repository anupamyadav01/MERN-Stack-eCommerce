// Create an Axios instance
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080/api", // Set the base URL for all requests
  withCredentials: true, // Include credentials like cookies with cross-site requests
});

export default axiosInstance;
