import Axios, { AxiosInstance } from "axios";
import { notification } from "antd";
import { createContext, useContext } from "react";

const customAxios: AxiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

customAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("error:", error, error.response);
    if (error.response && error.response.status) {
      let errorMessage = error.response.data?.message || "Error";
      switch (error.response.status) {
        case 401:
        case 403:
          window.location.href = "/admin";
          localStorage.removeItem("token");
          break;
        case 404:
          notification.error({
            message: `Error ${error.response.status}: ${error.response.statusText}`,
            description: errorMessage,
          });
          break;
        default:
          notification.error({
            message: `Error ${error.response.status}: ${error.response.statusText}`,
            description: errorMessage,
          });
      }
    }
    return Promise.reject(error);
  }
);

export const AxiosContext = createContext<AxiosInstance>(
  new Proxy(customAxios, {
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

export default customAxios;
