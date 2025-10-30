-- AlterTable
ALTER TABLE `Contract` ADD COLUMN `renewalInterval` ENUM('QUARTER', 'YEAR') NULL;

-- AlterTable
ALTER TABLE `Plan` ADD COLUMN `renewalInterval` ENUM('QUARTER', 'YEAR') NULL;
