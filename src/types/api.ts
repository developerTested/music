import type { UserType } from "./auth.type"

export type ApiResponse<T = unknown> = {
    success: boolean,
    message: string,
    data: T,
}

export type ApiError = {
    success: boolean,
    message: string,
    data: null,
    errors: unknown,
}

export type ToastResponseType<T = unknown> = {
    data: ApiResponse<T>,
}

export type ToastErrorType = {
    data: ApiError,
}

export type LoginResponseType = {
    user: UserType,
}