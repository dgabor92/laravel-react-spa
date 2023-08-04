import Axios, { AxiosInstance } from "axios";
import { notification } from "antd";
import { createContext, useContext } from "react";

const axios: AxiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("error:", error, error.response);
    if (error.response && error.response.status) {
      switch (error.response.status) {
        case 401:
          window.location.href = "/login";
          break;
        case 403:
          window.location.href = "/login";
          break;
        case 404:
          notification.error({
            message: `Error ${error.response.status}: ${error.response.statusText}`,
            description: error.response.data?.msg || "Error",
          });
          break;
        default:
          notification.error({
            message: `Error ${error.response.status}: ${error.response.statusText}`,
            description: error.response.data?.msg || "Error",
          });
      }
    }
    return Promise.reject(error);
  }
);

export const AxiosContext = createContext<AxiosInstance>(
  new Proxy(axios, {
    apply: () => {
      throw new Error("You must wrap you component in an AxiosProvider");
    },
    get: () => {
      throw new Error("You must wrap you component in an AxiosProvider");
    },
  })
);

export const useAxios = () => {
  return useContext(AxiosContext);
};

export default axios;
