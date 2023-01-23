import CreatePost from "./CreatePost";

const PostFeed = () => {
  return (
    <div className='bg-not-dark-gray relative flex flex-1 flex-col overflow-hidden'>
      <div className='border-b border-b-dark-not-black py-3 px-4 font-medium text-white shadow-sm'>
        #main
      </div>

      <CreatePost />
    </div>
  );
};

export default PostFeed;
