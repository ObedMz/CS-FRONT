import { Facebook, Instagram, Twitter } from "lucide-react";

export default function NavSocialBar() {
    return (
        <div className="fixed z-30 bg-[#1B1D24] top-[40%] text-white flex flex-col p-3 shadow-xl gap-5 right-rounded hover:scale-105 transition-all cursor-pointer">
            <a href="https://www.facebook.com" className=""><Facebook /></a>
            <a href="https://www.twitter.com" className=""><Twitter /></a>
            <a href="https://www.instagram.com" className=""><Instagram /></a>
        </div>
    )
};