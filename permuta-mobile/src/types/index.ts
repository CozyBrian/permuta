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
  hostel_id: string;
  gender?: "MALE" | "FEMALE" | "OTHER";
};

export type IUser = {
  id: string;
  username: string;
  email: string;
  full_name: string;
  phone_number: string;
  image_url: null | string;
  created_at: Date;
  updated_at: Date;
  hostel_id: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  hostel: IHostel;
};

export type IItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string | null;
  category_id: string;
  seller_id: string;
  created_at: Date | string;
  updated_at: Date | string;
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
  auctions: {
    id: string;
    item_id: string;
    seller_id: string;
    starting_price: number;
    start_time: Date | string;
    end_time: Date | string;
    status: "OPEN" | "CLOSE";
  };
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

export type IItemCreate = {
  name: string;
  description: string;
  price: number | string;
  category_id: string;
  seller_id: string;
  condition: "NEW" | "SLIGHTLY_USED" | "USED";
  image_url?: string | null | undefined;
  status?: "INSTOCK" | "OUT_OF_STOCK" | "UNAVAILABLE" | undefined;
  auction: IAuctionCreate;
};

export type IAuctionCreate = {
  seller_id: string;
  item_id: string;
  starting_price: number | string;
  start_time: Date;
  end_time: Date;
  status?: "OPEN" | "CLOSE" | undefined;
};
