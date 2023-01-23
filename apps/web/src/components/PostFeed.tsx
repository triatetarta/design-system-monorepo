import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import useScrollPosition from "../hooks/useScrollPosition";
import { api, RouterInputs } from "../utils/api";
import CreatePost from "./CreatePost";
import Post from "./Post";

type PostFeedProps = {
  where?: RouterInputs["post"]["getPosts"]["where"];
};

const LIMIT = 10;

const PostFeed = ({ where = {} }: PostFeedProps) => {
  const scrollPosition = useScrollPosition();
  const { data, isFetching, hasNextPage, fetchNextPage } =
    api.post.getPosts.useInfiniteQuery(
      {
        limit: LIMIT,
        where,
      },
      {
        getNextPageParam: (lastPage) => lastPage.nextCursor,
      }
    );

  const client = useQueryClient();

  const posts = data?.pages.flatMap((page) => page.posts) ?? [];

  useEffect(() => {
    if (scrollPosition > 90 && hasNextPage && !isFetching) {
      fetchNextPage();
    }
  }, [fetchNextPage, hasNextPage, isFetching, scrollPosition]);

  return (
    <div className='relative flex flex-1 flex-col overflow-hidden bg-not-dark-gray'>
      <div className='border-b border-b-dark-not-black py-3 px-4 font-medium text-white shadow-sm'>
        #main
      </div>

      <CreatePost />

      <div className='overflow-y-scroll px-4'>
        {posts.map((post) => {
          return (
            <Post
              key={post.id}
              post={post}
              client={client}
              input={{
                where,
                limit: LIMIT,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PostFeed;
