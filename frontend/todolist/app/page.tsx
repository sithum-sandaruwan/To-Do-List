"use client";
import { useState } from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";
import { Task } from "./components/types";

const Home = () => {
  const [refreshTaskList, setRefreshTaskList] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleTaskAdded = () => {
    setRefreshTaskList((prev) => !prev);
  };

  const handleDoneTask = async (taskId: String) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/tasks/${taskId}/done`,
        {
          method: "PUT",
        }
      );
      if (res.ok) {
        const updatedTask = await res.json();

        setTasks((prevTasks: Task[]) =>
          prevTasks.map((task: Task) =>
            task.id === taskId
              ? { ...task, completed: updatedTask.completed }
              : task
          )
        );
      } else {
        console.error("Failed to mark as done");
      }
    } catch (error) {
      console.error("Error marking task as done :", error);
    }
  };

  return (
    <main className=" bg-white min-h-screen p-2  ">
      <h1 className=" text-3xl font-bold bg-gradient-to-r from-blue-800 to-teal-300 bg-clip-text text-transparent tracking-tight">
        My To Do List
      </h1>
      <div className=" h-1 w-auto bg-gradient-to-r from-blue-500 to-teal-400 mt-2 rounded-full"></div>

      <div className="flex flex-col md:grid md:grid-cols-2 gap-4 px-4 ">
        <div className="flex flex-col  p-4 items-center rounded-md w-full">
          <AddTask onTaskAdded={handleTaskAdded} />
        </div>
        <div className="bg-gray-400 rounded-md p-4 shadow-md w-full max-w-7xl mx-auto lg:mt-3 sm:mt-0  ">
          <TaskList
            refresh={refreshTaskList}
            tasks={tasks}
            setTasks={setTasks}
            onMarkAsDone={handleDoneTask}
          />
        </div>
      </div>
    </main>
  );
};

export default Home;
