/*
  Warnings:

  - Added the required column `userId` to the `Checkout` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Checkout` ADD COLUMN `userId` INTEGER NOT NULL;
