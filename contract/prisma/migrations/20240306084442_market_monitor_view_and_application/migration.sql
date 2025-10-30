ALTER TABLE `Product` 
    MODIFY `slug` ENUM('FREELANCER_BASIC', 'FREELANCER_PRO', 'COMPANY_BASIC', 'COMPANY_TOP', 'COMPANY_PREMIUM_PROFILE', 'MARKETMONITOR_BASIC', 'MARKETMONITOR_BASIC_VIEW', 'MARKETMONITOR_BASIC_APPLICATION') NOT NULL;

UPDATE `Product` set `slug` = 'MARKETMONITOR_BASIC_VIEW', `name` = 'Basic - Market Monitor - View', `description` = 'Basic - Market Monitor - View' WHERE `slug` = 'MARKETMONITOR_BASIC';

ALTER TABLE `Product` 
    MODIFY `slug` ENUM('FREELANCER_BASIC', 'FREELANCER_PRO', 'COMPANY_BASIC', 'COMPANY_TOP', 'COMPANY_PREMIUM_PROFILE', 'MARKETMONITOR_BASIC_VIEW', 'MARKETMONITOR_BASIC_APPLICATION') NOT NULL;

UPDATE `Plan` set `slug` = 'marketmonitor-basic-view' WHERE `slug` = 'basic-marketmonitor';
INSERT INTO `Product` (`externalProviderSync`, `name`, `slug`, `description`)
VALUES
	(0, 'Basic - Market Monitor - Application', 'MARKETMONITOR_BASIC_APPLICATION', 'Basic - Market Monitor - Application');
SET @marketMonitorBasicApplicationProductId := (SELECT `id` FROM `Product` WHERE `slug` = 'MARKETMONITOR_BASIC_APPLICATION');
INSERT INTO `Plan` (`externalProviderSync`, `slug`, `productId`, `usageType`, `usageAmount`, `usageInterval`)
VALUES
	(0, 'marketmonitor-basic-application', @marketMonitorBasicApplicationProductId, 'ASSIGNMENT_APPLICATION', 50, 'NONE');
