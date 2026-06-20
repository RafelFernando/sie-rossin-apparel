import { deleteTransaksi } from "@/lib/transaksi/action";
import { IoTrashOutline, IoPencil } from "react-icons/io5"
import Link from "next/link";

export const EditButton = ({ id }: { id: string }) => {
    return (
        <Link href={`/admin/transaksi/edit/${id}`} className="rounded-sm p-1 hover:bg-gray-200 cursor-pointer">
            <IoPencil className="size-5" />
        </Link>
    );
}

export const DeleteButton = ({ id }: { id: string }) => {
    const DeleteTransaksiWithId = deleteTransaksi.bind(null, id);
    return (
        <form action={DeleteTransaksiWithId}>
            <button type="submit" className="rounded-sm p-1 hover:bg-gray-200 cursor-pointer">
                <IoTrashOutline className="size-5" />
            </button>
        </form>
    );
}