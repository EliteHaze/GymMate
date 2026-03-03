import axios from "axios";

const api = axios.create({
  baseURL: "https://gymmate-backend-dkgv.onrender.com/exercises",
});

export default api;
