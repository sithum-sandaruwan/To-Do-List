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
    <div className="w-full md:w-1/2 pl-4">
      {tasks.map((task) => (
        <div
          key={task.id.toString()}
          className="bg-white drop-shadow-lg rounded-md p-6 mb-6"
        >
          <h2 className="text-xl font-semibold mb-3">{task.task}</h2>
          <p className="text-gray-800">{task.description}</p>
          <button className=" bg-green-500 p-2 w-24 mt-5 hover:bg-slate-200 rounded-md text-black drop-shadow-md">
            Done
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskList;
