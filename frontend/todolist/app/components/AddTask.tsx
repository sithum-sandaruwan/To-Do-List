"use client";
import { useState } from "react";
import { json, text } from "stream/consumers";

interface AddTaskProps {
  onTaskAdded: () => void;
}

const AddTask = ({ onTaskAdded }: AddTaskProps) => {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const submitHandle = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(false);
    setError("");

    const newTask = {
      task,
      description,
      endDate: new Date(endDate).toISOString(),
    };

    try {
      const res = await fetch("http://localhost:8080/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      if (res.ok) {
        alert("Task Added Successfully");
        setTask("");
        setDescription("");
        setEndDate("");
        onTaskAdded();
      }
    } catch (error) {
      console.error("ERROR", error);
      setError("An error occured while adding the task.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-4 w-full">
      <form
        onSubmit={submitHandle}
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Task
          </label>
          <input
            type="text"
            className="p-3 w-full border border-gray-300 rounded shadow-lg focus:outline-none hover focus:ring-2 focus:ring-blue-500"
            placeholder="What's Your New Task...?"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write Something About Task"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            End Date
          </label>

          <input
            type="datetime-local"
            className="p-3 w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>

        {/* {error && (
          <div
            className="mb-4 text-red-500 text-sm"
            {error}
          ></div>
        )} */}

        <button
          type="submit"
          disabled={isLoading}
          className="py-3  w-full  bg-blue-700  text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
        >
          {isLoading ? "Added Task" : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default AddTask;
