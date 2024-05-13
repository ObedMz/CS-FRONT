'use client'
import { Item, Pageable } from "@/types/items";
import getItems from "@/helpers/get-items";
import { useInView } from "react-intersection-observer";
import { LoaderCircle } from "lucide-react";
import { useFilter } from "@/hooks/use-filter";
import { useEffect, useState } from "react";
import ItemComponent from "./inventory-item-comp";

export default function ItemList({data}: {data: Item[]}) {
    const [pageable, setPageable] = useState<Pageable>({page: 0, size: 54, sort: "price", order: "desc"});
    const [array, setArray] = useState<Item[]>(data);
    const [showSpinner, setShowSpinner] = useState<boolean>(true);
    const { filter } = useFilter();
    
    const [ref, inView] = useInView({threshold: 0.4});
    
    const fetchMoreItems = async (page: number, render: boolean) => {
        const new_pageable = {page, size: 54, sort: "price", order: "desc"}
        setPageable(new_pageable);
        const items = await getItems(pageable, { itemType: filter });
        if(items.length == 0)
            setShowSpinner(false);
        
        if(render) setArray(items);
        else setArray([...array, ...items]);
    }

    useEffect(() => {
        setShowSpinner(false);
        fetchMoreItems(0, true);
    }, [filter]);

    useEffect(() => {
        if (inView) {
            fetchMoreItems((pageable.page != null ? (pageable.page + 1) : 0), false);
        }
    }, [inView]);

            return (
        <>
        <section className="w-[98%] m-auto flex flex-wrap gap-3 items-center justify-center mb-6 min-h-[100vh]">
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

