import { error } from "console";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";

interface DeleteTaskProps {
  taskId: string;
  onDelete: (taskId: string) => void;
}

const DeleteTask = ({ taskId, onDelete }: DeleteTaskProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = async () => {
    try {
      const res = await fetch(`https://localhost:8080/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to Delete Task");

      onDelete(taskId);
    } catch (error) {
      console.log("Error deleting task:", error);
    } finally {
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <button
      className=" bg-red-500 p-2 w-8 ml-2 mt-3 hover:bg-red-900 rounded-md text-white drop-shadow-md transition-colors"
      onClick={() => setIsDeleteModalOpen(true)}
    >
      <AiFillDelete />
    </button>
  );
};
