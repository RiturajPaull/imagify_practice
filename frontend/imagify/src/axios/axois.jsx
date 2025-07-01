import axios from "axios";
import { baseURL } from "../Api/SummaryApi";

const API = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default API;
