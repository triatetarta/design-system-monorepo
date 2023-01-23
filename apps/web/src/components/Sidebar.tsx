import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import Logo from "./Logo";

const Sidebar = () => {
  const { data: sessionData } = useSession();

  return (
    <aside className='relative mx-auto flex h-full w-[72px] flex-shrink-0 flex-col items-center py-3 px-1'>
      <div className='flex h-12 w-12 items-center justify-center rounded-full bg-not-quite-black text-white'>
        <Logo />
      </div>
      <div className='my-2 h-0.5 w-1/2 bg-not-quite-black' />

      {sessionData?.user?.image ? (
        <div className='overflow-hidden rounded-full'>
          <Image
            src={sessionData?.user?.image!}
            width={48}
            height={48}
            alt={`${sessionData?.user?.name} profile pic`}
          />
        </div>
      ) : (
        <div>{sessionData?.user?.name?.charAt(0)}</div>
      )}
    </aside>
  );
};

export default Sidebar;
