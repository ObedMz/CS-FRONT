'use server'
import { authOptions } from "@/app/constants/auth-options";
import { ResponseMessage } from "@/types";
import { customSession } from "@/types/user";
import { getServerSession } from "next-auth";

export default async function updateItem(
  id: string,
  addedPercentage: string | null,
  hidden: boolean,
  price: number | null
): Promise<ResponseMessage> {
  try {
    const session = (await getServerSession(authOptions)) as customSession;

    let url = process.env.BACKEND_URL + `/v1/admin/items/${id}?addedPercentage=${addedPercentage}&hidden=${hidden}`;

    if (price !== null) {
      url += `&price=${price}`;
    }
    console.log(url)
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.token}`
      }
    });

    if (response.ok) {
      return ResponseMessage.SUCCESS;
    }
    
    return ResponseMessage.ERROR;
  } catch (error) {
    console.error(error);
    return ResponseMessage.ERROR;
  }
}
