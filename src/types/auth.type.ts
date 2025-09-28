export type UserType = {
    _id: string,
    username: string,
    fullName: string,
    email: string,
    password: string,
    avatar?: string,
    refreshToken?: string,
    role: RoleType,
    createdAt: Date,
    updatedAt: Date,
}

export type RoleType = "ADMIN" | "USER"