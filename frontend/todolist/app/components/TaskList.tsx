"use client";
import React, { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit, AiOutlineCheck } from "react-icons/ai";
import { Task } from "./types";
import DoneButton from "./TaskDone";
import { error } from "console";
import { json } from "stream/consumers";
import EditTask from "./EditTask";
import DeleteTask from "./DeleteTask";

interface TaskListProps {
  refresh: boolean;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
  onMarkAsDone: (taskId: string) => void;
}

const TaskList = ({
  refresh,
  setTasks,
  tasks,
  onMarkAsDone,
}: TaskListProps) => {
  const [isEditModalOpen, setIsEDitModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

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
          setTasks(transeData);
        } else {
          console.log("Failed to fetch");
        }
      } catch (error) {
        console.log("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [refresh, setTasks]);

  const handleEditClick = (task: Task) => {
    setSelectedTask(task);
    setIsEDitModalOpen(true);
  };

  const handleDeleteClick = (taskId: string) => {
    setTasks((preTasks) => preTasks.filter((task) => task.id !== taskId));
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/tasks/${updatedTask.id}/edit`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedTask),
        }
      );

      if (!res.ok) throw new Error("Failed to update task");

      const data: Task = await res.json();

      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === data.id ? data : task))
      );
      setIsEDitModalOpen(false);
    } catch (error) {
      console.log("Error updating Task:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <div
          key={task.id.toString()}
          className={` drop-shadow-lg rounded-md p-6 flex flex-col h-full ${
            task.completed ? "bg-green-100" : "bg-white"
          }`}
        >
          <h2 className="text-xl font-semibold mb-3 break-words">
            {task.task}
          </h2>
          <p className="text-gray-800 flex-grow break-words">
            {task.description}
          </p>
          <div className="mt-4 pt-2 border-t border-gray-400">
            <p className="text-gray-600 text-sm ">
              <strong>Start Date: </strong>
              {new Date(task.startDate).toLocaleString()}
            </p>
            <p className="text-gray-600 text-sm mt-1">
              <strong>End Date: </strong>
              {new Date(task.endDate).toLocaleString()}
            </p>
            <DoneButton taskId={task.id} onMarkAsDone={onMarkAsDone} />
            <button
              className=" bg-blue-600 p-2 w-8 ml-2 mt-3 hover:bg-blue-800 rounded-md text-white drop-shadow-md transition-colors "
              onClick={() => handleEditClick(task)}
            >
              <AiFillEdit />
            </button>
            <DeleteTask taskId={task.id} onDelete={handleDeleteClick} />
          </div>
        </div>
      ))}

      {isEditModalOpen && selectedTask && (
        <EditTask
          task={selectedTask}
          onUpdateTask={handleUpdateTask}
          onClose={() => setIsEDitModalOpen(false)}
        />
      )}
    </div>
  );
};

export default TaskList;
