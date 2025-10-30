SET @companyPremiumProfileProductId := (SELECT `id` FROM `Product` WHERE `slug` = 'COMPANY_PREMIUM_PROFILE');

INSERT INTO `Plan` (`externalProviderSync`, `slug`, `productId`, `usageType`)
    VALUES (0, 'company-premium-profile', @companyPremiumProfileProductId, 'COMPANY_PREMIUM_PROFILE')
    ON DUPLICATE KEY UPDATE slug = slug;