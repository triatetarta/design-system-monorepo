import { InfiniteData, QueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { api, RouterInputs, RouterOutputs } from "../utils/api";

type PostProps = {
  client: QueryClient;
  input: RouterInputs["post"]["getPosts"];
  post: RouterOutputs["post"]["getPosts"]["posts"][number];
};

type UpdateCacheParams = {
  client: QueryClient;
  input: RouterInputs["post"]["getPosts"];
  variables: {
    postId: string;
  };
  data: { userId: string };
  action: "Like" | "Unlike";
};

const updateCache = ({
  client,
  variables,
  data,
  action,
  input,
}: UpdateCacheParams) => {
  client.setQueryData(
    [
      ["post", "getPosts"],
      {
        input,
        type: "infinite",
      },
    ],
    (oldData) => {
      const newData = oldData as InfiniteData<
        RouterOutputs["post"]["getPosts"]
      >;

      const value = action === "Like" ? 1 : -1;

      const newPosts = newData.pages.map((page) => {
        return {
          posts: page.posts.map((post) => {
            if (post.id === variables.postId) {
              return {
                ...post,
                likes: action === "Like" ? [data.userId] : [],
                _count: {
                  likes: post._count.likes + value,
                },
              };
            }

            return post;
          }),
        };
      });

      return {
        ...newData,
        pages: newPosts,
      };
    }
  );
};

const Post = ({ client, post, input }: PostProps) => {
  const likeMutation = api.post.like.useMutation({
    onSuccess: (data, variables) => {
      updateCache({
        client,
        data,
        input,
        variables,
        action: "Like",
      });
    },
  }).mutateAsync;

  const unlikeMutation = api.post.unlike.useMutation({
    onSuccess: (data, variables) => {
      updateCache({
        client,
        data,
        input,
        variables,
        action: "Unlike",
      });
    },
  });

  const hasLiked = post.likes.length > 0;

  return (
    <div>
      <div className='flex'>
        {post.author.image ? (
          <Image
            src={post.author.image}
            alt={`${post.author.name} profile picture`}
            width={48}
            height={48}
            className='rounded-full'
          />
        ) : null}

        <div className='ml-2'>
          <div className='flex items-center'>
            <p className='text-base font-medium text-white'>
              {post.author.name}
            </p>
            <p className='pl-1 text-xs text-gray-500'>Date</p>
          </div>

          <div className='text-base font-light text-white/80'>{post.text}</div>
        </div>
      </div>

      <div className='flex items-center p-2'>
        <span>{post._count.likes}</span>
      </div>
    </div>
  );
};

export default Post;
