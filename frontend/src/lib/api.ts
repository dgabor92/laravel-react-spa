import customAxios from "../config/http";
import { ActionLog, LoginResponse, User, UserInfo } from "./interfaces";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export const logIn = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await axios.post(baseURL + "/login", {
    email,
    password,
  });
  return response.data;
};

export const getUser = async (): Promise<User> => {
  const response = await customAxios.get("/user");
  if (response.status !== 200) {
    throw new Error("Invalid credentials");
  }
  return response.data;
};

export const changeSettings = async (
  name: string,

  email: string
): Promise<User> => {
  const response = await customAxios.post("/updateProfile", {
    name,
    email,
  });
  return response.data;
};

export const logOut = async (): Promise<void> => {
  localStorage.removeItem("token");
  const response = await customAxios.post("/logout");
  console.log(response);
};

export const getUsers = async (): Promise<UserInfo[]> => {
  const response = await customAxios.get(`/getAllUsers`);
  if (!Array.isArray(response.data)) {
    throw new Error("Unexpected response data format");
  }
  return response.data;
};

export const getLogs = async (): Promise<ActionLog[]> => {
  const response = await customAxios.get(`/getAllLogs`);
  if (!Array.isArray(response.data)) {
    throw new Error("Unexpected response data format");
  }
  return response.data;
};
