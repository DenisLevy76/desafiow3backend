/*
  Warnings:

  - A unique constraint covering the columns `[clientId]` on the table `Account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "TransitionLog" (
    "code" TEXT NOT NULL,
    "transitionDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "transitionValue" DECIMAL(65,30) NOT NULL,
    "bankOfficeId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,

    CONSTRAINT "TransitionLog_pkey" PRIMARY KEY ("code")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_clientId_key" ON "Account"("clientId");

-- AddForeignKey
ALTER TABLE "TransitionLog" ADD CONSTRAINT "TransitionLog_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TransitionLog" ADD CONSTRAINT "TransitionLog_bankOfficeId_fkey" FOREIGN KEY ("bankOfficeId") REFERENCES "BankOffice"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
