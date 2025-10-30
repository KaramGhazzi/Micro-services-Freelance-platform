-- AlterTable
ALTER TABLE `Product` ADD COLUMN `modeType` ENUM('PAYMENT', 'SETUP', 'SUBSCRIPTION') NULL;

UPDATE Product SET modeType = 'SUBSCRIPTION' WHERE slug = "pro-search";

INSERT INTO `Product` (`externalProviderId`, `externalProviderSync`, `name`, `slug`, `description`, `modeType`)
VALUES
	('prod_PRj994lEI8D1V4', 1, 'Top opdrachten', 'company-top-assignments', 'Top opdrachten', 'PAYMENT')
ON DUPLICATE KEY UPDATE	`externalProviderSync` = 1;

INSERT INTO `Plan` (`externalProviderId`, `externalProviderSync`, `slug`, `productId`, `usageType`, `usageAmount`, `usageInterval`, `usageIntervalCount`, `renewalInterval`)
VALUES
	('price_1OcpgxH07tDKRxKAp9G7PbDx', 1, 'top-assignment-1', (SELECT `id` FROM `Product` where slug = 'company-top-assignments'), 'ASSIGNMENT', 1, 'NONE', NULL, NULL),
	('price_1OcpnTH07tDKRxKAoR0gVUO9', 1, 'top-assignment-2', (SELECT `id` FROM `Product` where slug = 'company-top-assignments'), 'ASSIGNMENT', 2, 'NONE', NULL, NULL),
	('price_1OcpnpH07tDKRxKAWG2DJvdI', 1, 'top-assignment-3', (SELECT `id` FROM `Product` where slug = 'company-top-assignments'), 'ASSIGNMENT', 3, 'NONE', NULL, NULL)
ON DUPLICATE KEY UPDATE	`externalProviderSync` = 1;
