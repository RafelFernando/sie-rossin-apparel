-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('SUBMITTED', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "CreditSubmission" (
    "id" TEXT NOT NULL,
    "submissionNumber" TEXT NOT NULL,
    "customerName" TEXT NOT NULL,
    "nik" TEXT NOT NULL,
    "dealerName" TEXT NOT NULL,
    "vehicleBrand" TEXT NOT NULL,
    "vehicleModel" TEXT NOT NULL,
    "vehiclePrice" DECIMAL(15,2) NOT NULL,
    "downPayment" DECIMAL(15,2) NOT NULL,
    "tenorMonths" INTEGER NOT NULL,
    "monthlyInstallment" DECIMAL(15,2) NOT NULL,
    "notes" TEXT,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'SUBMITTED',
    "approvalNote" TEXT,
    "approvedBy" TEXT,
    "approvedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CreditSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CreditSubmission_submissionNumber_key" ON "CreditSubmission"("submissionNumber");

-- CreateIndex
CREATE INDEX "CreditSubmission_status_createdAt_idx" ON "CreditSubmission"("status", "createdAt");

-- CreateIndex
CREATE INDEX "CreditSubmission_customerName_idx" ON "CreditSubmission"("customerName");
