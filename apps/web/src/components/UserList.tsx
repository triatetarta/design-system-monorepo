import Image from "next/image";
import { api } from "../utils/api";

const UserList = () => {
  const { data: usersData } = api.user.getAllUsers.useQuery();

  return (
    <div className='flex w-[240px] flex-none select-none flex-col space-y-5 bg-not-quite-black'>
      <div className='border-b border-b-dark-not-black py-3 px-4 font-medium text-white shadow-sm'>
        User List
      </div>

      <ul className='flex flex-col space-y-3 px-4'>
        {usersData?.map((user) => {
          return (
            <li key={user.id} className='flex items-center space-x-2'>
              {user.image ? (
                <span className='h-6 w-6 overflow-hidden rounded-full'>
                  <Image
                    src={user.image}
                    width={24}
                    height={24}
                    alt={`${user.name} profile picture`}
                  />
                </span>
              ) : (
                <div>{user.name?.charAt(0)}</div>
              )}

              <span className='text-sm font-medium text-white/50'>
                {user.name}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserList;
