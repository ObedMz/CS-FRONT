'use server'
import { authOptions } from "@/app/constants/auth-options";
import { SteamDTO } from "@/types";
import { customSession } from "@/types/user";
import { getServerSession } from "next-auth";

export default async function getSteam() : Promise<SteamDTO | null> {
     try {
        const session = await getServerSession(authOptions) as customSession;
    const res = await fetch(process.env.BACKEND_URL + "/v1/steam/info", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session.token}`
        }
    });
    if(!res.ok) return null
    const json: SteamDTO = await res.json();
    return json
     } catch (error) {
        console.log(error)
        return null
     }
}