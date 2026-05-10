import { setCookie, getCookie, removeCookie } from "./cookieClient";

export const setAuthCookies = (login: string, token: string): void => {
  setCookie('login', login, { expires: 30 });
  setCookie('token', token, { expires: 30 });
};

export const getAuthCookies = (): { login: string | undefined, token: string | undefined } => {
  return {
    login: getCookie('login'),
    token: getCookie('token'),
  }
};

export const deleteAuthCookies = (): void => {
  removeCookie('login');
  removeCookie('token');
};