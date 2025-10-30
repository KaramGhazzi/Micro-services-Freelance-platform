-- AlterTable
ALTER TABLE `Product` MODIFY `slug` ENUM('FREELANCER_BASIC', 'FREELANCER_PRO', 'COMPANY_BASIC', 'COMPANY_TOP', 'COMPANY_PREMIUM_PROFILE', 'MARKETMONITOR_BASIC_VIEW', 'MARKETMONITOR_BASIC_APPLICATION', 'MARKETMONITOR_PREMIUM_VIEW', 'MARKETMONITOR_PREMIUM_APPLICATION') NOT NULL;

INSERT INTO `Product` (`externalProviderSync`, `name`, `slug`, `description`)
VALUES
	(0, 'Premium - Market Monitor - View', 'MARKETMONITOR_PREMIUM_VIEW', 'Premium - Market Monitor - View'),
	(0, 'Premium - Market Monitor - Application', 'MARKETMONITOR_PREMIUM_APPLICATION', 'Premium - Market Monitor - Application');

    SET @marketMonitorPremiumViewProductId := (SELECT `id` FROM `Product` WHERE `slug` = 'MARKETMONITOR_PREMIUM_VIEW');
    SET @marketMonitorPremiumApplicationProductId := (SELECT `id` FROM `Product` WHERE `slug` = 'MARKETMONITOR_PREMIUM_APPLICATION');
INSERT INTO `Plan` (`externalProviderSync`, `slug`, `productId`, `usageType`, `usageAmount`, `usageInterval`)
VALUES
    (0, 'marketmonitor-premium-view', @marketMonitorPremiumViewProductId, 'ASSIGNMENT_VIEW', 50, 'NONE'),
    (0, 'marketmonitor-premium-application', @marketMonitorPremiumApplicationProductId, 'ASSIGNMENT_APPLICATION', 50, 'NONE');
