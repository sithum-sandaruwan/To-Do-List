import { error } from "console";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import ConfirmationModal from "./modals/ConfirmationModal";

interface DeleteTaskProps {
  taskId: string;
  onDelete: (taskId: string) => Promise<void> | void;
  authToken: string | null;
}

const DeleteTask = ({ taskId, onDelete, authToken }: DeleteTaskProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteClick = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `http://localhost:8080/api/tasks/${taskId}/delete`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to Delete Task");

      onDelete(taskId);
    } catch (error) {
      console.log("Error deleting task:", error);
    } finally {
      setIsLoading(false);
      setIsDeleteModalOpen(false);
    }
  };

  return (
    <>
      <button
        className=" bg-red-500 p-2 w-8 ml-2 mt-3 hover:bg-red-900 rounded-md text-white drop-shadow-md transition-colors"
        onClick={() => setIsDeleteModalOpen(true)}
      >
        <AiFillDelete />
      </button>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteClick}
        title="Delete Task"
        message="Are you want to delete this task permenently...?"
        isLoading={isLoading}
      />
    </>
  );
};

export default DeleteTask;
