import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const BASE_URL = import.meta.env.VITE_BASE_API_URL;
console.log('BASE_URL: ', BASE_URL);

const apiClient = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

export const api = {
    get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
        const response: AxiosResponse<T> = await apiClient.get(url, config);
        return response.data;
    },

    post: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
        const response: AxiosResponse<T> = await apiClient.post(url, data, config);
        return response.data;
    },

    put: async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
        const response: AxiosResponse<T> = await apiClient.put(url, data, config);
        return response.data;
    },

    delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
        const response: AxiosResponse<T> = await apiClient.delete(url, config);
        return response.data;
    },
};
