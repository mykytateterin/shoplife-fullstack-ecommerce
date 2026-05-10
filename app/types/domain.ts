export type User = {
  password: string;
  token: string;
  isAdmin: boolean;
};

export type Users = Record<string, User>;

export type Category = {
  url: string;
};

export type Categories = Record<string, Category>;
