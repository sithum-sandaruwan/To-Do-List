import AddTask from "./components/AddTask";
import TaskList from "./components/TaskList";

export default function Home() {
  return (
    <main>
      <h1 className="text-center text-3xl m-4">My To Do List</h1>
      <div className="grid grid-cols-2 row-span-12 gap-2 ml-2">
        <div className="bg-blue-400 row-auto pb-3 rounded-md">
          <AddTask />
        </div>
        <div className="bg-slate-700 row-auto rounded-md mr-2">
          <TaskList />
        </div>
      </div>
    </main>
  );
}
