import { Item, valueOf } from "@/types/items";
import Image from "next/image";
import { CircleDollarSign,Lock, Eye, LockKeyhole } from "lucide-react";
import HtmlComponent from "./sticker-list";

export default function ItemComponent ({item}: {item: Item}) {
    return (
    <div className=" w-[240px] h-[360px] text-white bg-[#1B1D24] rounded-xl">
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
        <div className="p-3 font-bold flex gap-1 items-center text-xl">
            ${item.price}
            <CircleDollarSign color={'lime'}/>
            <a className="ml-auto cursor-pointer" href={item.inspectLink}><Eye /></a>
        
        </div>
    </div> );
}
 
