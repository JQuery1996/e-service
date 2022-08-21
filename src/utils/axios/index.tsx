import axios from "axios";

// Get Base_Url From environment variables
const BASE_GATEWAY_URL = process.env.BASE_GATEWAY_URL;

export const getToken = () =>
    localStorage.getItem("token")
        ? JSON.parse(localStorage.getItem("token")!)
        : null;

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

export const ReactAxios = axios.create({
    baseURL: BASE_GATEWAY_URL,
    headers: { Authorization: getAuthorizationHeader() },
});

export const setToken = (AUTH_TOKEN: string) =>
    (axios.defaults.headers.common["Authorization"] = AUTH_TOKEN);
