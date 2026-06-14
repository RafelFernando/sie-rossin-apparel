"use client";

import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
import { useTopLoader } from "nextjs-toploader";
import { useEffect } from "react";

export default function LogoutButton() {
    const { start, done } = useTopLoader();

    useEffect(() => {
        done();
    }, [done]);

    const handleLogout = async () => {
        start();

        await signOut({
            callbackUrl: "/login",
        });
    };

    return (
        <button
            onClick={handleLogout}
            className="cursor-pointer rounded-sm border border-white bg-red-400 px-3 py-1 text-white hover:bg-red-600 flex items-center gap-2"
        >
            <FiLogOut size={20} />
            Logout
        </button>
    );
}