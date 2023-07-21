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
