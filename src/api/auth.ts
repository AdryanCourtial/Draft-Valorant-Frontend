// api/authApi.ts
import type { User } from "drafter-valorant-types";
import axiosClient from "../config/axios";

export const login = async (email: string, password: string): Promise<User> => {
  const res = await axiosClient.post(`/auth/login`, {
    email,
    password,
  });

  return {
    id: res.data.user.id,
    username: res.data.user.username,
    email: res.data.user.email,
    token: res.data.token,
  };
};
