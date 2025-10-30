/*
  Warnings:

  - You are about to drop the `Company` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Checkout` DROP FOREIGN KEY `Checkout_companyId_fkey`;

RENAME TABLE `Company` TO `ExternalProviderCompany`;

ALTER TABLE `ExternalProviderCompany` RENAME COLUMN `id` TO `companyId`;

-- AddForeignKey
ALTER TABLE `Checkout` ADD CONSTRAINT `Checkout_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `ExternalProviderCompany`(`companyId`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contract` ADD CONSTRAINT `Contract_companyId_fkey` FOREIGN KEY (`companyId`) REFERENCES `ExternalProviderCompany`(`companyId`) ON DELETE RESTRICT ON UPDATE CASCADE;
