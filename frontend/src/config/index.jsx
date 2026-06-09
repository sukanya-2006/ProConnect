
import axios from "axios";

export const BASE_URL = "https://proconnect-6tjm.onrender.com/";

export const clientServer = axios.create({
    baseURL: BASE_URL,
});