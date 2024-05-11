'use client'

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  
    const handleLogout = async () => {
      await signOut({ redirect: true, callbackUrl: '/' });
    };
  
    return (
      <button onClick={handleLogout} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Logout</button>
    );
  }
  