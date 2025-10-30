-- AlterTable
ALTER TABLE `Contract` MODIFY `invoiceId` VARCHAR(255) NULL;

-- Update the usageAmount for the Plan with slug 'company-basic'
UPDATE Plan
SET usageAmount = 1
WHERE slug = 'company-basic' AND usageAmount = 3;
