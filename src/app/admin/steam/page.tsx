'use client'
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { ResponseMessage, SteamDTO } from "@/types";
import getSteam from "@/helpers/get-steam";
import { Eye, EyeOff, Plus, Trash2 } from "lucide-react";
import updateSteam from "@/helpers/update-steam";

export default function Page() {
    const [showKey, setShowKey] = useState(false);
    const [steamData, setSteamData] = useState<SteamDTO | null>(null);
    const [message, setMessage] = useState<ResponseMessage | null>(null);
    const { register, handleSubmit } = useForm<SteamDTO>();
    const toggleKeyVisibility = () => {
            setShowKey(!showKey);
    };
    
    useEffect(() => {
        const fetchData = async () => {
            const data: SteamDTO | null = await getSteam();
            if(!data) return
            if(data.key && data.steamIDs) {
                setSteamData(data);
            } else {
                setSteamData({key: "", steamIDs: [""]});
            }
        };
        fetchData();
    },[]);

    const addSteamID = () => {
        setSteamData((prevData) => {
            if (prevData) {
                return { ...prevData, steamIDs: [...prevData.steamIDs, ""] };
            }
            return null;
        }); 
        
    };

    const removeSteamID = (index: number) => {
        if(index <= 0) return;
        setSteamData((prevData) => {
            if (prevData) {
                const newSteamIDs = [...prevData.steamIDs];
                newSteamIDs.splice(index, 1);
                return { ...prevData, steamIDs: newSteamIDs };
            }
            return null;
        });
    };

    const onSubmit = async (formData: SteamDTO) => {
        try {
            const filteredSteamIDs = formData.steamIDs.filter(id => id.trim() !== "");
            const response = await updateSteam({key: formData.key, steamIDs: filteredSteamIDs});
            setMessage(response);
            // set message null after 3 seconds.
            setTimeout(() => setMessage(null), 3000);
        } catch (error) {
            console.error("Error al enviar los datos al servidor:", error);
        }
    };

    if (!steamData) {
        return <div>Cargando...</div>;
    }

    return (
        <div className="w-[40%]">
            <h1 className="text-3xl font-bold mb-6">Steam Configuration</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col ">
                <div className="flex gap-5 items-center mb-5">
                    <label className="font-bold text-xl"> Steam API Key: </label>
                    <input
                    type={showKey ? 'text' : 'password'} 
                    defaultValue={steamData.key}
                    {...register("key")} className="bg-transparent p-1 border border-white rounded-lg"/>
                    <button
                        type="button"
                        onClick={toggleKeyVisibility}
                        >
                        {showKey ? <EyeOff color="gray"/> : <Eye color="gray"/>}
                    </button>
                </div>
                <label className="font-bold text-xl flex gap-1 items-center justify-between"> User Keys: <div className="ml-2 cursor-pointer bg-green-500 text-white p-1 rounded"><Plus strokeWidth={2.75} onClick={addSteamID}/></div></label>
                <br />
                {steamData.steamIDs.map((id, index) => (
                    <div key={index} className="mb-3 flex items-center">
                        <input type="text" {...register(`steamIDs.${index}`)} defaultValue={id} className="bg-transparent p-1 border border-white rounded-lg"/>
                        <button type="button" onClick={() => removeSteamID(index)} className="ml-2 bg-red-500 text-white p-1 rounded"><Trash2 /></button>
                        <br/>
                    </div>
                ))}
                { message && message == ResponseMessage.SUCCESS ? <p className="text-green-500">{message}</p> : <p className="text-red-500">{message}</p>}
                <button type="submit" className="bg-blue-500 text-white p-2 mt-5">Guardar</button>
            </form>
        </div>
    );
}
