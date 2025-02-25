import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

export default function Home() {
  return (
    <main className=" bg-white min-h-screen p-1  ">
      <h1 className="text-center text-3xl m-6 transition-shadow text-sky-600  ">
        My To Do List
      </h1>
      <div className="grid grid-cols-2 row-span-12 gap-2 ml-2">
        <div className="flex flex-col mt-32 min-h-48 items-center rounded-md">
          <AddTask />
        </div>
        <div className="bg-gray-400 rounded-md max-w-36w-full  ">
          <TaskList />
        </div>
      </div>
    </main>
  );
}
