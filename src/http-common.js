import axios from "axios";

export default axios.create({
  baseURL: "http://44.201.1.54:8080/api",
  headers: {
    "Content-type": "application/json"
  }
});