/*
  Warnings:

  - Added the required column `subscriptionExpireDate` to the `Contract` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Contract` ADD COLUMN `subscriptionExpireDate` DATETIME(3) NOT NULL AFTER `endDate`;

