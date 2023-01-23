import { FormEvent, useState } from "react";
import { z } from "zod";

import { api } from "../utils/api";

export const postSchema = z.object({
  text: z
    .string({
      required_error: "Post text is required",
    })
    .min(10)
    .max(280),
});

const CreatePost = () => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const utils = api.useContext();

  const { mutateAsync } = api.post.create.useMutation({
    onSuccess: () => {
      setText("");
      utils.post.getPosts.invalidate();
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      await postSchema.parse({ text });
      setText("");
    } catch (err) {
      if (err instanceof z.ZodError) setError(err.message);
      return;
    }

    mutateAsync({ text });
  };

  return (
    <div className='my-4 flex space-x-3 border-b border-b-dark-not-black px-6'>
      {error && JSON.stringify(error)}
      <form onSubmit={handleSubmit} className='flex w-full flex-col rounded-md'>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Message'
          className='bg-quite-light-gray w-full rounded-md py-2 px-4 outline-none'
        />

        <div className='mt-4 flex justify-end'>
          <button type='submit' className='rounded-md px-4 py-2 text-white'>
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
