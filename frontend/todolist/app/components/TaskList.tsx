const TaskList = () => {
  return (
    <>
      <div className=" bg-white drop-shadow-lg rounded-md   p-11  m-6 hover:">
        <h2 className="text-xl font-semibold mb-3">Task Title</h2>
        <p className="text-gray-800">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid
          dolore, optio sunt pariatur voluptatum, neque vero ipsam saepe,
          repellat consectetur labore asperiores. Nam dolores ex unde nostrum
          impedit commodi recusandae?
        </p>
        <button className=" bg-green-500 p-2 w-24 mt-5 hover:bg-slate-200 rounded-md text-black drop-shadow-md">
          Done
        </button>
      </div>
      <div className="bg-white drop-shadow-lg rounded-md  p-11 max-w-xl m-6">
        <h2 className="text-xl font-semibold mb-3">Task Title</h2>
        <p className="text-gray-800">This is Description</p>
        <button className=" bg-green-500 p-2 w-24 mt-5 hover:bg-slate-200 rounded-md text-black drop-shadow-md">
          Done
        </button>
      </div>
    </>
  );
};

export default TaskList;
