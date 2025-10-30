import { Dialog, Transition } from '@headlessui/react';
import classNames from 'classnames';
import { Fragment, ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: (() => void) | undefined;
  title?: string;
  children?: ReactNode;
  footer?: ReactNode;
  noPadding?: boolean;
  size?: 'md' | 'lg';
  onTransitionEnd?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  title,
  isOpen,
  onClose,
  children,
  footer,
  noPadding,
  size = 'md',
  onTransitionEnd,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={onClose ?? (() => {})}
        onTransitionEnd={!isOpen ? onTransitionEnd : undefined}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={classNames({
                  'w-full transform rounded-2xl bg-white text-left align-middle text-sm text-neutral-700 shadow-xl transition-all':
                    true,
                  'max-w-md': size === 'md',
                  'max-w-xl': size === 'lg',
                })}
              >
                <header className={`${noPadding ? 'p-0' : 'px-5 py-8 lg:p-8'}`}>
                  {title && (
                    <Dialog.Title
                      as="h3"
                      className={`font-heading text-base font-bold tracking-tight text-neutral-900 ${
                        noPadding ? 'p-5 lg:p-8' : ' mb-4'
                      } `}
                    >
                      {title}
                    </Dialog.Title>
                  )}
                  {children}
                </header>
                {footer && (
                  <footer className="flex flex-wrap justify-end gap-3 rounded-b-xl bg-neutral-50 px-5 py-6 lg:px-8">
                    {footer}
                  </footer>
                )}{' '}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default Modal;
