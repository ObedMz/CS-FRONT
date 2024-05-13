'use server'

import { Item } from "@/types/items";

export default async function getSearchItems(search : String): Promise<Item[]> {
try {
    const response = await fetch(process.env.BACKEND_URL + `/v1/items/search?searchTerm=${search}`);
    if(!response.ok) return [];
    const data: Item[] = await response.json();
    return data;
} catch (error) {
    console.error(error);
    return [];
}
}