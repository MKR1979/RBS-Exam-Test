import axios from "axios";

export default axios.create({
   baseURL: "http://localhost:14493/api",
  headers: {
    "Content-type": "application/json"
  }
});
