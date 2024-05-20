import { FilterContext } from "@/contexts/filter-context";
import { useState } from "react";

export default function FilterProvider({ children }: any) {
    const [filter, setFilter] = useState<string | null>(null);
    return (
        <FilterContext.Provider value={{ filter, setFilter }}>
            {children}
        </FilterContext.Provider>
    );
}