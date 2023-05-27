import Cookies from 'js-cookie';

export const setCookie = (key, value) => {
  Cookies.set(key, value, { expires: 365 }); // Define uma validade de 365 dias para o cookie
};

export const getCookie = (key) => {
  return Cookies.get(key);
};

export const removeCookie = (key) => {
  Cookies.remove(key);
};
