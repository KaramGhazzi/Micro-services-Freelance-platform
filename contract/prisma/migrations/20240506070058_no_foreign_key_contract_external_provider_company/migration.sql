-- DropForeignKey
ALTER TABLE `Contract` DROP FOREIGN KEY `Contract_companyId_fkey`;

-- DropIndex
DROP INDEX `Contract_companyId_fkey` ON `Contract`;
