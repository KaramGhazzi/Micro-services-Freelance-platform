import IconArrowsCrossing from '@/app/_components/icons/IconArrowsCrossing';
import { CurrentUser } from '@/app/(dashboard)/_context/CurrentUserContext';
import { BaseUserMenuItem } from '@/app/_components/user-menu/BaseUserMenu';

type CurrentUserContext = {
  currentUser?: CurrentUser;
};

export default function currentUserMenuItems(
  currentUserContext: CurrentUserContext
): BaseUserMenuItem[] {
  const items: BaseUserMenuItem[] = [];

  if (currentUserContext?.currentUser?.userCompanies?.length) {
    items.push({
      type: 'link',
      title: 'userMenu.platform',
      href: '/dashboard',
      icon: IconArrowsCrossing,
    });
  }

  return items;
}
