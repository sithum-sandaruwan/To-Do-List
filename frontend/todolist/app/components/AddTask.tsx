"use client";
import { useState } from "react";
import { json, text } from "stream/consumers";

const AddTask = () => {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");

  const submitHandle = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!endDate) {
      alert("Please give end date");
      return;
    }

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
        <input
          type="datetime-local"
          className="p-4 w-full rounded bg-slate-600 text-zinc-200 border-x-black shadow-md hover mb-4"
          placeholder="What will be the end date of the task..?"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
        />

        <button
          type="submit"
          className="p-4 rounded m-10 w-full sm:w-auto bg-red-600  text-white hover:drop-shadow-lg transition-colors"
        >
          Add new task
        </button>
      </form>
    </div>
  );
};

export default AddTask;
