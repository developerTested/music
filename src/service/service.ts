import axios from "axios";
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

abstract class Service {
    protected client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: import.meta.env.VITE_BACKEND_URL || "/api",
            withCredentials: true,
            timeout: 60 * 1000, // 60 seconds
        });

        this.client.interceptors.response.use(function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
        }, async (error) => {
            if (error?.response?.data) {
                return Promise.reject(error?.response?.data)
            }

            return Promise.reject(error?.message);
        });
    }

    private handleError(error: any): Error {
        if (error.response?.data?.errors) {
            console.error("API Error:", error.response.data.errors);
            throw new Error(error.response.data.errors || "Something went wrong.");
        } else if (error.response?.data?.message) {
            console.error("API Error:", error.response.data.message);
            throw new Error(error.response.data.message || "Something went wrong.");
        } else if (error.request) {
            console.error("Network Error:", error.message);
            throw new Error("Network error occurred. Please check your connection.");
        } else {
            console.error("Unexpected Axios Error:", error.message);
            throw new Error(error.message || "An unexpected error occurred.");
        }
    }

    /**
     * Performs a GET request.
     * @throws Error if the request fails.
     */
    protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        try {
            return await this.client.get<T>(url, config);
        } catch (error) {
            throw this.handleError(error);
        }
    }

    protected async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {

        try {
            return this.client.post<T>(url, data, config);
        } catch (error) {
            throw this.handleError(error);
        }
    }

    protected async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        try {
            return this.client.put<T>(url, data, config);
        } catch (error) {
            throw this.handleError(error);
        }
    }

    protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
        try {
            return this.client.delete<T>(url, config);
        } catch (error) {
            throw this.handleError(error);
        }
    }
}

export default Service;