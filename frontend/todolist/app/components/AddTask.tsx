"use client";
import { useState } from "react";
import { json, text } from "stream/consumers";

const AddTask = () => {
  const [task, setTask] = useState("");
  const [description, setDesc] = useState("");

  const submitHandle = async (e: React.FormEvent) => {
    e.preventDefault();

    const newTask = {
      task,
      description,
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
        setDesc("");
      }
      alert("Failed to add");
    } catch (error) {
      console.error("ERROR", error);
      alert("Error occured");
    }
  };

  return (
    <>
      <form onSubmit={submitHandle}>
        <input
          type="text"
          className="p-4 w-full sm:w-3/4 md:w-2/3 lg:w-1/2 rounded bg-slate-600 text-zinc-200 border-x-black shadow-md hover "
          placeholder="What's Your New Task...?"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          required
        />
        <input
          type="text"
          className="p-20 w-full sm:w-3/4 md:w-2/3 lg:w-1/2  rounded bg-slate-600 text-zinc-200 border-x-black shadow-md hover mt-4 ml-1"
          placeholder="Write Something About Task"
          value={description}
          onChange={(e) => setDesc(e.target.value)}
        />

        <button
          type="submit"
          className="p-2 rounded m-10 w-full sm:w-auto bg-red-600  text-white hover:drop-shadow-lg "
        >
          Add new task
        </button>
      </form>
    </>
  );
};

export default AddTask;
