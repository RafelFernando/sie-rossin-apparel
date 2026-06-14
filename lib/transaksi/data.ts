import { prisma } from '@/lib/prisma';

export const getTransaksi = async () => {
    try {
        const result = await prisma.transaksis.findMany({
            orderBy: {
                createdAt: "asc"
            }
        });
        return result;
    } catch (error) {
        console.log(error);
    }
}