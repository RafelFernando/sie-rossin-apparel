-- CreateTable
CREATE TABLE "Transaksi" (
    "id" SERIAL NOT NULL,
    "customerId" TEXT NOT NULL,
    "transactionDate" TIMESTAMP(3) NOT NULL,
    "productCategory" TEXT NOT NULL,
    "unitPrice" BIGINT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "totalAmount" BIGINT NOT NULL,
    "discountAmount" BIGINT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "deviceType" TEXT NOT NULL,
    "sessionDurationMinutes" INTEGER NOT NULL,
    "pagesViewed" INTEGER NOT NULL,
    "isReturningCustomer" BOOLEAN NOT NULL,
    "customerRating" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Transaksi_pkey" PRIMARY KEY ("id")
);
