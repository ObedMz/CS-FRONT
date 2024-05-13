'use server';

import { Item, Pageable } from "@/types/items";

export default async function getItems(pageable: Pageable, type: String | null) :  Promise<Item[]> {
    //If item type is not provided, return all items
    try {
    let itemType = ( type ) ? "&itemType=" + type : "";
    if(type?.toLowerCase() == "all") itemType = "";
    const { page = 0, size = 54, sort = "price", order = "desc" } = pageable;
    const response = await fetch(`${process.env.BACKEND_URL}/v1/items?page=${page}&size=${size}&sort=${sort}&order=${order}${itemType}`,
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store"
    }
    );
    if(!response.ok) return [];
    const data : Item[] = await response.json();
    return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}