-- CreateTable
CREATE TABLE "Transaksis" (
    "id" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL,
    "productCategory" TEXT NOT NULL,
    "unitPrice" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "totalAmount" INTEGER NOT NULL,
    "discountAmount" INTEGER NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "deviceType" TEXT NOT NULL,
    "sessionDurationMinutes" INTEGER NOT NULL,
    "pagesViewed" INTEGER NOT NULL,
    "isReturningCustomer" TEXT NOT NULL,
    "customerRating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaksis_pkey" PRIMARY KEY ("id")
);
