import { prisma } from "@/lib/prisma";

export const LaporanPenjualanPerKategori = async () => {
    try {
        const transaksi = await prisma.transaksis.findMany({
            select: {
                transactionDate: true,
                totalAmount: true,
                pagesViewed: true,
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

            monthlyData[month].totalViews +=
                item.pagesViewed;

            monthlyData[month].totalSales +=
                item.totalAmount;
        });

        const highestViews = monthlyData.reduce(
            (max, item) =>
                item.totalViews > max.totalViews
                    ? item
                    : max
        );

        const highestSales = monthlyData.reduce(
            (max, item) =>
                item.totalSales > max.totalSales
                    ? item
                    : max
        );

        return {
            highestViews: {
                month: highestViews.month,
                totalViews:
                    highestViews.totalViews,
            },
            highestSales: {
                month: highestSales.month,
                totalSales:
                    highestSales.totalSales,
                totalSalesJuta: Number(
                    (
                        highestSales.totalSales /
                        1_000_000
                    ).toFixed(2)
                ),
            },
        };
    } catch (error) {
        console.log(error);

        return {
            highestViews: null,
            highestSales: null,
        };
    }
};

export const LaporanInsightTotalDanTrenPenjualan = async () => {
    try {
        const transaksi = await prisma.transaksis.findMany({
            select: {
                transactionDate: true,
                totalAmount: true,
            },
        });

        const monthlyData = Array.from(
            { length: 12 },
            (_, index) => ({
                month: index + 1,
                totalSales: 0,
                totalTransactions: 0,
            })
        );

        transaksi.forEach((item) => {
            const month = new Date(
                item.transactionDate
            ).getMonth();

            monthlyData[month].totalSales +=
                item.totalAmount;

            monthlyData[month].totalTransactions += 1;
        });

        const totalSales = monthlyData.reduce(
            (sum, item) => sum + item.totalSales,
            0
        );

        const totalTransactions = monthlyData.reduce(
            (sum, item) =>
                sum + item.totalTransactions,
            0
        );

        const highestMonth = [...monthlyData].sort(
            (a, b) => b.totalSales - a.totalSales
        )[0];

        const lowestMonth = [...monthlyData]
            .filter((item) => item.totalSales > 0)
            .sort(
                (a, b) =>
                    a.totalSales - b.totalSales
            )[0];

        const months = [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
        ];

        return {
            totalSales,
            totalTransactions,

            highestMonth: {
                month:
                    months[
                    highestMonth.month - 1
                    ],
                sales: highestMonth.totalSales,
            },

            lowestMonth: {
                month:
                    months[
                    lowestMonth.month - 1
                    ],
                sales: lowestMonth.totalSales,
            },

            monthlyData,
        };
    } catch (error) {
        console.log(error);

        return null;
    }
};

export const LaporanInsightAktivitasCustomerPembelian = async () => {
    try {
        const transaksi = await prisma.transaksis.findMany({
            select: {
                transactionDate: true,
                pagesViewed: true,
                totalAmount: true,
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

            monthlyData[month].totalViews +=
                item.pagesViewed;

            monthlyData[month].totalSales +=
                item.totalAmount;
        });

        const months = [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
        ];

        const highestViews = [...monthlyData].sort(
            (a, b) => b.totalViews - a.totalViews
        )[0];

        const lowestViews = [...monthlyData]
            .filter((item) => item.totalViews > 0)
            .sort(
                (a, b) => a.totalViews - b.totalViews
            )[0];

        const highestSales = [...monthlyData].sort(
            (a, b) => b.totalSales - a.totalSales
        )[0];

        const lowestSales = [...monthlyData]
            .filter((item) => item.totalSales > 0)
            .sort(
                (a, b) => a.totalSales - b.totalSales
            )[0];

        const conversionData = monthlyData
            .filter((item) => item.totalViews > 0)
            .map((item) => ({
                ...item,
                conversion:
                    item.totalSales /
                    item.totalViews,
            }));

        const bestConversion =
            [...conversionData].sort(
                (a, b) =>
                    b.conversion -
                    a.conversion
            )[0];

        const worstConversion =
            [...conversionData].sort(
                (a, b) =>
                    a.conversion -
                    b.conversion
            )[0];

        return {
            highestViews: {
                month:
                    months[
                    highestViews.month - 1
                    ],
                totalViews:
                    highestViews.totalViews,
            },

            lowestViews: {
                month:
                    months[
                    lowestViews.month - 1
                    ],
                totalViews:
                    lowestViews.totalViews,
            },

            highestSales: {
                month:
                    months[
                    highestSales.month - 1
                    ],
                totalSales:
                    highestSales.totalSales,
            },

            lowestSales: {
                month:
                    months[
                    lowestSales.month - 1
                    ],
                totalSales:
                    lowestSales.totalSales,
            },

            bestConversion: {
                month:
                    months[
                    bestConversion.month - 1
                    ],
                conversion:
                    bestConversion.conversion,
            },

            worstConversion: {
                month:
                    months[
                    worstConversion.month - 1
                    ],
                conversion:
                    worstConversion.conversion,
            },

            monthlyData,
        };
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const LaporanInsightPenggunaanDiskon = async () => {
    try {
        const transaksi = await prisma.transaksis.findMany({
            select: {
                transactionDate: true,
                discountAmount: true,
            },
        });

        const monthlyData = Array.from(
            { length: 12 },
            (_, index) => ({
                month: index + 1,
                withDiscount: 0,
                withoutDiscount: 0,
            })
        );

        transaksi.forEach((item) => {
            const month = new Date(
                item.transactionDate
            ).getMonth();

            if (item.discountAmount > 0) {
                monthlyData[month].withDiscount++;
            } else {
                monthlyData[month].withoutDiscount++;
            }
        });

        const months = [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
        ];

        const totalWithDiscount =
            monthlyData.reduce(
                (sum, item) =>
                    sum + item.withDiscount,
                0
            );

        const totalWithoutDiscount =
            monthlyData.reduce(
                (sum, item) =>
                    sum + item.withoutDiscount,
                0
            );

        const highestDiscountMonth =
            [...monthlyData].sort(
                (a, b) =>
                    b.withDiscount -
                    a.withDiscount
            )[0];

        const highestWithoutDiscountMonth =
            [...monthlyData].sort(
                (a, b) =>
                    b.withoutDiscount -
                    a.withoutDiscount
            )[0];

        const effectiveDiscountMonths =
            monthlyData
                .filter(
                    (item) =>
                        item.withDiscount >
                        item.withoutDiscount
                )
                .map(
                    (item) =>
                        months[item.month - 1]
                );

        const zeroDiscountMonths =
            monthlyData
                .filter(
                    (item) =>
                        item.withDiscount === 0
                )
                .map(
                    (item) =>
                        months[item.month - 1]
                );

        return {
            totalWithDiscount,
            totalWithoutDiscount,

            highestDiscountMonth: {
                month:
                    months[
                    highestDiscountMonth.month -
                    1
                    ],
                total:
                    highestDiscountMonth.withDiscount,
            },

            highestWithoutDiscountMonth: {
                month:
                    months[
                    highestWithoutDiscountMonth.month -
                    1
                    ],
                total:
                    highestWithoutDiscountMonth.withoutDiscount,
            },

            effectiveDiscountMonths,

            zeroDiscountMonths,

            monthlyData,
        };
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const LaporanInsightLoyalitasCustomer = async () => {
    try {
        const transaksi = await prisma.transaksis.findMany({
            select: {
                customerId: true,
                transactionDate: true,
            },
            orderBy: {
                transactionDate: "asc",
            },
        });

        const customerCount = new Map<
            string,
            number
        >();

        transaksi.forEach((trx) => {
            customerCount.set(
                trx.customerId,
                (customerCount.get(
                    trx.customerId
                ) || 0) + 1
            );
        });

        const monthlyData = Array.from(
            { length: 12 },
            (_, index) => ({
                month: index + 1,
                loyal: 0,
                newCustomer: 0,
            })
        );

        transaksi.forEach((trx) => {
            const month = new Date(
                trx.transactionDate
            ).getMonth();

            const totalCustomerTransaction =
                customerCount.get(
                    trx.customerId
                ) || 0;

            if (
                totalCustomerTransaction > 1
            ) {
                monthlyData[month].loyal++;
            } else {
                monthlyData[
                    month
                ].newCustomer++;
            }
        });

        const totalLoyal =
            monthlyData.reduce(
                (sum, item) =>
                    sum + item.loyal,
                0
            );

        const totalNew =
            monthlyData.reduce(
                (sum, item) =>
                    sum +
                    item.newCustomer,
                0
            );

        const totalTransaction =
            totalLoyal + totalNew;

        const loyalPercentage =
            totalTransaction === 0
                ? 0
                : Number(
                    (
                        (totalLoyal /
                            totalTransaction) *
                        100
                    ).toFixed(2)
                );

        const newPercentage =
            totalTransaction === 0
                ? 0
                : Number(
                    (
                        (totalNew /
                            totalTransaction) *
                        100
                    ).toFixed(2)
                );

        const months = [
            "Januari",
            "Februari",
            "Maret",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Agustus",
            "September",
            "Oktober",
            "November",
            "Desember",
        ];

        const highestLoyalMonth =
            [...monthlyData].sort(
                (a, b) =>
                    b.loyal - a.loyal
            )[0];

        const highestNewMonth =
            [...monthlyData].sort(
                (a, b) =>
                    b.newCustomer -
                    a.newCustomer
            )[0];

        return {
            totalLoyal,
            totalNew,
            loyalPercentage,
            newPercentage,

            highestLoyalMonth: {
                month:
                    months[
                    highestLoyalMonth.month -
                    1
                    ],
                total:
                    highestLoyalMonth.loyal,
            },

            highestNewMonth: {
                month:
                    months[
                    highestNewMonth.month -
                    1
                    ],
                total:
                    highestNewMonth.newCustomer,
            },

            monthlyData,
        };
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const LaporanInsightRatingPerKategori = async () => {
    try {
        const data = await prisma.transaksis.groupBy({
            by: ["productCategory"],
            _avg: {
                customerRating: true,
            },
        });

        const ratingPerKategori = data.map((item) => ({
            category: item.productCategory,
            averageRating: Number(
                (item._avg.customerRating ?? 0).toFixed(2)
            ),
        }));

        if (ratingPerKategori.length === 0) {
            return null;
        }

        const highestRating = [...ratingPerKategori].sort(
            (a, b) => b.averageRating - a.averageRating
        )[0];

        const lowestRating = [...ratingPerKategori].sort(
            (a, b) => a.averageRating - b.averageRating
        )[0];

        return {
            highestRating,
            lowestRating,
            ratingPerKategori,
        };
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const LaporanTotalDeviceType = async () => {
    try {
        const data = await prisma.transaksis.groupBy({
            by: ["deviceType"],
            _count: {
                deviceType: true,
            },
        });

        let mobile = 0;
        let desktop = 0;
        let tablet = 0;

        data.forEach((item) => {
            switch (item.deviceType) {
                case "Mobile":
                    mobile = item._count.deviceType;
                    break;

                case "Desktop":
                    desktop = item._count.deviceType;
                    break;

                case "Tablet":
                    tablet = item._count.deviceType;
                    break;
            }
        });

        return {
            mobile,
            desktop,
            tablet,
        };
    } catch (error) {
        console.log(error);

        return {
            mobile: 0,
            desktop: 0,
            tablet: 0,
        };
    }
};

export const LaporanTotalPaymentMethod = async () => {
    try {
        const data = await prisma.transaksis.groupBy({
            by: ["paymentMethod"],
            _count: {
                paymentMethod: true,
            },
        });

        let bankTransfer = 0;
        let cod = 0;
        let creditCard = 0;
        let digitalWallet = 0;

        data.forEach((item) => {
            switch (item.paymentMethod) {
                case "Bank Transfer":
                    bankTransfer = item._count.paymentMethod;
                    break;

                case "COD":
                    cod = item._count.paymentMethod;
                    break;

                case "Credit Card":
                    creditCard = item._count.paymentMethod;
                    break;

                case "Digital Wallet":
                    digitalWallet = item._count.paymentMethod;
                    break;
            }
        });

        return {
            bankTransfer,
            cod,
            creditCard,
            digitalWallet,
        };
    } catch (error) {
        console.log(error);

        return {
            bankTransfer: 0,
            cod: 0,
            creditCard: 0,
            digitalWallet: 0,
        };
    }
};

export const LaporanTotalReturningCustomer = async () => {
    try {
        const data = await prisma.transaksis.groupBy({
            by: ["isReturningCustomer"],
            _count: {
                isReturningCustomer: true,
            },
        });

        let returningCustomer = 0;
        let customerBaru = 0;

        data.forEach((item) => {
            if (item.isReturningCustomer === "TRUE") {
                returningCustomer =
                    item._count.isReturningCustomer;
            } else {
                customerBaru =
                    item._count.isReturningCustomer;
            }
        });

        return {
            returningCustomer,
            customerBaru,
            total:
                returningCustomer +
                customerBaru,
        };
    } catch (error) {
        console.log(error);

        return {
            returningCustomer: 0,
            customerBaru: 0,
            total: 0,
        };
    }
};