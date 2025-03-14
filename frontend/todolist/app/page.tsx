"use client";
import { useState } from "react";
import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

export default function Home() {
  const [refreshTaskList, setRefreshTaskList] = useState(false);

  const handleTaskAdded = () => {
    setRefreshTaskList((prev) => !prev);
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
          <TaskList refresh={refreshTaskList} />
        </div>
      </div>
    </main>
  );
}
