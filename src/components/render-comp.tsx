'use client'
import { Item } from "@/types/items";
import SelectorComp from "./selector-comp";
import FilterProvider from "@/providers/filter-provider";
import ArrayComp from "./array-comp";

export default function RenderingComponent({data}: {data: Item[]}) {

    return (
        <>
            <FilterProvider>
            <SelectorComp/>
            <br/>
            <ArrayComp data={data}/>
            </FilterProvider> 
        </> 
        );
}