import { prisma } from "@/lib/prisma";

export const getRataRataRatingPerKategoriBarChart = async () => {
    try {
        const data = await prisma.transaksis.groupBy({
            by: ["productCategory"],
            _avg: {
                customerRating: true,
            },
        });

        return data.map((item) => ({
            category: item.productCategory,
            averageRating: Number(
                (item._avg.customerRating ?? 0).toFixed(2)
            ),
        }));
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const getAverageSessionPerDeviceBarChart = async () => {
    try {
        const result = await prisma.transaksis.groupBy({
            by: ["deviceType"],
            _avg: {
                sessionDurationMinutes: true,
            },
        });

        return result.map((item) => ({
            device: item.deviceType,
            averageSession: Number(
                (item._avg.sessionDurationMinutes ?? 0).toFixed(2)
            ),
        }));
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const getKategoriProdukCustomer = async () => {
    try {
        const transaksi = await prisma.transaksis.findMany({
            select: {
                productCategory: true,
                isReturningCustomer: true,
            },
        });

        const categoryMap: Record<
            string,
            {
                loyalCount: number;
                baruCount: number;
            }
        > = {};

        transaksi.forEach((item) => {
            const category = item.productCategory;

            if (!categoryMap[category]) {
                categoryMap[category] = {
                    loyalCount: 0,
                    baruCount: 0,
                };
            }

            if (item.isReturningCustomer === "TRUE") {
                categoryMap[category].loyalCount++;
            } else {
                categoryMap[category].baruCount++;
            }
        });

        return Object.entries(categoryMap).map(
            ([category, value]) => {
                const total =
                    value.loyalCount +
                    value.baruCount;

                return {
                    category,

                    loyal: Number(
                        (
                            (value.loyalCount / total) *
                            100
                        ).toFixed(2)
                    ),

                    baru: Number(
                        (
                            (value.baruCount / total) *
                            100
                        ).toFixed(2)
                    ),

                    total,
                };
            }
        );
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const getRatingVsSales = async () => {
    try {
        const data = await prisma.transaksis.groupBy({
            by: ["productCategory"],
            _avg: {
                customerRating: true,
            },
            _sum: {
                totalAmount: true,
            },
        });

        return data.map((item) => ({
            x: Number(
                (item._avg.customerRating ?? 0).toFixed(2)
            ),
            y: item._sum.totalAmount ?? 0,
            category: item.productCategory,
        }));
    } catch (error) {
        console.log(error);
        return [];
    }
};