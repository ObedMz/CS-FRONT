'use client'
import { Item } from "@/types/items";
import SelectorComp from "./selector-comp";
import FilterProvider from "@/providers/filter-provider";
import ArrayComp from "./array-comp";

export default function RenderingComponent({data, searchParam}: {data: Item[], searchParam: string}) {

    return (
        <>
            <FilterProvider>
            <SelectorComp/>
            <br/>
            <ArrayComp data={data} searchParam={searchParam}/>
            </FilterProvider> 
        </> 
        );
}