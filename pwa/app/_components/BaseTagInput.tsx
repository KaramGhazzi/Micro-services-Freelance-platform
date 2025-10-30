import React, {
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import classNames from 'classnames';
import IconXMd from './icons/IconXMd';

interface BaseTagInputProps {
  initialTags?: string[] | null;
  onTagsChange: (updatedTags: string[]) => void;
  placeholder?: string;
  label?: string;
  icon?: any;
  allowComma?: boolean;
}

export interface BaseTagInputRef {
  resetTags: () => void;
}

const BaseTagInput = forwardRef<BaseTagInputRef, BaseTagInputProps>(
  (
    {
      initialTags = [],
      onTagsChange,
      placeholder,
      label,
      icon,
      allowComma,
    }: BaseTagInputProps,
    ref
  ) => {
    const [tags, setTags] = useState<string[]>(initialTags || []);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
      if (initialTags && initialTags.length > 0) {
        setTags(initialTags);
      }
    }, [initialTags]);

    useImperativeHandle(ref, () => ({
      resetTags() {
        setTags([]);
        onTagsChange([]);
        if (inputRef.current) {
          inputRef.current.value = '';
        }
      },
    }));

    const commitTag = (target: HTMLInputElement) => {
      const newTags = allowComma
        ? [target.value.trim()]
        : target.value.split(',').map((tag) => tag.trim());
      const validNewTags = newTags.filter((tag) => tag !== '');

      if (validNewTags.length > 0) {
        const updatedTags = [...tags, ...validNewTags];
        setTags(updatedTags);
        onTagsChange(updatedTags);
        target.value = '';
      }
    };

    const handleTagClick = (tagToRemove: string) => {
      const updatedTags = tags.filter((tag) => tag !== tagToRemove);
      setTags(updatedTags);
      onTagsChange(updatedTags);
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' || (!allowComma && e.key === ',')) {
        e.preventDefault();

        commitTag(e.currentTarget);
      } else if (
        e.key === 'Backspace' &&
        e.currentTarget.value === '' &&
        tags.length > 0
      ) {
        e.preventDefault();
        const updatedTags = [...tags];
        const lastTag = updatedTags.pop();
        e.currentTarget.value = lastTag ?? '';
        setTags(updatedTags);
        onTagsChange(updatedTags);
      }
    };

    const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      e.preventDefault();

      commitTag(e.currentTarget);
    };

    return (
      <div className="grid gap-2">
        {label && (
          <label className="block text-sm font-medium text-neutral-700">
            {label}
          </label>
        )}
        <div
          className={classNames({
            'focus-within:border-secondary-300 no-scrollbar ring-secondary-500/20 relative z-10 flex min-h-[48px] w-full appearance-none items-center gap-1 rounded-lg border bg-white px-4 text-sm font-medium shadow-sm outline-none transition-all focus-within:ring-2':
              true,
            'border-neutral-200': tags?.length === 0,
            'border-neutral-300': tags?.length > 0,
            '!pl-10': icon,
          })}
        >
          {icon && (
            <div className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2">
              {icon}
            </div>
          )}

          <ul className="flex grow flex-wrap items-center justify-start gap-1 py-2">
            {tags.map((tag, index) => (
              <li
                key={index}
                className="relative z-10 flex h-6 items-center whitespace-nowrap rounded bg-neutral-700 px-2 text-xs font-semibold text-white hover:cursor-pointer hover:bg-neutral-900 hover:text-transparent"
                onClick={() => handleTagClick(tag)}
              >
                <span>{tag}</span>
                <span className="absolute inset-0 z-10 flex items-center justify-center text-white opacity-0 hover:opacity-100">
                  <IconXMd />
                </span>
              </li>
            ))}
            <div className="relative flex h-6 grow">
              <input
                ref={inputRef}
                type="text"
                placeholder={tags.length === 0 ? placeholder : ''}
                onKeyDown={handleInputKeyDown}
                onBlur={handleInputBlur}
                className="absolute -bottom-3 -right-3 -top-3 left-0 bg-transparent font-normal placeholder-neutral-300 focus:outline-none"
              />
            </div>
          </ul>
        </div>
      </div>
    );
  }
);

BaseTagInput.displayName = 'BaseTagInput';

export default BaseTagInput;
