import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import SidebarEksekutif from "@/components/layout/sidebareksekutif/sidebar";

export default async function EksekutifLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    if (session.user.role !== "eksekutif") {
        redirect("/");
    }
    return (
        <div className="flex h-screen">
            <SidebarEksekutif />

            <main className="flex-1 overflow-y-auto p-6">
                {children}
            </main>
        </div>
    );
}