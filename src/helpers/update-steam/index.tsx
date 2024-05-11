'use server'
import { authOptions } from "@/app/constants/auth-options"
import { ResponseMessage, SteamDTO } from "@/types";
import { customSession } from "@/types/user";
import { getServerSession } from "next-auth"

export default async function updateSteam(steamDTO: SteamDTO): Promise<ResponseMessage> {
    const session = await getServerSession(authOptions) as customSession;
    try {
        const response = await fetch(process.env.BACKEND_URL + "/v1/steam/update", {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${session.token}`
            },
            body: JSON.stringify(steamDTO)
        });
        return (response.ok ? ResponseMessage.SUCCESS : ResponseMessage.ERROR)
    } catch (error) {
        console.log(error)
        return ResponseMessage.ERROR
    }
}