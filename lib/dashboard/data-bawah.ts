import { prisma } from "@/lib/prisma";

export const getPaymentMethodPieChart = async () => {
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

        const total =
            bankTransfer +
            cod +
            creditCard +
            digitalWallet;

        return {
            bankTransfer: {
                total: bankTransfer,
                percentage:
                    total > 0
                        ? Number(
                            ((bankTransfer / total) * 100).toFixed(2)
                        )
                        : 0,
            },

            cod: {
                total: cod,
                percentage:
                    total > 0
                        ? Number(
                            ((cod / total) * 100).toFixed(2)
                        )
                        : 0,
            },

            creditCard: {
                total: creditCard,
                percentage:
                    total > 0
                        ? Number(
                            ((creditCard / total) * 100).toFixed(2)
                        )
                        : 0,
            },

            digitalWallet: {
                total: digitalWallet,
                percentage:
                    total > 0
                        ? Number(
                            ((digitalWallet / total) * 100).toFixed(2)
                        )
                        : 0,
            },
        };
    } catch (error) {
        throw new Error("Failed to fetch payment method statistics");
    }
};

export const getReturningCustomerPieChart = async () => {
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
                returningCustomer = item._count.isReturningCustomer;
            } else {
                customerBaru = item._count.isReturningCustomer;
            }
        });

        const total = returningCustomer + customerBaru;

        return {
            returningCustomer: {
                total: returningCustomer,
                percentage:
                    total > 0
                        ? Number(
                            ((returningCustomer / total) * 100).toFixed(2)
                        )
                        : 0,
            },
            customerBaru: {
                total: customerBaru,
                percentage:
                    total > 0
                        ? Number(
                            ((customerBaru / total) * 100).toFixed(2)
                        )
                        : 0,
            },
        };
    } catch (error) {
        throw new Error("Failed to fetch returning customer statistics");
    }
};

export const getDeviceTypePieChart = async () => {
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

        const total =
            mobile +
            desktop +
            tablet;

        return {
            mobile: {
                total: mobile,
                percentage:
                    total > 0
                        ? Number(
                            ((mobile / total) * 100).toFixed(2)
                        )
                        : 0,
            },

            desktop: {
                total: desktop,
                percentage:
                    total > 0
                        ? Number(
                            ((desktop / total) * 100).toFixed(2)
                        )
                        : 0,
            },

            tablet: {
                total: tablet,
                percentage:
                    total > 0
                        ? Number(
                            ((tablet / total) * 100).toFixed(2)
                        )
                        : 0,
            },
        };
    } catch (error) {
        throw new Error("Failed to fetch device type statistics");
    }
};

export const getPengaruhDiskonBarChart = async () => {
    try {
        const transaksi = await prisma.transaksis.findMany({
            select: {
                transactionDate: true,
                discountAmount: true,
            },
            orderBy: {
                transactionDate: "asc",
            },
        });

        const monthlyData = Array.from(
            { length: 12 },
            (_, index) => ({
                month: index + 1,
                tanpaDiskon: 0,
                denganDiskon: 0,
            })
        );

        transaksi.forEach((item) => {
            const month = new Date(
                item.transactionDate
            ).getMonth();

            if (item.discountAmount > 0) {
                monthlyData[month].denganDiskon += 1;
            } else {
                monthlyData[month].tanpaDiskon += 1;
            }
        });

        return monthlyData;
    } catch (error) {
        console.log(error);
        return [];
    }
};