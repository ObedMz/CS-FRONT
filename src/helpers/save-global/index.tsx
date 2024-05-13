'use server'

import { authOptions } from "@/app/constants/auth-options";
import { ResponseMessage } from "@/types";
import { customSession } from "@/types/user";
import { getServerSession } from "next-auth";

export default async function saveGlobalPercentage(percentage : number) : Promise<ResponseMessage> {
    try {
        const session = await getServerSession(authOptions) as customSession;
        const response = await fetch(process.env.BACKEND_URL + "/v1/admin/global?globalPercentage=" + percentage, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session.token}`,
            }
        });
        return (response.ok ? ResponseMessage.SUCCESS : ResponseMessage.ERROR);
    } catch (error) {
        console.error(error);
        return ResponseMessage.ERROR;
    }
}