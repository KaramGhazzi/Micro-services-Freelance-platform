import React, { useEffect, useState, useRef } from 'react';
import classNames from 'classnames';
import IconChevronDown from './icons/IconChevronDown';

interface ContentContainerProps {
  content: string;
  maxHeight?: number;
}

const ContentContainer: React.FC<ContentContainerProps> = ({
  content,
  maxHeight = 140,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);
  const [height, setHeight] = useState(0);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (elementRef.current) {
      setHeight(elementRef?.current.offsetHeight);
      setIsExpanded(height > maxHeight);
    }
  }, []);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const classes = classNames(
    ' text-sm leading-7 text-neutral-700 transition-all',
    {
      'overflow-hidden max-h-[140px]': !isExpanded,
      'overflow-auto max-h-fit': isExpanded,
    }
  );

  return (
    <div>
      <div ref={elementRef} className={classes}>
        {content}
      </div>

      {height > maxHeight && (
        <button
          className="text-primary-600 mt-2 flex items-center gap-1 text-sm font-semibold"
          onClick={toggleExpand}
        >
          {!isExpanded ? 'Lees verder' : 'Tekst inkorten'}
          <IconChevronDown
            className={`text-primary-600 transition-all ${
              isExpanded ? 'rotate-180' : ''
            }`}
          />
        </button>
      )}
    </div>
  );
};

export default ContentContainer;
