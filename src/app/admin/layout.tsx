import { getServerSession } from "next-auth";
import { authOptions } from "../constants/auth-options";
import { redirect } from 'next/navigation'
import LogoutButton from "@/components/btn-logout";
import { customSession } from "@/types/user";
import { List, Settings2, SquarePen, Lock } from "lucide-react";
import Link from "next/link";


export default async function Layout({children}: {children: React.ReactNode}) {
    const session = await getServerSession(authOptions) as customSession;
    if(!session) { 
        redirect("/login");
    }

    return (
        <div className="text-white">
            <header className="flex justify-between p-4 items-center h-[80px] w-full">
                <h1 className="text-3xl font-bold">Admin Panel</h1>
                <LogoutButton/>
            </header>
            <main className="flex">
            <nav className="flex w-[230px] flex-col gap-2">
                <Link href="/admin/" className="bg-[#15171C] flex gap-1 font-bold py-2 px-3 hover:bg-opacity-50 cursor-pointer"><List />Item List</Link>
                <Link href="/admin/edit" className="bg-[#15171C] flex gap-1 font-bold py-2 px-3 hover:bg-opacity-50 cursor-pointer"><SquarePen />Item Modifies</Link>
                <Link href="/admin/steam" className="bg-[#15171C] flex gap-1 font-bold py-2 px-3 hover:bg-opacity-50 cursor-pointer"><Settings2 />Steam Configuration</Link>
                <Link href="/admin/config" className="bg-[#15171C] flex gap-1 -bold py-2 px-3 hover:bg-opacity-50 cursor-pointer"><Lock />Password and Security</Link>
            </nav>
            <section className="ml-10 p-4 w-full h-full overflow-y-auto">
                {children}
            </section>
            </main>
        </div>
    )
}