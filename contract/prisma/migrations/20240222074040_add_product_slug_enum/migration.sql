-- -- We dont want this one back, plan slugs are no longer unique.
DROP INDEX `Plan_slug_key` ON `Plan`;

ALTER TABLE `Plan` DROP FOREIGN KEY `Plan_productId_fkey`;
ALTER TABLE `Checkout` DROP FOREIGN KEY `Checkout_planId_fkey`;
ALTER TABLE `Contract` DROP FOREIGN KEY `Contract_planId_fkey`;

TRUNCATE Contract;
TRUNCATE Plan;
TRUNCATE Checkout;
TRUNCATE Product;

--  -- DropIndex
DROP INDEX `Product_slug_key` ON `Product`;

-- AlterTable
ALTER TABLE `Product` 
    MODIFY `slug` ENUM('FREELANCER_BASIC', 'FREELANCER_PRO', 'COMPANY_BASIC', 'COMPANY_TOP', 'COMPANY_PREMIUM_PROFILE', 'MARKETMONITOR_BASIC') NOT NULL,
    ADD UNIQUE INDEX `Product_slug_key` (`slug`);

-- AddForeignKey
ALTER TABLE `Checkout` ADD CONSTRAINT `Checkout_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `Plan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Contract` ADD CONSTRAINT `Contract_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `Plan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plan` ADD CONSTRAINT `Plan_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

INSERT INTO `Product` (`externalProviderSync`, `name`, `slug`, `description`, `modeType`)
VALUES 
(0,'Basic - Opdrachten zoeken','FREELANCER_BASIC','Basic - Opdrachten zoeken',NULL),
(1,'Pro - Opdrachten zoeken','FREELANCER_PRO','Pro - Opdrachten zoeken','SUBSCRIPTION'),
(0,'Basic - Opdrachten plaatsen','COMPANY_BASIC','Basic - Opdrachten plaatsen',NULL),
(1,'Top opdrachten','COMPANY_TOP','Top opdrachten','PAYMENT'),
(0,'Premium bedrijfsprofiel','COMPANY_PREMIUM_PROFILE','Premium bedrijfsprofiel',NULL),
(0,'Basic - Markt Monitor','MARKETMONITOR_BASIC','Basic - Markt Monitor',NULL);
 
 
SET @freelancerBasicProductId := (SELECT `id` FROM `Product` WHERE `slug` = 'FREELANCER_BASIC'); 
SET @freelancerProProductId := (SELECT `id` FROM `Product` WHERE `slug` = 'FREELANCER_PRO');
SET @companyBasicProductId := (SELECT `id` FROM `Product` WHERE `slug` = 'COMPANY_BASIC');
SET @companyTopProductId := (SELECT `id` FROM `Product` WHERE `slug` = 'COMPANY_TOP'); 
SET @marketMonitorBasicProductId := (SELECT `id` FROM `Product` WHERE `slug` = 'MARKETMONITOR_BASIC');
 
INSERT INTO `Plan` (`externalProviderSync`, `slug`, `productId`, `usageType`, `usageAmount`, `usageInterval`, `usageIntervalCount`, `renewalInterval`) 
VALUES 
(0,'freelancer-basic',@freelancerBasicProductId,'ASSIGNMENT_APPLICATION',20,'WEEK',1,NULL),
(1,'pro-search-3-month',@freelancerProProductId,'ASSIGNMENT_APPLICATION',50,'WEEK',1,'QUARTER'),
(1,'pro-search-1-year',@freelancerProProductId,'ASSIGNMENT_APPLICATION',50,'WEEK',1,'YEAR'),
(0,'company-basic',@companyBasicProductId,'ASSIGNMENT',3,'NONE',0,NULL),
(1,'top-assignment-1',@companyTopProductId,'ASSIGNMENT',1,'NONE',NULL,NULL),
(1,'top-assignment-2-4',@companyTopProductId,'ASSIGNMENT',2,'NONE',NULL,NULL),
(1,'top-assignment-2-4',@companyTopProductId,'ASSIGNMENT',3,'NONE',NULL,NULL),
(1,'top-assignment-2-4',@companyTopProductId,'ASSIGNMENT',4,'NONE',NULL,NULL),
(1,'top-assignment-5-9',@companyTopProductId,'ASSIGNMENT',5,'NONE',NULL,NULL),
(1,'top-assignment-5-9',@companyTopProductId,'ASSIGNMENT',6,'NONE',NULL,NULL),
(1,'top-assignment-5-9',@companyTopProductId,'ASSIGNMENT',7,'NONE',NULL,NULL),
(1,'top-assignment-5-9',@companyTopProductId,'ASSIGNMENT',8,'NONE',NULL,NULL),
(1,'top-assignment-5-9',@companyTopProductId,'ASSIGNMENT',9,'NONE',NULL,NULL),
(1,'top-assignment-10',@companyTopProductId,'ASSIGNMENT',10,'NONE',NULL,NULL),
(0,'basic-marketmonitor',@marketMonitorBasicProductId,'ASSIGNMENT_VIEW',50,'NONE',NULL,NULL);