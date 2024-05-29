import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { camelize, getCurrentInstance, toHandlerKey } from "vue";
import { push } from "notivue";
import type { Error } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleSuccess = (title: string, message: string) => {
  push.success({
    title,
    message,
  });
};
export const handleError = (err: any) => {
  const error = err.response.data as Error;
  push.error({
    title: error.statusCode.toString(),
    message: error.message,
  });
};
export function getLocalStorageData<T>(key: string, verifyData?: boolean) {
  const data = window.localStorage.getItem(key);
  if (verifyData) {
    if (localStorage.getItem("currentAuthTokens")) {
      const tokensContent = JSON.parse(
        localStorage.getItem("currentAuthTokens") || "{}"
      );
      const isExpired = isTokenExpired(tokensContent.accessToken);
      console.log(isExpired, "IS_EXPIRED");
      if (isExpired) return null as T;
    } else {
      return null as T;
    }
  }
  if (data) {
    console.log(data);

    return JSON.parse(data) as T;
  }
  return null as T;
}
// isUserLoggedIn function should not be async if it doesn't perform asynchronous operations
export const isUserLoggedIn = () => {
  if (
    localStorage.getItem("currentUserContent") &&
    localStorage.getItem("currentAuthTokens")
  ) {
    const tokensContent = JSON.parse(
      localStorage.getItem("currentAuthTokens") || "{}"
    );
    return !isTokenExpired(tokensContent.accessToken);
  }
  return false;
};

// Check token expiration
export const isTokenExpired = (token: string) =>
  Date.now() >= JSON.parse(atob(token.split(".")[1])).exp * 1000;
