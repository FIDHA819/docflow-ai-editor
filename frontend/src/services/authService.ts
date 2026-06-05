import api from "./api";

export interface LoginResponse {
  token: string;
  user?: {
    _id: string;
    email: string;
    name?: string;
  };
}

export const loginUser = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};