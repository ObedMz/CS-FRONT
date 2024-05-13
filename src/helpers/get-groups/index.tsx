'use server'

import { GroupedItem } from "@/types/items";

export default async function getGroups(): Promise<GroupedItem[]> {
    
    try {
        const response = await fetch(process.env.BACKEND_URL + "/v1/items/types", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            cache: "no-store",
        });
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        const data: GroupedItem[] = await response.json();
        return data;
    } catch (error) {
        console.error(error);
        return [];
    }
}