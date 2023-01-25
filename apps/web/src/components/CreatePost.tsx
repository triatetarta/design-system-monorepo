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
      if (err instanceof z.ZodError) {
        setError(err.message);
      }
      return;
    }

    mutateAsync({ text });
  };

  return (
    <div className='mt-4 mb-6 flex space-x-3 px-4'>
      <form
        onSubmit={handleSubmit}
        className='flex w-full items-center rounded-md bg-quite-light-gray py-2'
      >
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder='Message'
          className='w-full bg-transparent px-4 text-white outline-none'
        />

        <div className='flex justify-end'>
          <button
            disabled={!text}
            type='submit'
            className='mr-2 rounded-md bg-blue-500 px-4 py-1 text-white/90'
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
