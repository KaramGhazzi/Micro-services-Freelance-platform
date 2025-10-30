/*
  Warnings:

  - A unique constraint covering the columns `[sessionId]` on the table `Checkout` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Checkout_sessionId_key` ON `Checkout`(`sessionId`);
