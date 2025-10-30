import BaseUserAvatar from '@/app/_components/BaseUserAvatar';
import IconArrowsCrossing from '@/app/_components/icons/IconArrowsCrossing';

interface User {
  name: string;
  subtitle: string;
  imageUrl: string | null | undefined;
}

interface PeopleProps {
  users: User[];
}

const People: React.FC<PeopleProps> = ({ users }) => {
  return (
    <>
      {users && users.length > 1 && (
        <div className="mb-4 flex min-w-0 justify-center gap-5 overflow-hidden">
          <div className="flex w-28 min-w-0 shrink-0 flex-col items-center gap-3 lg:w-40">
            <BaseUserAvatar size="lg" url={users[0].imageUrl} />
            <header className="w-full text-center">
              <p className="truncate text-sm font-semibold">{users[0].name}</p>
              <p className="truncate text-sm text-neutral-500">
                {users[0].subtitle}
              </p>
            </header>
          </div>
          <IconArrowsCrossing className="mt-9 shrink-0" />
          <div className="flex w-28 min-w-0 shrink-0 flex-col items-center gap-3 lg:w-40">
            <BaseUserAvatar size="lg" url={users[1].imageUrl} />
            <header className="w-full text-center">
              <p className="truncate  text-sm font-semibold">{users[1].name}</p>
              <p className="truncate text-sm text-neutral-500">
                {users[1].subtitle}
              </p>
            </header>
          </div>
        </div>
      )}
    </>
  );
};

export default People;
