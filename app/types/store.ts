export type UserState = {
  isLogged: null | boolean;
  loginCheck: () => void;
  generateToken: () => string;
}