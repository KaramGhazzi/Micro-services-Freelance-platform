-- AlterTable
ALTER TABLE `Contract` MODIFY `usageInterval` ENUM('WEEK', 'MONTH', 'QUARTER', 'HALF_YEAR', 'YEAR', 'NONE') NULL,
    MODIFY `renewalInterval` ENUM('QUARTER', 'YEAR', 'MONTH', 'HALF_YEAR') NULL;

-- AlterTable
ALTER TABLE `Plan` MODIFY `usageInterval` ENUM('WEEK', 'MONTH', 'QUARTER', 'HALF_YEAR', 'YEAR', 'NONE') NULL,
    MODIFY `renewalInterval` ENUM('QUARTER', 'YEAR', 'MONTH', 'HALF_YEAR') NULL;
