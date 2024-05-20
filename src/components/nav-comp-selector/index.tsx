'use client'
import { useFilter } from '@/hooks/use-filter'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import {type Option} from '@/types'

export default function NewSelectorComp(): JSX.Element {
    const options = ["Primary", "Secondary", "knife", "agent", "others"]
    const { setFilter } = useFilter()
    const router = useRouter()

    const handleOptionClick = (option: Option) => {
        setFilter(option)
    };
    
    return (
        <>
            <div className='text-white bg-[#1C1E25] w-[90%] m-auto rounded-sm overflow-y-auto'>
                <ul className='flex justify-evenly items-center'>
                    {options.map((option, index) => (
                        <li className='font-bold justify-center gap-2 cursor-pointer flex flex-grow items-center py-4 px-3 hover:bg-[#25272E]' key={index} onClick={() => handleOptionClick(option as Option)}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
}