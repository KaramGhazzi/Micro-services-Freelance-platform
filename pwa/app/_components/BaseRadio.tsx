import classNames from 'classnames';
import Link from 'next/link';

interface RadioProps {
  label: string;
  name: string;
  checked: boolean;
  required?: boolean;
  value?: string;
  link?: {
    text: string;
    url: string;
    target?: string;
  };
  hideRadio?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const BaseRadio: React.FC<RadioProps> = ({
  label,
  checked,
  required,
  link,
  onChange,
  name,
  value,
  hideRadio,
}) => {
  return (
    <div>
      <label className="relative inline-flex cursor-pointer gap-2 text-sm font-medium">
        <input
          type="radio"
          name={name}
          checked={checked}
          onChange={onChange}
          required={required}
          value={value}
          className="invisible absolute"
        />
        {!hideRadio && (
          <div className="relative flex h-5 w-5 items-center justify-center">
            <span
              className={classNames({
                'h-4 w-4 rounded-full border shadow-sm transition-all': true,
                'bg-primary-600 ring-primary-500/20 border-transparent ring-2':
                  checked,
                'border-neutral-200': !checked,
              })}
            >
              <i className="absolute inset-[3px] rounded-full border-[3px] border-white"></i>
            </span>
          </div>
        )}
        <div
          className={classNames({
            'transition-all': true,
            'text-neutral-900': checked,
            'text-neutral-700': !checked,
          })}
        >
          {label}{' '}
          {link && (
            <Link
              href={link?.url}
              target={link.target ?? '_self'}
              className="text-primary-600 font-medium hover:underline"
            >
              {link?.text}
            </Link>
          )}
        </div>
      </label>
    </div>
  );
};

export default BaseRadio;
