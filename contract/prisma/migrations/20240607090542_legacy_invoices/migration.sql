-- CreateTable
CREATE TABLE `LegacyInvoice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `companyId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL,
    `description` VARCHAR(191) NULL,
    `firstName` VARCHAR(191) NULL,
    `lastName` VARCHAR(191) NULL,
    `addressLine1` VARCHAR(191) NULL,
    `addressLine2` VARCHAR(191) NULL,
    `postalCode` VARCHAR(191) NULL,
    `city` VARCHAR(191) NULL,
    `status` ENUM('NEW', 'REMOVED', 'PAID', 'CREDITED', 'EXPIRED', 'OPEN', 'COLLECTION', 'COLLECTIONSENT', 'INTERNAL_PENDING', 'PENDING', 'CREDIT', 'CREDIT_PENDING', 'CREDIT_FAIL') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `LegacyInvoiceItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `legacyInvoiceId` INTEGER NOT NULL,
    `contractId` INTEGER NOT NULL,
    `invoiceItemCode` ENUM('CONTRACT', 'CREDIT', 'DISCOUNT') NOT NULL,
    `description` VARCHAR(191) NULL,
    `startDate` DATETIME(3) NULL,
    `endDate` DATETIME(3) NOT NULL,
    `amount` INTEGER NOT NULL,
    `price` INTEGER NOT NULL,
    `taxPercent` INTEGER NOT NULL DEFAULT 21,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `LegacyInvoiceItem` ADD CONSTRAINT `LegacyInvoiceItem_legacyInvoiceId_fkey` FOREIGN KEY (`legacyInvoiceId`) REFERENCES `LegacyInvoice`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
