'use client'
import { Item, Pageable } from "@/types/items";
import getItems from "@/helpers/get-items";
import { useInView } from "react-intersection-observer";
import { LoaderCircle } from "lucide-react";
import { useFilter } from "@/hooks/use-filter";
import { useEffect, useState } from "react";
import ItemComponent from "./inventory-item-comp";

export default function ItemList({data, searchParam}: {data: Item[], searchParam: string}) {
    const [pageable, setPageable] = useState<Pageable>({page: 0, size: 54, sort: "price", order: "desc"});
    const [array, setArray] = useState<Item[]>(data);
    const [isOnFilter, setOnFilter] = useState<boolean>(false);
    const [showSpinner, setShowSpinner] = useState<boolean>(true);
    const { filter } = useFilter();
    
    const [ref, inView] = useInView();
    
    const fetchMoreItems = async (page: number, render: boolean) => {
        const new_pageable = {page, size: 54, sort: "price", order: "desc"}
        setPageable(new_pageable);
        const items = await getItems(new_pageable,filter);
        if(items.length == 0) {
            setShowSpinner(false);
            return;
        }
        
        if(render) setArray(items);
        else {
            const uniqueIds = new Set([...array.map(item => item.id), ...items.map(item => item.id)]);
            const newArray = [...array, ...items].filter(item => uniqueIds.has(item.id));
            setArray(newArray);
        }
    }
    useEffect(() => {
        setOnFilter(true);
        fetchMoreItems(0, true);
    }, [filter])
    useEffect(() => {
        if (inView && pageable.page !== undefined) {
            fetchMoreItems(pageable.page + 1, false);
        }
    }, [inView]);

            return (
        <>
        <section className="w-[98%] m-auto flex flex-wrap gap-3 items-center justify-center mb-6">
                    {array.map((item) => (
                    <ItemComponent key={item.id} item={item} edit={false} />
                    ))}
                </section>
                <div ref={ref} className="w-full p-5">
                {showSpinner && <LoaderCircle color="white" className="m-auto transition-all animate-spin"/>}
                </div> 
                </>
    
        );
}

