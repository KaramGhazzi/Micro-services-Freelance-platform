-- CreateIndex
CREATE UNIQUE INDEX `Usage_companyId_type_objectId_key` ON `Usage`(`companyId`, `type`, `objectId`);
