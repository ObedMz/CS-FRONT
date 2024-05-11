'use server';

import { Item, Pageable } from "@/types/items";

export default async function getItems(pageable: Pageable = {}, p0?: { itemType: string; }) {
    //If item type is not provided, return all items
    let itemType = ( p0 && p0.itemType ) ? "&itemType=" + p0.itemType : "";
    if(p0?.itemType.toLowerCase() === "all") itemType = ""; 
    const { page = 0, size = 54, sort = "price", order = "desc" } = pageable;
    const response = await fetch(`${process.env.BACKEND_URL}/v1/items?page=${page}&size=${size}&sort=${sort}&order=${order}${itemType}`);
    const url = response.url;
    const data : Item[] = await response.json();
    console.log(url);
    console.log(data)
    return data;
}