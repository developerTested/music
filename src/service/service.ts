import axios, { AxiosError } from "axios";
import type { AxiosInstance, AxiosRequestConfig } from "axios";

abstract class Service {
    protected client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: import.meta.env.VITE_BACKEND_URL || "/api",
            withCredentials: true,
            timeout: 60 * 1000, // 60 seconds
        });

        this.client.interceptors.response.use(
            function (response) {
                return response;
            },
            async (error: AxiosError) => {
                return Promise.reject(error);
            }
        );
    }

    private handleError(error: unknown): never {
        if (axios.isAxiosError(error)) {

            if (error.response) {
                const errorData = error.response.data;

                let errorMessage = "Something went wrong.";

                if (errorData?.errors) {
                    errorMessage = Array.isArray(errorData.errors)
                        ? errorData.errors.join(', ')
                        : String(errorData.errors);
                } else if (errorData?.message) {
                    errorMessage = String(errorData.message);
                } else if (typeof errorData === 'string') {
                    errorMessage = errorData;
                }

                console.error("API Error:", errorMessage);
                throw new Error(errorMessage);
            } else if (error.request) {
                console.error("Network Error: No response received");
                throw new Error("Network error occurred. Please check your connection.");
            } else {
                console.error("Axios Setup Error:", error.message);
                throw new Error(error.message || "An unexpected error occurred.");
            }
        }

        // Handle non-Axios errors
        if (error instanceof Error) {
            console.error("Generic Error:", error.message);
            throw error;
        }

        // Fallback for unknown error types
        console.error("Unknown Error Type:", error);
        throw new Error("An unexpected error occurred.");
    }

    /**
     * Performs a GET request.
     * @throws Error if the request fails.
     */
    protected async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.client.get<T>(url, config);
            return response.data;
        } catch (error) {
            return this.handleError(error);
        }
    }

    protected async post<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.client.post<T>(url, data, config);
            return response.data;
        } catch (error) {
            return this.handleError(error);
        }
    }

    protected async put<T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.client.put<T>(url, data, config);
            return response.data;
        } catch (error) {
            return this.handleError(error);
        }
    }

    protected async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
        try {
            const response = await this.client.delete<T>(url, config);
            return response.data;
        } catch (error) {
            return this.handleError(error);
        }
    }
}

export default Service;