'use server';

import { Item, Pageable } from "@/types/items";
import getGlobalPercentage from "../get-global";

export default async function getItems(pageable: Pageable, type: String | null) :  Promise<Item[]> {
    //If item type is not provided, return all items
    try {
   
    const { page = 0, size = 54, sort = "price", order = "desc" } = pageable;
    const URL = (type && type != "all") ? `/v1/items/filter?group=${type}` : `/v1/items?page=${page}&size=${size}&sort=${sort}&order=${order}`;
    const response = await fetch(process.env.BACKEND_URL + URL,
    {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        cache: "no-store"
    }
    );
    const global_percentage = await getGlobalPercentage();
    if(!response.ok) return [];
    let data : Item[] = await response.json();
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