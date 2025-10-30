/*
  Warnings:

  - Added the required column `sessionId` to the `Checkout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Checkout` ADD COLUMN `sessionId` VARCHAR(191) NOT NULL;
