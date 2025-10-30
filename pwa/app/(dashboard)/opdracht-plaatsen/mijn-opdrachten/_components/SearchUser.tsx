import { ChangeEvent, useState } from 'react';
import BaseInput from '@/app/_components/BaseInput';
import BaseUserAvatar from '@/app/_components/BaseUserAvatar';
import IconSearch from '@/app/_components/icons/IconSearch';
import { User } from '@/graphql/types';
import { getImageUrl } from '@/app/(dashboard)/_utils/getImageUrl';

interface Props {
  label?: string;
  placeholder: string;
  hideSelectedUser?: boolean;
  popOverResults?: boolean;
  users: User[];
  companyName: string | null | undefined;
  onUserSelect: (selectedUser: User | null) => void;
}

const SearchUser = ({
  label,
  placeholder,
  hideSelectedUser,
  popOverResults,
  users,
  companyName,
  onUserSelect,
}: Props) => {
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showResults, setShowResults] = useState(true);

  let filteredUsers = users.filter((user: User) => {
    const name = `${user.firstName} ${user.lastName}`;
    return name.toLowerCase().includes(search.toLowerCase());
  });

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value === '') {
      onUserSelect(null);
    }
    setSearch(value);
    setShowResults(true);
  };

  const handleUserClick = (user: User) => {
    if (hideSelectedUser) {
      setSearch(`${user.firstName} ${user.lastName}`);
      setShowResults(false);
    } else {
      setSearch('');
      setShowResults(true);
    }
    setSelectedUser(user);
    onUserSelect(user);
  };

  return (
    <div className={`${popOverResults ? 'relative' : 'grid gap-1'}`}>
      <BaseInput
        label={label}
        placeholder={placeholder}
        name="searchUser"
        value={search}
        onChange={handleSearchChange}
        type="text"
        autoFocus
        icon={<IconSearch className="text-neutral-600" />}
      />

      {showResults && search.length >= 3 && filteredUsers.length > 0 && (
        <div
          className={`${
            popOverResults ? 'absolute' : ''
          } z-10 mt-2 max-h-[96px] overflow-y-auto rounded-lg border border-neutral-100 bg-white py-2 shadow-sm`}
        >
          <ul>
            {filteredUsers.map((user: User) => (
              <li
                key={user.id}
                className="group flex h-8 cursor-pointer items-center gap-2 px-3 hover:bg-neutral-50"
                onClick={() => handleUserClick(user)}
              >
                <BaseUserAvatar
                  size="2xs"
                  url={
                    user.profilePhoto
                      ? getImageUrl(
                          user?.profilePhoto?.container,
                          user?.profilePhoto?.blobName
                        )
                      : null
                  }
                />
                <div className="truncate text-sm font-medium group-hover:text-neutral-900">
                  {`${user.firstName} ${user.lastName}`}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {!hideSelectedUser && selectedUser && (
        <div className="mt-5 flex items-center gap-4">
          <BaseUserAvatar
            size="md"
            url={
              selectedUser.profilePhoto
                ? getImageUrl(
                    selectedUser?.profilePhoto?.container,
                    selectedUser?.profilePhoto?.blobName
                  )
                : null
            }
          />
          <div>
            <h4 className="font-semibold text-neutral-900">
              {`${selectedUser.firstName} ${selectedUser.lastName}`}
            </h4>
            <p>{companyName}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchUser;
