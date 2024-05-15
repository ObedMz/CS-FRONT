'use server'

import { Item } from "@/types/items";
import getGlobalPercentage from "../get-global";

export default async function getSearchItems(search : String): Promise<Item[]> {
try {
    const global_percentage = await getGlobalPercentage();
    const response = await fetch(process.env.BACKEND_URL + `/v1/items/search?searchTerm=${search}`);
    if(!response.ok) return [];
    let data: Item[] = await response.json();
    data = data.map(item => {
        if (global_percentage > 0 || !item.modified || item.addedPercentage === null || item.addedPercentage === 0) {
            const modifiedPrice = item.price + (item.price * (global_percentage / 100));
            item.global_price = parseFloat(modifiedPrice.toFixed(2));
        }
        return item;
    });
    return data;
} catch (error) {
    console.error(error);
    return [];
}
}