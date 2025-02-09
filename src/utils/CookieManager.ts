import Cookies from "universal-cookie";

const cookies = new Cookies();

export const setToken = (token: string): void => {
  cookies.set("token", token, { path: "/" });
};


export const getToken = (): string | null => {
  return cookies.get("token") || null;
};


export const clearToken = (): void => {
  cookies.remove("token", { path: "/" });
};

