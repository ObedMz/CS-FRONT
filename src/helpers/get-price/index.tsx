import { Item } from "@/types/items";

export default function getPrice(item : Item): number  {
    if(item.modified) return parseFloat((item.custom_price||0).toFixed(2));
    
    if(item.addedPercentage != undefined && item.addedPercentage > 0){
        return parseFloat((item.price + (item.price * (item.addedPercentage / 100))).toFixed(2));
    }
    return parseFloat((item.global_price || 0).toFixed(2));
}