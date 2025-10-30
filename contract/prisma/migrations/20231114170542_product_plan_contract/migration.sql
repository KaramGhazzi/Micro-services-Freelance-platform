-- CreateTable
CREATE TABLE `Contract` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `companyId` INTEGER NOT NULL,
    `externalProviderId` VARCHAR(255) NULL,
    `planId` INTEGER NOT NULL,
    `startDate` DATETIME(3) NOT NULL,
    `endDate` DATETIME(3) NULL,
    `usageType` ENUM('ASSIGNMENT', 'ASSIGNMENT_VIEW', 'ASSIGNMENT_APPLICATION') NOT NULL,
    `usageAmount` INTEGER NULL,
    `usageInterval` ENUM('WEEK', 'MONTH', 'YEAR') NULL,
    `usageIntervalCount` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Plan` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `externalProviderId` VARCHAR(255) NULL,
    `externalProviderSync` BOOLEAN NOT NULL,
    `slug` VARCHAR(191) NULL,
    `productId` INTEGER NOT NULL,
    `usageType` ENUM('ASSIGNMENT', 'ASSIGNMENT_VIEW', 'ASSIGNMENT_APPLICATION') NOT NULL,
    `usageAmount` INTEGER NULL,
    `usageInterval` ENUM('WEEK', 'MONTH', 'YEAR') NULL,
    `usageIntervalCount` INTEGER NULL,

    UNIQUE INDEX `Plan_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Product` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `externalProviderId` VARCHAR(255) NULL,
    `externalProviderSync` BOOLEAN NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NULL,
    `description` TEXT NOT NULL,
    `type` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Product_slug_key`(`slug`),
    UNIQUE INDEX `Product_type_key`(`type`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Usage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` ENUM('ASSIGNMENT', 'ASSIGNMENT_VIEW', 'ASSIGNMENT_APPLICATION') NOT NULL,
    `amount` INTEGER NOT NULL,
    `companyId` INTEGER NOT NULL,
    `created` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Contract` ADD CONSTRAINT `Contract_planId_fkey` FOREIGN KEY (`planId`) REFERENCES `Plan`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Plan` ADD CONSTRAINT `Plan_productId_fkey` FOREIGN KEY (`productId`) REFERENCES `Product`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
