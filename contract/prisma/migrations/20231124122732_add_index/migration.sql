-- RedefineIndex
CREATE UNIQUE INDEX `ExternalProviderCompany_externalProviderId_key` ON `ExternalProviderCompany`(`externalProviderId`);
DROP INDEX `Company_externalProviderId_key` ON `ExternalProviderCompany`;
