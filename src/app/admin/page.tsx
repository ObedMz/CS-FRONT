import { getServerSession } from "next-auth";
import { authOptions } from "../constants/auth-options";
import { redirect } from 'next/navigation'
import LogoutButton from "@/components/btn-logout";
import { customSession } from "@/types/user";
import { List, Settings2, SquarePen, Lock } from "lucide-react";
import Link from "next/link";


export default async function Admin() {
    const session = await getServerSession(authOptions) as customSession;
    if(!session) { 
        redirect("/login");
    }
    return (
        <div className="text-white">
            <h1>Item List</h1>
        </div>
    )
}