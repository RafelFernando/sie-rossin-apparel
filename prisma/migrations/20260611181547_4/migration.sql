/*
  Warnings:

  - The primary key for the `Transaksi` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Transaksi" DROP CONSTRAINT "Transaksi_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Transaksi_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Transaksi_id_seq";
