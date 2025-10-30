import Link from 'next/link';
import { ReactNode } from 'react';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  children?: ReactNode;
  menuItems: BaseOverflowMenuItem[];
}

export interface BaseOverflowMenuItem {
  type: 'link' | 'seperator';
  title?: string;
  href?: string;
  target?: '_blank' | '_self';
}

const BaseOverflowMenu: React.FC<Props> = ({ children, menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <div onClick={() => setIsOpen(!isOpen)}>{children}</div>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ translateY: 4, opacity: 0 }}
            animate={{ translateY: 0, opacity: 1 }}
            exit={{ translateY: 4, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute bottom-full left-0 right-0 mb-1 rounded-lg bg-neutral-800 py-1 text-sm font-medium shadow-md"
          >
            {menuItems.map((item, index) => {
              return (
                <li key={index}>
                  {item.type === 'seperator' && (
                    <div className="my-1 h-px w-full bg-neutral-700"></div>
                  )}
                  {item.type === 'link' && item?.href && (
                    <Link
                      href={item.href}
                      target={item.target || '_self'}
                      className="flex h-9 items-center px-4 font-medium text-neutral-200 transition-colors hover:bg-neutral-700 hover:text-white"
                    >
                      <span className="truncate">{item.title}</span>
                    </Link>
                  )}
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default BaseOverflowMenu;
