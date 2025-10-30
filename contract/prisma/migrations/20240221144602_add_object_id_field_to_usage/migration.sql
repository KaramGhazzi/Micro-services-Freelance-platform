-- AlterTable
ALTER TABLE `Usage` ADD COLUMN `objectId` INTEGER NULL;
INSERT INTO `Product` (`id`, `externalProviderId`, `externalProviderSync`, `name`, `slug`, `description`, `modeType`)
VALUES
	(NULL, NULL, 0, 'Basic - Market Monitor', 'basic-marketmonitor', 'Basic - Market Monitor', NULL);
INSERT INTO `Plan` (`id`, `externalProviderId`, `externalProviderSync`, `slug`, `productId`, `usageType`, `usageAmount`, `usageInterval`, `usageIntervalCount`, `renewalInterval`)
VALUES
	(NULL, NULL, 0, 'basic-marketmonitor', (SELECT `id` FROM `Product` WHERE `slug` = 'basic-marketmonitor'), 'ASSIGNMENT_VIEW', 50, 'NONE', NULL, NULL);
