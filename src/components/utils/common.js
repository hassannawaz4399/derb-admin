export const getUser = () => {
  //to return User Information

  const userStr = sessionStorage.getItem("user");

  if (userStr) return JSON.parse(userStr);
  else return null;
};

export const getUserId = () => {
  //to return User Informtation

  const userStr = sessionStorage.getItem("userId");
  if (userStr) return JSON.parse(userStr);
  else return null;
};

export const getToken = () => {
  //to return Token

  return sessionStorage.getItem("token") || null;
};

export const setUserSession = (user, token, userId, picture) => {
  //set user infromation in session storage

  sessionStorage.setItem("user", JSON.stringify(user));
  sessionStorage.setItem("token", token);
  sessionStorage.setItem("userId", userId);
  sessionStorage.setItem("userimage", picture);
};

export const removeUserSession = () => {
  sessionStorage.removeItem("user");
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("userId");
  sessionStorage.removeItem("userimage");
};
