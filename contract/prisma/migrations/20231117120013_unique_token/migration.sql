/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `Checkout` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Checkout_token_key` ON `Checkout`(`token`);
