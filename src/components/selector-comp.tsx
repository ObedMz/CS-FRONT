'use client'
import { options } from '@/app/constants/item-options';
import { useFilter } from '@/hooks/use-filter';
import { ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import {type Option} from '@/types';

export default function SelectorComp(): JSX.Element {
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const { filter, setFilter } = useFilter();
    const { refresh } = useRouter();

    const handleOptionClick = (option: Option) => {
        setSelectedOption(prevOption => prevOption === option ? null : option);
        if(option === "All"){
            setSelectedOption("All");
            updateUrlParams("All");
            refresh();
        }
    };
    const updateUrlParams = (subcategory: string) => {
        const queryParams = new URLSearchParams();
        if (selectedOption !== "All") {
            queryParams.set('itemType', encodeURIComponent(subcategory.toLowerCase()));
        } else {
            queryParams.delete('itemType');
        }

        const newUrl = queryParams.toString() ? `/?${queryParams.toString()}` : "/";
        window.history.pushState({}, '', selectedOption !== "All" ? newUrl : "/");
        setFilter(subcategory.toLowerCase());
    };

    const handleClick = (subcategory: string) => {
        updateUrlParams(subcategory);
    };

    return (
        <>
            <div className='text-white bg-[#1C1E25] w-[90%] m-auto rounded-sm overflow-y-auto'>
                <ul className='flex justify-evenly items-center'>
                    {Object.keys(options).map((option, index) => (
                        <li className='font-bold justify-center gap-2 cursor-pointer flex flex-grow items-center py-4 px-3 hover:bg-[#25272E]' key={index} onClick={() => handleOptionClick(option as Option)}>
                            {option}
                            {option !== "All" && <ChevronDown />}
                        </li>
                    ))}
                </ul>
            </div>
            {selectedOption && (
                <div className='overflow-y-auto text-white bg-[#1C1E25] w-[90%] m-auto rounded-sm text-center'>
                    <ul className='flex justify-evenly items-center'>
                        {options[selectedOption].map((subcategory, index) => (                            
                                <nav key={index} className='font-bold justify-center gap-2 cursor-pointer flex flex-grow items-center py-4 px-3 hover:bg-[#25272E]' onClick={() => handleClick(subcategory)}>
                                    {subcategory}
                                </nav>
                        ))}
                    </ul>
                </div>
            )}
        </>
    );
}