import React, { useState } from "react";
import { Task } from "./types";

interface EditTaskProps {
  task: Task;
  onUpdateTask: (updatedTask: Task) => void;
  onClose: () => void;
}

const EditTask = ({ task, onUpdateTask, onClose }: EditTaskProps) => {
  const [editedTask, setEditedTask] = useState<Task>(task);

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditedTask((prev) => ({ ...prev, [name]: new Date(value) }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateTask(editedTask);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Edit Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Task</label>
            <input
              type="text"
              name="task"
              value={editedTask.task}
              onChange={handleTextChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={editedTask.description}
              onChange={handleTextChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <input
              type="datetime-local"
              name="startDate"
              value={editedTask.startDate.toISOString().slice(0, 16)}
              onChange={handleDateChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">End Date</label>
            <input
              type="datetime-local"
              name="endDate"
              value={editedTask.endDate.toISOString().slice(0, 16)}
              onChange={handleDateChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditTask;
