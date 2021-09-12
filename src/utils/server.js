import axios from "axios";

// custom instance
const server = axios.create({
  baseURL: "http://localhost:5000"
  // baseURL: "https://cs3216-timeline.herokuapp.com"
})

export default server;