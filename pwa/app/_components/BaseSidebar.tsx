import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';

import IconRocket from '../(dashboard)/_components/layout/sidebar/icons/IconRocket';
// import { BaseOverflowMenuItem } from './BaseOverflowMenu';
import BaseSidebarLink from './BaseSidebarLink';
// import IconMoreDots from './icons/IconMoreDots';

import WithPermissions from './WithPermissions';
import IconChevronDown from '@/app/_components/icons/IconChevronDown';

interface Item {
  title: string;
  href: string;
  icon?: any;
}

interface Section {
  title: string | null;
  collapsed: boolean;
  items: Item[];
}

export interface BaseSidebarSectionItemProps {
  title: string;
  icon?: object;
  href: string;
}

export type BaseSidebarSection = {
  title: string | null;
  collapsed: boolean;
  items: BaseSidebarSectionItemProps[];
};

interface BaseSidebarProps {
  sidebarSections: BaseSidebarSection[];
  // overflowMenuItems?: BaseOverflowMenuItem[];
  showProMenuItem?: boolean;
}

const BaseSidebar: React.FC<BaseSidebarProps> = ({
  sidebarSections,
  // overflowMenuItems = [],
  showProMenuItem = true,
}) => {
  const t = useTranslations('navigation');

  const [sections, setSections] = useState<Section[]>(sidebarSections);

  const toggleSection = (index: number) => {
    const updatedSections = [...sections];
    updatedSections[index].collapsed = !updatedSections[index].collapsed;
    setSections(updatedSections);
  };

  useEffect(() => {
    const initialSections = sidebarSections?.map((section) => ({
      ...section,
    }));

    setSections(initialSections);
  }, [sidebarSections]);

  return (
    <nav className="no-scrollbar flex h-[calc(100vh-128px)] flex-col gap-8 overflow-y-auto bg-neutral-900 px-4 py-5 pb-20 lg:h-full lg:pb-5">
      <div className="flex flex-grow flex-col gap-4">
        {sections?.map((section, index) => (
          <section key={index}>
            {section.title && (
              <header
                className="group flex h-8 cursor-pointer items-center justify-between px-2 text-neutral-400"
                onClick={() => toggleSection(index)}
              >
                <h4 className="text-xs font-semibold">{t(section.title)}</h4>
                <IconChevronDown
                  className={classNames({
                    'transition-all group-hover:text-white': true,
                    'rotate-180': !section.collapsed,
                  })}
                />
              </header>
            )}
            <AnimatePresence initial={false}>
              {!section.collapsed && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-grow flex-col overflow-hidden"
                >
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <BaseSidebarLink item={item} />
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </section>
        ))}
      </div>
      <ul className="flex flex-col gap-1">
        {showProMenuItem && (
          <WithPermissions permissions={['subscription:create']}>
            <li>
              <BaseSidebarLink
                item={{
                  title: 'pro',
                  href: '/pro',
                  icon: IconRocket,
                }}
              />
            </li>
          </WithPermissions>
        )}
        {/* <li className="relative">
            {overflowMenuItems?.length > 0 && (
              <BaseOverflowMenu menuItems={overflowMenuItems}>
                <BaseSidebarLink
                  item={{
                    title: 'more',
                    href: '#',
                    icon: IconMoreDots,
                  }}
                />
              </BaseOverflowMenu>
            )}
          </li> */}
      </ul>
    </nav>
  );
};

export default BaseSidebar;
