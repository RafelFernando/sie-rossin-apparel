"use client";

import { useState } from "react";
import { FiMenu } from "react-icons/fi";
import SidebarItem from "./sidebarItems";
import { menuItems } from "./menu";
import Image from "next/image";

export default function SidebarEksekutif() {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <aside
            className={`sidebar
                h-full shrink-0 border-r bg-white
                transition-all duration-50
                ${collapsed ? "w-20" : "w-52"}
            `}
        >
            <div className="flex items-center justify-between p-4">
                {!collapsed && (
                    <div className="flex justify-center mb-0">
                        <Image src="/logo.png" alt="Rossin Apparel" width={120} height={120} />
                    </div>
                )}

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="rounded-lg p-2 hover:bg-gray-100"
                >
                    <FiMenu size={20} />
                </button>
            </div>

            <nav className="space-y-2">
                {menuItems.map((menu) => (
                    <SidebarItem
                        key={menu.href}
                        {...menu}
                        collapsed={collapsed}
                    />
                ))}
            </nav>
        </aside>
    );
}