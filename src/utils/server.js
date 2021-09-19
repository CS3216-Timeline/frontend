import axios from "axios";

// custom instance
const server = axios.create({
  // baseURL: "http://localhost:5000/api"
  baseURL: "https://cs3216-timeline.herokuapp.com/api"
})

export default server;
