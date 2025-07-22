import axios from "@/lib/api";
import {
  LoginRequest,
  LoginResponse,
  SignupRequest,
  SignupResponse,
} from "@/types/AuthTypes";

const TEAM = "16-4";

export const userRegister = (data: SignupRequest): Promise<SignupResponse> => {
  return axios.post(`/${TEAM}/auth/signUp`, data);
};

export const userLogin = (data: LoginRequest): Promise<LoginResponse> => {
  return axios.post(`/${TEAM}/auth/signIn`, data);
};
