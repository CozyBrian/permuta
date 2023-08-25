import useAxiosAuth from "@/hooks/useAxiosAuth";
import axios from "@/lib/axios";
import {
  IAuthResponse,
  IBid,
  ICategory,
  IGetAllHostelsResponse,
  IGetAllItemsResponse,
  IItem,
  IItemCreate,
  ILoginPayload,
  IRegisterPayload,
  IUser,
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
      auctions?: boolean;
      user_id?: string;
      auctionOpen?: boolean;
    }) => {
      const query = ObjectToQueryParams(params);
      return authAxios.get<IGetAllItemsResponse>(`/v1/items?${query}`);
    },

    getItemDetails: async (itemId: string) => {
      return authAxios.get<IItem>(`/v1/items/${itemId}/`);
    },
    postItem: async (item: IItemCreate) => {
      return authAxios.post<IItem>(`/v1/items/`, item);
    },
    postItemForm: async (item: FormData) => {
      return authAxios.post<IItem>(`/v1/items/`, item, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    },
  };

  const category = {
    getAllCategories: async () => {
      const { data } = await authAxios.get<ICategory[]>("/v1/categories/");
      return data;
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
    getActiveUserDetails: async () => {
      const { data } = await authAxios.get<IUser>("/v1/users/me");
      return data;
    },
    getIsUsernameValid: async (username: string) => {
      return authAxios
        .get<{
          exists: boolean;
        }>(`/v1/auth/isUsernameExists?username=${username}`)
        .then((res) => res.data);
    },
  };

  const bids = {
    getLatestAuctionBid: async (auction_id: string) => {
      const { data } = await authAxios.get<IBid>(`/v1/bids/${auction_id}`);
      return data;
    },
    getUserLatestAuctionBid: async (auction_id: string) => {
      const { data } = await authAxios.get<IBid>(`/v1/bids/${auction_id}/me`);
      return data;
    },
  };

  return {
    items,
    category,
    hostels,
    auth,
    bids,
  };
};

export const userLogin = (loginPayload: ILoginPayload) => {
  return axios.post<IAuthResponse>("/v1/auth/login", loginPayload);
};

export const userRegister = (registerPayload: IRegisterPayload) => {
  return axios.post<IAuthResponse>("/v1/auth/signup", registerPayload);
};
