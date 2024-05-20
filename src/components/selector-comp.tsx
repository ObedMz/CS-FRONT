// 'use client'
// import { useFilter } from '@/hooks/use-filter';
// import { ChevronDown } from 'lucide-react';
// import { useRouter } from 'next/navigation';
// import React, { useEffect, useState } from 'react';
// import {type Option} from '@/types';
// import { GroupedItem } from '@/types/items';
// import getGroups from '@/helpers/get-groups';

// export default function SelectorComp(): JSX.Element {
//     const [data , setData] = useState<GroupedItem[]>([]);
//     const [selectedOption, setSelectedOption] = useState<Option | null>(null);
//     const { filter, setFilter } = useFilter();
//     const router = useRouter();

//     useEffect(() => {
//         const fetchData = async () => {
//             const data = await getGroups();
//             setData(data);
//         };
//         fetchData();
//     }, []);

//     const handleOptionClick = (option: Option) => {
//         setSelectedOption(prevOption => prevOption === option ? null : option);
//         if(option === "All")
//             router.push("/");
        
//     };
//     const updateUrlParams = (subcategory: string) => {
//         const queryParams = new URLSearchParams();
//         if (selectedOption !== "All") {
//             queryParams.set('itemType', encodeURIComponent(subcategory.toLowerCase()));
//         } else {
//             queryParams.delete('itemType');
//         }

//         const newUrl = queryParams.toString() ? `/?${queryParams.toString()}` : "/";
//         window.history.pushState({}, '', selectedOption !== "All" ? newUrl : "/");
//         setFilter(subcategory);
//     };

//     const handleClick = (subcategory: string) => {
//         updateUrlParams(subcategory);
//     };

//     return (
//         <>
//             <div className='text-white bg-[#1C1E25] w-[90%] m-auto rounded-sm overflow-y-auto'>
//                 <ul className='flex justify-evenly items-center'>
//                     {data.map((option, index) => (
//                         <li className='font-bold justify-center gap-2 cursor-pointer flex flex-grow items-center py-4 px-3 hover:bg-[#25272E]' key={index} onClick={() => handleOptionClick(option.groupName as Option)}>
//                             {option.groupName.charAt(0).toUpperCase() + option.groupName.slice(1)}
//                             {option.groupName !== "All" && <ChevronDown />}
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//             {selectedOption && (
//                 <div className='overflow-y-auto text-white bg-[#1C1E25] w-[90%] m-auto rounded-sm text-center'>
//                     <ul className='flex justify-evenly items-center'>
//                         {data.find((item) => item.groupName === selectedOption)?.itemTypes?.map((subcategory, index) => (
//                             <nav key={index} className='font-bold justify-center gap-2 cursor-pointer flex flex-grow items-center py-4 px-3 hover:bg-[#25272E]' onClick={() => handleClick(subcategory)}>
//                                 {subcategory.charAt(0).toUpperCase() + subcategory.slice(1)}
//                             </nav>
//                         ))}
                   
//                     </ul>
//                 </div>
//             )}
//         </>
//     );
// }