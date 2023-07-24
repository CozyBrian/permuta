import useAxiosAuth from "@/hooks/useAxiosAuth";
import axios from "@/lib/axios";
import {
  IAuthResponse,
  IGetAllItemsRespose,
  IItems,
  ILoginPayload,
  IRegisterPayload,
} from "@/types";

export const usePermuta = () => {
  const authAxios = useAxiosAuth();

  const items = {
    getAllItems: async (params: {
      search?: string;
      limit?: string | number;
      page?: string | number;
    }) => {
      const query = new URLSearchParams(
        params as Record<string, string>
      ).toString();
      return authAxios.get<IGetAllItemsRespose>(`/v1/items?${query}`);
    },
    getItemDetails: async (itemId: string) => {
      return authAxios.get<IItems>(`/v1/items/${itemId}/`);
    },
  };

  return {
    items,
  };
};

export const userLogin = (loginPayload: ILoginPayload) => {
  return axios.post<IAuthResponse>("/v1/auth/login", loginPayload);
};

export const userRegister = (registerPayload: IRegisterPayload) => {
  return axios.post<IAuthResponse>("/v1/auth/signup", registerPayload);
};
