import { Item, valueOf } from "@/types/items";
import Image from "next/image";
import { CircleDollarSign,Lock, Eye, LockKeyhole, Pencil, Ban, CirclePercent, SquarePen } from "lucide-react";
import HtmlComponent from "./sticker-list";
import getPrice from "@/helpers/get-price";

export default function ItemEditedComponent ({item, onClick}: {item: Item, onClick: () => void}) {
    return (
    <div className=" w-[240px] h-[360px] text-white bg-[#1B1D24] rounded-xl" >
        <header className="p-3">
            <h2 className="font-bold w-full truncate truncate-overflow pb-1">{item.displayName}</h2>
            <div className="w-full font-black text-[#99A2AB] flex justify-evenly">
                    {valueOf(item.wear.toUpperCase())}
                    <div className="flex gap-1 ml-auto">
                    {!item.tradeable && (<Lock />)}
                    </div>
                </div>
            
        </header>
        <br />
        {!item.tradeable && (<LockKeyhole />)}
        <div className="p-3 relative">
            <div className="absolute z-20 top-0 flex gap-2">
                {item.addedPercentage != null && item.addedPercentage > 0 && (<div className="flex gap-2 rounded-lg bg-red-400 p-1 text-sm items-center font-bold">{item.addedPercentage}%</div>)}
                {item.hidden && <div className="flex gap-2 rounded-lg bg-blue-600 p-1 text-sm items-center font-bold">Hidden<Ban size={16}/></div>}
                {item.modified && <div className="flex gap-2 rounded-lg bg-green-400 p-1 text-sm items-center font-bold">Modified<SquarePen size={16} /></div>}
            </div>
            <div style={{
                position: 'absolute',
                opacity: '0.5',
                top: '0',
                left: '0',
                width: '100%',
                height: '100%',
                backgroundImage: `linear-gradient(to top, #${item.color}, transparent)`,
    }}>
    </div>
            <Image className="relative z-10" src={item.image} alt={item.name} width={220} height={250}></Image>
            <br/>
            <HtmlComponent data={item.stickerList} /> 
    
        </div>
 
        <div className={`w-full h-[4px]`} style={{backgroundColor: `#${item.color}`} }></div>
        <div className={`p-3 font-bold flex gap-1 items-center text-xl ${item.addedPercentage && item.addedPercentage> 0 && !item.modified ? "text-orange-400" : "text-white"}`}>
            ${getPrice(item)}
            <CircleDollarSign size={20} color="lime"/>
            <div className="ml-auto flex gap-3">
            <a className="cursor-pointer" href={item.inspectLink}><Eye color="white"/></a>
            <Pencil onClick={onClick} color="white" className="cursor-pointer"/>
            </div>
            
        
        </div>
    </div> );
}
 
