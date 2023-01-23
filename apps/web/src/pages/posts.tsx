import { GetServerSidePropsContext, NextPage } from "next";
import { getSession } from "next-auth/react";
import React from "react";
import PostFeed from "../components/PostFeed";
import Sidebar from "../components/Sidebar";
import UserList from "../components/UserList";
import { UserType } from "../types/mainTypes";

type PostsProps = {
  user: UserType;
};

const Posts: NextPage = (props) => {
  const { user } = props as PostsProps;

  return (
    <div className='relative flex h-screen w-full overflow-hidden'>
      <Sidebar />
      <div className='flex flex-1 items-stretch justify-start'>
        <UserList />
        <PostFeed />
      </div>
    </div>
  );
};

export default Posts;

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const session = await getSession(ctx);

  if (!session) {
    return {
      props: {},
    };
  }

  const { user } = session;

  return {
    props: {
      user,
    },
  };
}
