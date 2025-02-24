import { text } from "stream/consumers";

const AddTask = () => {
  return (
    <>
      <div>
        <input
          type="text"
          className="p-4 rounded bg-slate-50"
          placeholder="What's Your New Task"
        />
      </div>

      <button className=" bg-red-600 p-1 rounded m-5 align-">
        Add new task
      </button>
    </>
  );
};

export default AddTask;
