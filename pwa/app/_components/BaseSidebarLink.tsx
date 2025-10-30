'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';

interface BaseSidebarLinkProps {
  item: {
    title: string;
    href?: string;
    icon?: any;
  };
}

type BaseSidebarItem = {
  title: string;
  href?: string;
  items?: BaseSidebarItem[];
  collapsed?: boolean;
};

const BaseSidebarLink: React.FC<BaseSidebarLinkProps> = ({ item }) => {
  const currentRoute = usePathname();
  const t = useTranslations('navigation');

  function isActive(item: BaseSidebarItem) {
    return item?.href && currentRoute.includes(item.href);
  }

  return (
    <Link
      className={classNames({
        'flex h-10 items-center gap-3 rounded-lg px-2 text-sm font-medium tracking-wide text-neutral-200 transition-all hover:bg-neutral-950 hover:text-white':
          true,
        '!bg-neutral-800 text-white hover:bg-neutral-800': isActive(item),
      })}
      href={item.href ?? '/'}
    >
      {item?.icon && <item.icon active={isActive(item)} />}
      <span className="truncate">{t(item.title)}</span>
    </Link>
  );
};

export default BaseSidebarLink;
