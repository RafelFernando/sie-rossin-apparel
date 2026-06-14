"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarItemProps {
    name: string;
    href: string;
    icon: React.ElementType;
    collapsed: boolean;
}

export default function SidebarItem({
    name,
    href,
    icon: Icon,
    collapsed,
}: SidebarItemProps) {
    const pathname = usePathname();

    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`
        flex items-center gap-3
        px-6 py-3
        transition-all
        hover:bg-gray-100 mb-0
        ${isActive
                    ? "bg-blue-100 text-blue-600 border-l-3 border-green-500"
                    : "text-gray-700"
                }
      `}
        >
            <Icon size={22} />

            {!collapsed && (
                <span className="font-medium">
                    {name}
                </span>
            )}
        </Link>
    );
}