'use server'

import { authOptions } from "@/app/constants/auth-options"
import { ResponseMessage } from "@/types";
import { customSession } from "@/types/user"
import { getServerSession } from "next-auth"

export default async function updateItem(
    id: string,
    addedPercentage: string | null,
    hidden: boolean
) : Promise<ResponseMessage> {
    try {
        
    const session = await getServerSession(authOptions) as customSession;

    const response = await fetch(process.env.BACKEND_URL + `/v1/admin/items/${id}?addedPercentage=${addedPercentage}&hidden=${hidden}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.token}`
        }
    })
    if(response.ok) {
        return ResponseMessage.SUCCESS
    }
    return ResponseMessage.ERROR
    }catch(error) {
        console.log(error)
        return ResponseMessage.ERROR
    }
    
}