import classNames from 'classnames';

interface ChecktagProps {
  label: string;
  name: string;
  checked: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const BaseChecktag: React.FC<ChecktagProps> = ({
  label,
  checked,
  onChange,
  name,
}) => {
  return (
    <div>
      <label
        className={classNames({
          'relative inline-flex h-8 cursor-pointer items-center gap-2 rounded px-3 text-sm font-semibold transition-all':
            true,
          'bg-neutral-700 text-white hover:bg-neutral-900': checked,
          'bg-neutral-50 text-neutral-900 hover:bg-neutral-100': !checked,
        })}
      >
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          className="invisible absolute"
        />
        <span>{label}</span>
      </label>
    </div>
  );
};

export default BaseChecktag;
