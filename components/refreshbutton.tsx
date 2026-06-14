"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { FiRefreshCw } from "react-icons/fi";
import { useTopLoader } from "nextjs-toploader";

export default function RefreshButton() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const { start, done } = useTopLoader();

    const handleRefresh = () => {
        start();

        startTransition(() => {
            router.refresh();
        });
    };

    if (!isPending) {
        done();
    }

    return (
        <button
            onClick={handleRefresh}
            className="cursor-pointer text-white px-3 py-1 border border-white rounded-sm flex items-center gap-2 bg-blue-400 hover:bg-blue-600"
        >
            <FiRefreshCw size={20} />
            Refresh
        </button>
    );
}