'use client'

import updateAllKeys from "@/helpers/update-all-keys";
import { ResponseMessage } from "@/types";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function UpdateSteamBtn() {
    const [response, setResponse] = useState<ResponseMessage | null>(null);
    const [loading, setloading] = useState<boolean>(false);
    const { handleSubmit} = useForm();

    const onSubmit = async () => {
        setloading(true);
        const response = await updateAllKeys();
        setResponse(response);
        setloading(false);
        setTimeout(() => setResponse(null), 3000);
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <button className="w-[180px] h-[40px] bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">{
                loading ? <LoaderCircle className="animate-spin m-auto" /> : "Force Update Items"}
            </button>
            {response && <p className={`${response == ResponseMessage.SUCCESS ? 'text-green-500' : 'text-red-500'}`}>{response}</p>}
        </form>
    );
}