import translations from '@package/translation/messages/nl.json';

export const basicMyCompanyToolbarTabs = [
  {
    name: translations.navigation['company-settings'],
    href: '/account/mijn-bedrijf',
  },
  {
    name: translations.navigation['company-profile'],
    href: '/account/mijn-bedrijf/bedrijfsprofiel',
    permissions: ['company:update'],
  },
  {
    name: translations.navigation['reviews'],
    href: '/account/mijn-bedrijf/beoordelingen',
    permissions: ['company:update'],
  },
];
