'use server'

import { authOptions } from "@/app/constants/auth-options"
import { ResponseMessage } from "@/types";
import { customSession } from "@/types/user"
import { getServerSession } from "next-auth"

export default async function updateAllKeys() : Promise<ResponseMessage> {
    const session = await getServerSession(authOptions) as customSession;
    try {
        const response = await fetch(process.env.BACKEND_URL + "/v1/admin/update", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.token}`
            },
            cache: "no-store"
        });
        return (response.ok ? ResponseMessage.SUCCESS : ResponseMessage.ERROR);
    } catch (error) {
        console.error(error);
        return ResponseMessage.ERROR
    }

}