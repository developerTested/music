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