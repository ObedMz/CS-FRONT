'use client'

import getGlobalPercentage from "@/helpers/get-global";
import saveGlobalPercentage from "@/helpers/save-global";
import { ResponseMessage } from "@/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function GlobalPercentageForm() {
    const {handleSubmit, register} = useForm();
    const [globalPercent, setGlobalPercent] = useState<number>(0);
    const [message, setMessage] = useState<ResponseMessage | null>(null);
    const router = useRouter();

    const onSubmit = async (data: any) => {
        data.addedPercentage = parseInt(data.addedPercentage);
        const response = await saveGlobalPercentage(data.addedPercentage);
        setMessage(response);
        router.refresh();
        setTimeout(() => setMessage(null), 3000);
    }
    useEffect(() => {
        const fetchData = async () => {
            const response = await getGlobalPercentage();
            setGlobalPercent(response);
        }

        fetchData();
    }, [])
    return (
        <form className='flex items-center gap-4 ml-auto' onSubmit={handleSubmit(onSubmit)}>
            Global Added Percentage: 
            <input type="number" defaultValue={globalPercent} {...register('addedPercentage', { pattern: /^[0-9]*$/ })}
            className='text-center bg-transparent border border-gray-400 p-2 rounded-xl max-w-[50px]' />
            <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Save</button>
            {message && <p className={`${message == ResponseMessage.SUCCESS ? 'text-green-500' : 'text-red-500'}`}>{message}</p>}
          </form>
    )
}