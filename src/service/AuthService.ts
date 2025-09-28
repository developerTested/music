import type { loginType, registerType } from "../schema/auth.schema";
import Service from "./service";

class AuthService extends Service {

    login = async (data: loginType) => {
        const { data: response } = await this.post("/users/login", data);
        return response;
    }

    register = async (data: registerType) => {
        const { data: response } = await this.post("/users/register", data);
        return response;
    }

    logout = async () => {
        const { data: response } = await this.post("/users/logout");
        return response;
    }

    currentUser = async () => {
        const { data: response } = await this.post("/users/currentUser");
        return response;
    }
}

const authService = new AuthService();

export default authService;