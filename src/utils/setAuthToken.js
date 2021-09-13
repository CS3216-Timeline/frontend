import server from "./server";

const setAuthToken = (token) => {
  if (token) {
    server.defaults.headers.common["x-auth-token"] = token;
    localStorage.setItem("token", token);
  } else {
    delete server.defaults.headers.common["x-auth-token"];
    localStorage.removeItem("token");
  }
};

export default setAuthToken;
