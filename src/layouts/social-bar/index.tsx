import { Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";

export default function NavSocialBar() {
    return (
        <div className="fixed z-30 bg-[#1B1D24] top-[40%] text-white flex flex-col p-3 shadow-xl gap-5 right-rounded hover:scale-105 transition-all cursor-pointer">
            <a href={process.env.FACEBOOK_URL} className=""><Facebook /></a>
            <a href={process.env.TWITTER_URL} className=""><Twitter /></a>
            <a href={process.env.INSTAGRAM_URL} className=""><Instagram /></a>
            <a href={process.env.WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', width: '30px', height: '30px' }}>
                    <Image
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp Logo"
        width={100}
        height={100}
      />
    </a>
        </div>
    )
};