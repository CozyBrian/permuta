import useAxiosAuth from "@/hooks/useAxiosAuth";
import axios from "@/lib/axios";
import {
  IAuthResponse,
  ICategory,
  IGetAllHostelsResponse,
  IGetAllItemsResponse,
  IItem,
  ILoginPayload,
  IRegisterPayload,
} from "@/types";
import { ObjectToQueryParams } from "@/utils";

export const usePermuta = () => {
  const authAxios = useAxiosAuth();

  const items = {
    getAllItems: async (params: {
      search?: string;
      limit?: string | number;
      page?: string | number;
      category_id?: string;
    }) => {
      const query = ObjectToQueryParams(params);
      return authAxios.get<IGetAllItemsResponse>(`/v1/items?${query}`);
    },

    getItemDetails: async (itemId: string) => {
      return authAxios.get<IItem>(`/v1/items/${itemId}/`);
    },
  };

  const category = {
    getAllCategories: async () => {
      return authAxios.get<ICategory[]>("/v1/categories/");
    },
  };

  const hostels = {
    getAllHostels: async (params: {
      search?: string;
      limit?: string | number;
      page?: string | number;
    }) => {
      const query = ObjectToQueryParams(params);
      return authAxios
        .get<IGetAllHostelsResponse>(`/v1/hostels?${query}`)
        .then((res) => res.data);
    },
  };

  const auth = {
    getIsUsernameValid: async (username: string) => {
      return authAxios
        .get<{
          exists: boolean;
        }>(`/v1/auth/isUsernameExists?username=${username}`)
        .then((res) => res.data);
    },
  };

  return {
    items,
    category,
    hostels,
    auth,
  };
};

export const userLogin = (loginPayload: ILoginPayload) => {
  return axios.post<IAuthResponse>("/v1/auth/login", loginPayload);
};

export const userRegister = (registerPayload: IRegisterPayload) => {
  return axios.post<IAuthResponse>("/v1/auth/signup", registerPayload);
};
