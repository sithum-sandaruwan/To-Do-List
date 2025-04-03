"use client";
import React, { useEffect, useState } from "react";
import { AiFillDelete, AiFillEdit, AiOutlineCheck } from "react-icons/ai";
import { Task } from "./types";
import DoneButton from "./TaskDone";
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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:8080/api/tasks"); // No headers

        if (!res.ok) throw new Error("Failed to fetch tasks");

        const data: Task[] = await res.json();
        const transformedData = data.map((task) => ({
          ...task,
          id: task.id.toString(),
        }));
        setTasks(transformedData);
      } catch (err) {
        console.error("Error fetching tasks:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch tasks");
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, [refresh, setTasks]);

  const handleEditClick = (task: Task) => {
    setSelectedTask(task);
    setIsEditModalOpen(true);
  };

  const handleDeleteClick = async (taskId: string) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/tasks/${taskId}/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (res.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      } else {
        throw new Error("Failed to delete task");
      }
    } catch (err) {
      console.error("Error deleting task:", err);
      setError(err instanceof Error ? err.message : "Failed to delete task");
    }
  };

  const handleUpdateTask = async (updatedTask: Task) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/tasks/${updatedTask.id}/edit`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
          body: JSON.stringify(updatedTask),
        }
      );

      if (!res.ok) throw new Error("Failed to update task");

      const data: Task = await res.json();
      setTasks((prevTasks) =>
        prevTasks.map((task) => (task.id === data.id ? data : task))
      );
      setIsEditModalOpen(false);
    } catch (err) {
      console.error("Error updating Task:", err);
      setError(err instanceof Error ? err.message : "Failed to update task");
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading tasks...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-8 text-red-500">
        Error: {error}
        <button
          onClick={() => window.location.reload()}
          className="ml-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Retry
        </button>
      </div>
    );
  }

  if (tasks.length === 0) {
    return <div className="text-center py-8">No tasks found</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tasks.map((task) => (
        <div
          key={task.id.toString()}
          className={`drop-shadow-lg rounded-md p-6 flex flex-col h-full ${
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
            <p className="text-gray-600 text-sm">
              <strong>Start Date: </strong>
              {new Date(task.startDate).toLocaleString()}
            </p>
            <p className="text-gray-600 text-sm mt-1">
              <strong>End Date: </strong>
              {new Date(task.endDate).toLocaleString()}
            </p>
            <div className="flex items-center mt-3 space-x-2">
              <DoneButton taskId={task.id} onMarkAsDone={onMarkAsDone} />
              <button
                className="bg-blue-600 mt-3 p-2 w-8 hover:bg-blue-800 rounded-md text-white drop-shadow-md transition-colors"
                onClick={() => handleEditClick(task)}
              >
                <AiFillEdit />
              </button>
              <DeleteTask
                taskId={task.id}
                onDelete={handleDeleteClick}
                authToken={localStorage.getItem("authToken")}
              />
            </div>
          </div>
        </div>
      ))}

      {isEditModalOpen && selectedTask && (
        <EditTask
          task={selectedTask}
          onUpdateTask={handleUpdateTask}
          onClose={() => setIsEditModalOpen(false)}
        />
      )}
    </div>
  );
};

export default TaskList;
