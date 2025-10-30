import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import './css/tippy.css';

interface Props {
  content: React.ReactNode;
  children: any;
  trigger?: 'mouseenter' | 'click';
  maxWidth?: 200 | 300 | 400;
}

const BaseTippy: React.FC<Props> = ({
  content,
  children,
  trigger = 'mouseenter',
  maxWidth,
}) => {
  return (
    <Tippy
      content={content}
      theme="neutral"
      trigger={trigger}
      offset={[0, 0]}
      maxWidth={maxWidth}
    >
      {children}
    </Tippy>
  );
};

export default BaseTippy;
