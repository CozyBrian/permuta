import useAxiosAuth from "@/hooks/useAxiosAuth";
import axios from "@/lib/axios";
import {
  IAuthResponse,
  ICategory,
  IGetAllItemsResponse,
  IItem,
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
      category_id?: string;
    }) => {
      const data = params as any;

      for (let key in data) {
        if (data[key] === undefined) {
          delete data[key];
        }
      }

      const query = new URLSearchParams(
        data as Record<string, string>
      ).toString();
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
      const query = new URLSearchParams(
        params as Record<string, string>
      ).toString();
      return authAxios.get(`/v1/hostels?${query}`);
    },
  };

  return {
    items,
    category,
    hostels,
  };
};

export const userLogin = (loginPayload: ILoginPayload) => {
  return axios.post<IAuthResponse>("/v1/auth/login", loginPayload);
};

export const userRegister = (registerPayload: IRegisterPayload) => {
  return axios.post<IAuthResponse>("/v1/auth/signup", registerPayload);
};
