import { text } from "stream/consumers";

const AddTask = () => {
  return (
    <>
      <input
        type="text"
        className="p-4 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 rounded bg-slate-600 text-zinc-200 border-x-cyan-50 shadow-md hover "
        placeholder="What's Your New Task"
      />

      <button className="p-2 rounded mt-4 w-full sm:w-auto bg-red-600  text-white hover:drop-shadow-lg ">
        Add new task
      </button>
    </>
  );
};

export default AddTask;
