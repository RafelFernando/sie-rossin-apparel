import { prisma } from "@/lib/prisma";

export const getRevenueAndTransactions = async () => {
    try {
        const result = await prisma.transaksis.aggregate({
            _count: true,
            _sum: {
                totalAmount: true,
            },
        });

        return {
            revenue: result._sum.totalAmount || 0,
            totalTransaction: result._count,
        };
    } catch (error) {
        console.log(error);
        return {
            revenue: 0,
            totalTransaction: 0,
        };
    }
};

export const getRatingStats = async () => {
    try {
        const result = await prisma.transaksis.aggregate({
            _avg: {
                customerRating: true,
            },
            _count: {
                customerRating: true,
            },
        });

        return {
            averageRating: Number(
                (result._avg.customerRating ?? 0).toFixed(2)
            ),
            totalReviews: result._count.customerRating,
        };
    } catch (error) {
        console.log(error);
        return {
            averageRating: 0,
            totalReviews: 0,
        };
    }
};

export const getReturningCustomer = async () => {
    try {
        const [totalTransaksi, returningCustomer] = await Promise.all([
            prisma.transaksis.count(),
            prisma.transaksis.count({
                where: {
                    isReturningCustomer: "TRUE",
                },
            }),
        ]);

        return {
            total: totalTransaksi,
            returning: returningCustomer,
            percentage:
                totalTransaksi > 0
                    ? Number(
                        (
                            (returningCustomer / totalTransaksi) *
                            100
                        ).toFixed(2)
                    )
                    : 0,
        };
    } catch (error) {
        console.log(error);
        return {
            total: 0,
            returning: 0,
            percentage: 0,
        };
    }
};

export const getTotalTraffic = async () => {
    const result = await prisma.transaksis.aggregate({
        _sum: {
            pagesViewed: true,
        },
    });

    return result._sum.pagesViewed ?? 0;
};