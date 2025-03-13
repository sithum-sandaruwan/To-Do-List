import { useEffect, useState } from "react";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/tasks");

        if (res.ok) {
          const data = await res.json();
          setTasks(data);
        } else {
          console.log("Failed to fetch");
        }
      } catch (error) {
        console.log("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  });

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
      <div className="bg-white drop-shadow-lg rounded-md  p-11   m-6">
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
