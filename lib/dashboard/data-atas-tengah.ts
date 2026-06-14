import { prisma } from "@/lib/prisma"

export const getTotalDanTrenPenjualanLineChart = async () => {
    try {
        const transaksi = await prisma.transaksis.findMany({
            select: {
                transactionDate: true,
                totalAmount: true,
            },
            orderBy: {
                transactionDate: "asc",
            },
        });

        const monthlyData = Array.from(
            { length: 12 },
            (_, index) => ({
                month: index + 1,
                totalTransactions: 0,
                totalSales: 0,
            })
        );

        transaksi.forEach((item) => {
            const month = new Date(
                item.transactionDate
            ).getMonth();

            monthlyData[month].totalTransactions += 1;
            monthlyData[month].totalSales += item.totalAmount;
        });

        return monthlyData.map((item) => ({
            ...item,
            totalSalesJuta: Number(
                (item.totalSales / 1_000_000).toFixed(2)
            ),
        }));
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const getViewsVsSalesLineChart = async () => {
    try {
        const transaksi = await prisma.transaksis.findMany({
            select: {
                transactionDate: true,
                totalAmount: true,
                pagesViewed: true,
            },
            orderBy: {
                transactionDate: "asc",
            },
        });

        const monthlyData = Array.from(
            { length: 12 },
            (_, index) => ({
                month: index + 1,
                totalViews: 0,
                totalSales: 0,
            })
        );

        transaksi.forEach((item) => {
            const month = new Date(
                item.transactionDate
            ).getMonth();

            monthlyData[month].totalViews += item.pagesViewed;
            monthlyData[month].totalSales += item.totalAmount;
        });

        return monthlyData.map((item) => ({
            month: item.month,
            totalViews: item.totalViews,
            totalSalesJuta: Number(
                (item.totalSales / 1_000_000).toFixed(2)
            ),
        }));
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const getTotalPenjualanPerKategoriBarChart = async () => {
    try {
        const data = await prisma.transaksis.groupBy({
            by: ["productCategory"],
            _sum: {
                totalAmount: true,
            },
        });

        return data.map((item) => ({
            category: item.productCategory,
            totalSales: item._sum.totalAmount ?? 0,
            totalSalesJuta: Number(
                ((item._sum.totalAmount ?? 0) / 1_000_000).toFixed(2)
            ),
        }));
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const getEngagementPerKategoriBardanLineChart = async () => {
    try {
        const data = await prisma.transaksis.groupBy({
            by: ["productCategory"],
            _avg: {
                sessionDurationMinutes: true,
                pagesViewed: true,
            },
        });

        return data.map((item) => ({
            category: item.productCategory,

            avgSessionDuration: Number(
                (
                    item._avg.sessionDurationMinutes ?? 0
                ).toFixed(2)
            ),

            avgPagesViewed: Number(
                (
                    item._avg.pagesViewed ?? 0
                ).toFixed(2)
            ),
        }));
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const getHargaVsTransaksiScatterplot = async () => {
    try {
        const data = await prisma.transaksis.groupBy({
            by: ["productCategory"],
            _avg: {
                unitPrice: true,
            },
            _count: {
                id: true,
            },
        });

        return data.map((item) => ({
            x: Number(
                ((item._avg.unitPrice ?? 0) / 1_000_000).toFixed(2)
            ),
            y: item._count.id,
            category: item.productCategory,
        }));
    } catch (error) {
        console.log(error);
        return [];
    }
};

export const getCustomerActivityFunnelChart = async () => {
    try {
        const [
            totalTransaksi,
            session20,
            pages10,
            pages20,
            returningCustomer,
        ] = await Promise.all([
            prisma.transaksis.count(),

            prisma.transaksis.count({
                where: {
                    sessionDurationMinutes: {
                        gt: 20,
                    },
                },
            }),

            prisma.transaksis.count({
                where: {
                    pagesViewed: {
                        gt: 10,
                    },
                },
            }),

            prisma.transaksis.count({
                where: {
                    pagesViewed: {
                        gt: 20,
                    },
                },
            }),

            prisma.transaksis.count({
                where: {
                    isReturningCustomer: "TRUE",
                },
            }),
        ]);

        return [
            {
                stage: "Total Transaksi",
                value: totalTransaksi,
            },
            {
                stage: "Session > 20 Menit",
                value: session20,
            },
            {
                stage: "Pages Viewed > 10",
                value: pages10,
            },
            {
                stage: "Pages Viewed > 20",
                value: pages20,
            },
            {
                stage: "Returning Customer",
                value: returningCustomer,
            },
        ];
    } catch (error) {
        console.log(error);
        return [];
    }
};