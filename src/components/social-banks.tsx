import { Landmark } from "lucide-react";
import Image from "next/image";

export function TetherOption(){
    const url = process.env.TETHER_URL;
    return (
        <a href={url} className="w-[100px] h-[25px] flex">
            <Image src="/tether-logo.png" alt="thether" width={80} height={80} loading='eager' sizes="contain" priority={true} />
        </a>
    )
}
export function BinanceOption(){
    const url = process.env.BINANCE_URL;
    return (
        <a href={url} className="w-[100px] h-[30px] flex items-center">
            <Image src="/binance-logo.svg" alt="thether" width={100} height={100} loading='lazy' sizes="contain" />
        </a>
    )
}


export function BankOption(){
    const url = process.env.DEFAULT_BANK_URL;
    return (
        <a href={url} className="text-sm w-[150px] h-[30px] flex items-center gap-1 rounded-full border border-white py-4 px-3">
                <Landmark />
                Bank Account
        </a>
    )
}