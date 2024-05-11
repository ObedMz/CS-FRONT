'use server'

import { authOptions } from "@/app/constants/auth-options";
import { ResponseMessage } from "@/types";
import { customSession, passwordRequest } from "@/types/user";
import { getServerSession } from "next-auth";
export default async function changePassword(passwordRequest : passwordRequest) : Promise<ResponseMessage> {
    try {
    const session = await getServerSession(authOptions) as customSession;
    if(!session) return ResponseMessage.ERROR;
    const response = await fetch(process.env.BACKEND_URL + "/auth/update-password", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.token}`
        },
        body: JSON.stringify(passwordRequest),
        cache: "no-store"
    });
    return (response.ok ? ResponseMessage.SUCCESS : ResponseMessage.ERROR);
    } catch (error) {
        return ResponseMessage.ERROR;
    }
}