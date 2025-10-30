import IconArrowsCrossing from '../../_components/icons/IconArrowsCrossing';
import IconCog from '@/app/_components/icons/IconCog';
import IconProducts from '@/app/_components/icons/IconProducts';
import IconUser from '@/app/_components/icons/IconUser';
import { BaseUserMenuItem } from '@/app/_components/user-menu/BaseUserMenu';
import IconBuilding from '@/app/_components/icons/IconBuilding';
import IconCompanyGuide from '@/app/_components/icons/IconCompanyGuide';
import IconInsurance from '@/app/_components/icons/IconInsurance';
import IconAskQuestion from '@/app/_components/icons/IconAskQuestion';

type CurrentUserContext = {
  hasCompany?: boolean;
  isCompany?: boolean;
  isAdminUser?: boolean;
};

export default function currentUserMenuItems(
  currentUserContext: CurrentUserContext
): BaseUserMenuItem[] {
  const items: BaseUserMenuItem[] = [
    {
      type: 'link',
      title: 'userMenu.account',
      href: '/account-instellingen/persoonlijk',
      icon: IconCog,
    },
    {
      type: 'link',
      title: 'userMenu.myCompany',
      href: '/account/mijn-bedrijf',
      icon: IconBuilding,
      permissions: ['user:get-collection'],
    },
    {
      type: 'link',
      title: 'userMenu.products',
      href: '/account/mijn-producten/abonnementen',
      icon: IconProducts,
      permissions: ['subscription:get-collection'],
    },
  ];

  if (currentUserContext?.isCompany) {
    items.push({
      type: 'link',
      title: 'userMenu.users',
      href: '/account/gebruikers',
      icon: IconUser,
      permissions: ['user:get-collection'],
    });
  }

  items.push({
    type: 'seperator',
  });

  items.push({
    type: 'link',
    title: 'userMenu.companyGuide',
    href: 'https://www.freelance.nl/bedrijvengids',
    target: '_blank',
    icon: IconCompanyGuide,
  });

  items.push({
    type: 'link',
    title: 'userMenu.helpCenter',
    href: currentUserContext?.isCompany
      ? 'https://helpcenter.freelance.nl/organisatie'
      : 'https://helpcenter.freelance.nl/freelancer',
    target: '_blank',
    icon: IconAskQuestion,
  });

  if (!currentUserContext?.isCompany) {
    items.push({
      type: 'link',
      title: 'userMenu.insurances',
      href: 'https://lp.freelance.nl/verzekeren',
      target: '_blank',
      icon: IconInsurance,
    });
  }

  if (currentUserContext?.isAdminUser) {
    items.push({
      type: 'link',
      title: 'userMenu.admin',
      href: '/admin/dashboard',
      icon: IconArrowsCrossing,
    });
  }

  /**
   * One should be setup before navigating to the account page (FNG-3693)
   * `hasCompany` can be null/undefined when we do not explicitly want to trigger this behaviour, which is why we test against false with type safety.
   */
  if (currentUserContext.hasCompany === false) {
    return items.filter((item) => item.title !== 'userMenu.account');
  }

  return items;
}
