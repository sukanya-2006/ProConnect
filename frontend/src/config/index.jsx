
// const {deafult : axios} =  require("axios");



// export const BASE_URL = "http://localhost:9090";

// export const clientServer = axios.create({
//     baseURL: BASE_URL,
// })

import axios from "axios";

export const BASE_URL = "http://localhost:9090";

export const clientServer = axios.create({
    baseURL: BASE_URL,
});