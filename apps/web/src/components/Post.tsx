import { QueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { RouterInputs, RouterOutputs } from "../utils/api";

type PostProps = {
  client: QueryClient;
  input: RouterInputs["post"]["getPosts"];
  post: RouterOutputs["post"]["getPosts"]["posts"][number];
};

const Post = ({ client, post, input }: PostProps) => {
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
            <p className='font-bold'>{post.author.name}</p>
            <p className='pl-1 text-xs text-gray-500'>Date</p>
          </div>

          <div>{post.text}</div>
        </div>
      </div>
    </div>
  );
};

export default Post;
