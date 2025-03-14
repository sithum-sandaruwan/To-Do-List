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

  const submitHandle = async (e: React.FormEvent) => {
    e.preventDefault();

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
      alert("Error occured");
    }
  };

  return (
    <div className="flex flex-col items-center  min-h-screen  p-4">
      <form onSubmit={submitHandle} className="w-full max-w-lg">
        <input
          type="text"
          className="p-4 w-full  rounded bg-slate-600 text-zinc-200 border-x-black shadow-md hover mb-4"
          placeholder="What's Your New Task...?"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
        />
        <input
          type="text"
          className="p-20 w-full   rounded bg-slate-600 text-zinc-200 border-x-black shadow-md hover mb-4 "
          placeholder="Write Something About Task"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <label className="block text-sm font-medium text-gray-400 mb-1">
          What is the end Date...?
        </label>
        <input
          type="datetime-local"
          className="p-4 w-full rounded bg-slate-600 text-zinc-200 border-x-black shadow-md hover mb-4"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />

        <button
          type="submit"
          className="p-4 rounded m-0 w-full sm:w-auto bg-red-600  text-white hover:drop-shadow-lg transition-colors"
        >
          Add task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
