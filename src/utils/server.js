import axios from "axios";

// custom instance
const server = axios.create({baseURL: "https://cs3216-timeline.herokuapp.com"})

export default server;
