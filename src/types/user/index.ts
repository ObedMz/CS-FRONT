import { DefaultSession, DefaultUser } from "next-auth";

export interface customUser extends DefaultUser {
    token: string
    user?: string
}
export interface customSession extends DefaultSession {
    token: string
}

export interface passwordRequest {
    username: string
    oldPassword: string
    newPassword: string
}