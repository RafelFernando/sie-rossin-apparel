/*
  Warnings:

  - You are about to alter the column `unitPrice` on the `Transaksi` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `totalAmount` on the `Transaksi` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.
  - You are about to alter the column `discountAmount` on the `Transaksi` table. The data in that column could be lost. The data in that column will be cast from `BigInt` to `Integer`.

*/
-- AlterTable
ALTER TABLE "Transaksi" ALTER COLUMN "unitPrice" SET DATA TYPE INTEGER,
ALTER COLUMN "totalAmount" SET DATA TYPE INTEGER,
ALTER COLUMN "discountAmount" SET DATA TYPE INTEGER;
