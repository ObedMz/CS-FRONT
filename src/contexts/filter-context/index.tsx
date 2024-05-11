import { FilterContextType } from "@/types";
import { createContext } from "react";

export const FilterContext = createContext<FilterContextType | null>(null)