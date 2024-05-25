export interface APIResponse<T> {
  message: string;
  statusCode: number;
  success: boolean;
  data: T;
}
export type Image = {
  url: string;
  localPath: string;
  _id: string;
};
export type User = {
  __v: number;
  _id: string;
  avatar: Image;
  createdAt: string;
  email: string;
  isEmailVerified: boolean;
  loginType: string;
  role: "USER" | "ADMIN";
  updatedAt: string;
  username: string;
};

export type Category = {
  __v: number;
  _id: string;
  createdAt: string;
  name: string;
  owner: string;
  updatedAt: string;
};
