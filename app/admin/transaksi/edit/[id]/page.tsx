import EditTransaksiForm from "@/components/transaksi/edit-form";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma"

export default async function EditTransaksiPage({
    params
}: {
    params: Promise<{ id: string }>
}) {
    const id = (await params).id;

    const transaksis = await prisma.transaksis.findUnique({
        where: { id: id }
    });

    if (!transaksis) return notFound();
    return (
        <div className="-m-6">
            <h1 className="text-2xl font-semibold text-black py-2 px-1">Edit Transaksi E-Commerce ROSIN APPAREL</h1>
            <EditTransaksiForm transaksis={transaksis} />
        </div>
    )
}