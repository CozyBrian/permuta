import axios from "@/lib/axios";
import { IAuthResponse, ILoginPayload, IRegisterPayload } from "@/types";

export const usePermuta = () => {};

export const userLogin = (loginPayload: ILoginPayload) => {
  return axios.post<IAuthResponse>("/v1/auth/login", loginPayload);
};

export const userRegister = (registerPayload: IRegisterPayload) => {
  return axios.post<IAuthResponse>("/v1/auth/register", registerPayload);
};
