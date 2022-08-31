import axios from "axios";

// Get Base_Url From environment variables
const BASE_GATEWAY_URL = process.env.REACT_APP_BASE_GATEWAY_URL!;

// local Stoarge token from .env file
const LOCAL_STORAGE_TOKEN_ACCESS =
    process.env.REACT_APP_LOCAL_STORAGE_TOKEN_KEY!;

export const getToken = () =>
    localStorage.getItem(LOCAL_STORAGE_TOKEN_ACCESS)
        ? JSON.parse(localStorage.getItem(LOCAL_STORAGE_TOKEN_ACCESS)!)
        : null;

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

export const ReactAxios = axios.create({
    baseURL: BASE_GATEWAY_URL,
    headers: {
        "Content-Type": "application/json",
        Authorization: getAuthorizationHeader(),
    },
});

export const setToken = (AUTH_TOKEN: string) =>
    (axios.defaults.headers.common["Authorization"] = AUTH_TOKEN);

export default ReactAxios;
