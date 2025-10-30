-- AlterTable
ALTER TABLE `Product` MODIFY `slug` ENUM('FREELANCER_BASIC', 'FREELANCER_PRO', 'COMPANY_BASIC', 'COMPANY_TOP', 'COMPANY_PREMIUM_ASSIGNMENT', 'COMPANY_PREMIUM_PROFILE', 'MARKETMONITOR_BASIC_VIEW', 'MARKETMONITOR_BASIC_APPLICATION', 'MARKETMONITOR_PREMIUM_VIEW', 'MARKETMONITOR_PREMIUM_APPLICATION', 'TOP_BOX') NOT NULL;


INSERT INTO `Product` (`externalProviderSync`, `name`, `slug`, `description`) VALUES
(0, 'Premium - Opdrachten', 'COMPANY_PREMIUM_ASSIGNMENT', 'Premium - Opdrachten');

SET @premiumAssignmentsProductId := (SELECT id FROM `Product` WHERE `slug` = 'COMPANY_PREMIUM_ASSIGNMENT');

INSERT INTO `Plan` (`externalProviderSync`, `slug`, `productId`, `usageType`) VALUES
(0, 'company-premium-assignment', @premiumAssignmentsProductId, 'ASSIGNMENT');
