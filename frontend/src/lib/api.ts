import { useMutation, useQuery } from "@tanstack/react-query";
import customAxios from "../config/http";
import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;

export interface User {
  id: number;
  name: string;
  email: string;
  // role: number;
  email_verified_at: string | null;
  createdAt: string;
  updatedAt: string;
  // photo_url: string;
}

export interface LoginResponse {
  token: string;
  token_type: string;
  expires_in: number;
}

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

export const signUp = async (
  name: string,
  email: string,
  password: string,
  password_confirmation: string
): Promise<unknown> => {
  const response = await axios.post(baseURL + "/register", {
    name,
    email,
    password,
    password_confirmation,
  });
  if (response.status !== 200) {
    throw new Error("Invalid credentials");
  }
  return response.data;
};

export const getUser = async (): Promise<User> => {
  const response = await customAxios.get("/user");
  if (response.status !== 200) {
    throw new Error("Invalid credentials");
  }
  return response.data;
};

export const useGetUserQuery = () => {
  return useQuery<User>(["user"], getUser);
};

export const logOut = async (): Promise<void> => {
  localStorage.removeItem("token");
  const response = await customAxios.post("/logout");
  console.log(response);
};

export const changeSettings = async (
  name: string,
  email: string
): Promise<User> => {
  const response = await customAxios.patch("/settings/profile", {
    name,
    email,
  });
  return response.data;
};
export const useSettingsMutation = () => {
  return useMutation((credential: { name: string; email: string }) =>
    changeSettings(credential.name, credential.email)
  );
};
