'use client'
import { Item } from "@/types/items";
import FilterProvider from "@/providers/filter-provider";
import ArrayComp from "./array-comp";
import NewSelectorComp from "./nav-comp-selector";

export default function RenderingComponent({data, searchParam}: {data: Item[], searchParam: string}) {

    return (
        <>
            <FilterProvider>
            <NewSelectorComp/>
            <br/>
            <ArrayComp data={data} searchParam={searchParam}/>
            </FilterProvider> 
        </> 
        );
}