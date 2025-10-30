-- AlterTable
ALTER TABLE `Contract` MODIFY `usageInterval` ENUM('WEEK', 'MONTH', 'YEAR', 'NONE') NULL;

-- AlterTable
ALTER TABLE `Plan` MODIFY `usageInterval` ENUM('WEEK', 'MONTH', 'YEAR', 'NONE') NULL;
