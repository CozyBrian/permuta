export type ILoginPayload = {
  email: string;
  password: string;
};

export type IAuthResponse = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

export type IRegisterPayload = {
  full_name: string;
  username: string;
  email: string;
  password: string;
  phone_number: string;
  image_url: string | null;
};

export type IItems = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  category_id: string;
  seller_id: string;
  created_at: Date;
  updated_at: Date;
  condition: "NEW" | "USED" | "SLIGHTLY_USED";
  status: "INSTOCK" | "OUT_OF_STOCK" | "UNAVAILABLE";
  category: {
    name: string;
  };
  seller: {
    username: string;
    hostel: {
      name: string;
    };
  };
  auctions: null;
};

export type IItemsMin = Pick<
  IItems,
  "id" | "name" | "price" | "image_url" | "seller" | "auctions"
>;

export type IGetAllItemsRespose = {
  items: IItemsMin[];
  limit: number;
  page: number;
  total: number;
  totalPages: number;
  nextPage: number | string;
  prevPage: number | string;
};
