'use server'

import { Item } from "@/types/items";

export default async function getSearchItems(search : String): Promise<Item[]> {
    const response = await fetch(process.env.BACKEND_URL + `/v1/items/search?searchTerm=${search}`);
    const data: Item[] = await response.json();
    return data;
}