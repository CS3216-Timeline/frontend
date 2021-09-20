import axios from "axios";

const SERVER_BASE_URL = process.env.REACT_APP_SERVER_BASE_URL;

// custom instance
const server = axios.create({
  // baseURL: "http://localhost:5000/api"
  // baseURL: "https://cs3216-timeline.herokuapp.com/api"
  baseURL: SERVER_BASE_URL,
});

export default server;
