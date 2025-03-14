"use client";
import { useEffect, useState } from "react";

interface Task {
  id: String;
  task: String;
  description: String;
  startDate: Date;
  endDate: Date;
  completed: Boolean;
}

const TaskList = ({ refresh }: { refresh: boolean }) => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/tasks");

        if (res.ok) {
          const data: Task[] = await res.json();

          const transeData = data.map((task) => ({
            ...task,
            id: task.id.toString(),
          }));
          setTasks(data);
        } else {
          console.log("Failed to fetch");
        }
      } catch (error) {
        console.log("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [refresh]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <div
          key={task.id.toString()}
          className="bg-white drop-shadow-lg rounded-md p-6 flex flex-col h-full"
        >
          <h2 className="text-xl font-semibold mb-3 break-words">
            {task.task}
          </h2>
          <p className="text-gray-800 flex-grow break-words">
            {task.description}
          </p>
          <div className="mt-4 pt-2 border-t border-gray-100">
            <p className="text-gray-600 text-sm ">
              <strong>Start Date: </strong>
              {new Date(task.startDate).toLocaleString()}
            </p>
            <p className="text-gray-600 text-sm mt-1">
              <strong>End Date: </strong>
              {new Date(task.endDate).toLocaleString()}
            </p>
            <button className=" bg-green-500 p-2 w-24 mt-3 hover:bg-green-600 rounded-md text-white drop-shadow-md transition-colors">
              Done
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
