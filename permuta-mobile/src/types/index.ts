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

export type IItem = {
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

export type ICategory = {
  id: string;
  name: string;
  description: string;
};

export type IHostel = {
  id: string;
  name: string;
  location: string;
};

export type IItemsMin = Pick<
  IItem,
  "id" | "name" | "price" | "image_url" | "seller" | "auctions" | "category_id"
>;

type GetAll<T> = {
  items: T[];
  limit: number;
  page: number;
};

type GetAllExtended<T> = GetAll<T> & {
  total: number;
  totalPages: number;
  nextPage: number | string;
  prevPage: number | string;
};

export type IGetAllItemsResponse = GetAllExtended<IItemsMin>;

export type IGetAllHostelsResponse = GetAllExtended<IHostel>;
