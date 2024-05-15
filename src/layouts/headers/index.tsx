'use client'
import Image from "next/image";
import { TetherOption, BinanceOption, BankOption } from "../../components/social-banks";
import { useHeaderOpt } from "@/hooks/header-opt";

export default function Header() {
    const opacity = useHeaderOpt();
  return (
    <header
      className={`text-white top-0 flex items-center justify-between fixed z-40 backdrop-blur-3xl p-5 w-full h-[80px]`}
      style={{
        backgroundColor: `rgba(37, 39, 46, ${opacity})`,
        boxShadow: opacity > 0 ? "0px 2px 8px rgba(0, 0, 0, 0.3)" : "none"
      }}
    >
      <a href="/" className="flex items-center gap-5">
        <div className="w-[50px] h-[50px]">
          <Image src="/logo.jpg" alt="Logo" width={72} height={16} />
        </div>
        <h1 className="text-xl font-bold">Jabbu Store</h1>
      </a>
      <div className="flex gap-5 items-center">
        <TetherOption />
        <BinanceOption />
        <BankOption />
      </div>
    </header>
  );
}
