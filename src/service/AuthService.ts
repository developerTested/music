import type { loginType, registerType } from "../schema/auth.schema";
import Service from "./service";
import type { ApiResponse, LoginResponseType } from "@/types/api";

class AuthService extends Service {

    login = async (data: loginType) => {
        return await this.post<ApiResponse<LoginResponseType>>("/users/login", data);
    }

    register = async (data: registerType) => {
        return await this.post<ApiResponse>("/users/register", data);
    }

    logout = async () => {
        return await this.post<ApiResponse>("/users/logout");
    }

    currentUser = async () => {
        return await this.post<ApiResponse>("/users/currentUser");
    }
}

const authService = new AuthService();

export default authService;