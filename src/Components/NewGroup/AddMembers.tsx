import { BiSearch } from 'react-icons/bi';
import {  Key, useState } from 'react';
import { useSearchUsersQuery } from '../../apis/authApi';

interface AddMembersProps {
  submitFn: () => void;
}

const AddMembers: React.FC<AddMembersProps> = ({ submitFn }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { data: users, error, isLoading } = useSearchUsersQuery(searchTerm, {
    skip: !searchTerm, // Skip the query until there's a search term
  });
  console.log(users)
  return (
    <div>
      <div className="relative grow">
        <input
          type="text"
          className="w-full bg-[var(--accent-color-light)] dark:bg-[var(--accent-color)] shadow-sm dark:text-[var(--text-secondary)] text-[var(--text-secondary-light)] rounded focus:outline-none py-1 px-3 focus:shadow-lg"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <BiSearch className="absolute right-3 top-2 text-[var(--text-secondary)]" />
      </div>
      <button
        className="mt-2 py-1 px-2 rounded-lg dark:bg-accent-color bg-accent-color-light dark:text-text-secondary text-text-secondary-light text-lg"
        onClick={submitFn}
      >
        Add
      </button>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error fetching users</p>
        ) : (
          <ul>
            {users?.map((user: { id: Key; name: string;}) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AddMembers;
